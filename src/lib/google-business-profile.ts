/**
 * Google Business Profile API Server-Side Client
 * Handles OAuth 2.0 token refreshes, review fetching, rating calculation,
 * and secure short-lived in-memory caching according to Google Business Profile API policies.
 */

import { verifiedCustomerReviews, googleReviewsSummary, CustomerReview } from '@/data/customerReviews';

interface CachedReviewsData {
  reviews: CustomerReview[];
  averageRating: number;
  totalReviewCount: number;
  cachedAt: number;
}

// In-memory cache: 1 hour TTL (well within Google's 30-day maximum retention policy)
let memoryCache: CachedReviewsData | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

interface GoogleTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface GoogleReviewApiItem {
  reviewId: string;
  reviewer?: {
    displayName?: string;
    profilePhotoUrl?: string;
    isAnonymous?: boolean;
  };
  starRating?: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE';
  comment?: string;
  createTime?: string;
  updateTime?: string;
  reviewReply?: {
    comment?: string;
    updateTime?: string;
  };
}

interface GoogleReviewsApiResponse {
  reviews?: GoogleReviewApiItem[];
  averageRating?: number;
  totalReviewCount?: number;
  nextPageToken?: string;
}

const STAR_RATING_MAP: Record<string, number> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

/**
 * Exchanges the refresh token for a short-lived access token
 */
async function getGoogleAccessToken(): Promise<string | null> {
  const clientId = process.env.GOOGLE_BUSINESS_PROFILE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_BUSINESS_PROFILE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_BUSINESS_PROFILE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn('[GoogleReviews] OAuth token exchange failed:', response.status, errText);
      return null;
    }

    const data = (await response.json()) as GoogleTokenResponse;
    return data.access_token || null;
  } catch (error) {
    console.error('[GoogleReviews] Network error requesting OAuth access token:', error);
    return null;
  }
}

/**
 * Fetches live customer reviews from Google Business Profile API v4
 */
export async function fetchGoogleBusinessProfileReviews(): Promise<{
  reviews: CustomerReview[];
  averageRating: number;
  totalReviewCount: number;
  isLiveApi: boolean;
}> {
  // Check memory cache first
  const now = Date.now();
  if (memoryCache && now - memoryCache.cachedAt < CACHE_TTL_MS) {
    return {
      reviews: memoryCache.reviews,
      averageRating: memoryCache.averageRating,
      totalReviewCount: memoryCache.totalReviewCount,
      isLiveApi: true,
    };
  }

  const accountId = process.env.GOOGLE_BUSINESS_PROFILE_ACCOUNT_ID;
  const locationId = process.env.GOOGLE_BUSINESS_PROFILE_LOCATION_ID;

  // If credentials are not configured, use authentic Google Maps profile data
  if (!accountId || !locationId) {
    return {
      reviews: verifiedCustomerReviews,
      averageRating: googleReviewsSummary.averageRating,
      totalReviewCount: googleReviewsSummary.totalReviewCount,
      isLiveApi: false,
    };
  }

  const accessToken = await getGoogleAccessToken();
  if (!accessToken) {
    return {
      reviews: verifiedCustomerReviews,
      averageRating: googleReviewsSummary.averageRating,
      totalReviewCount: googleReviewsSummary.totalReviewCount,
      isLiveApi: false,
    };
  }

  try {
    // Call official review endpoint: GET https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/reviews
    const endpoint = `https://mybusiness.googleapis.com/v4/accounts/${encodeURIComponent(
      accountId
    )}/locations/${encodeURIComponent(locationId)}/reviews?pageSize=50&orderBy=rating+desc`;

    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { revalidate: 3600 }, // 1 hour Next.js cache
    });

    if (!response.ok) {
      console.warn('[GoogleReviews] API request failed:', response.status, await response.text());
      return {
        reviews: verifiedCustomerReviews,
        averageRating: googleReviewsSummary.averageRating,
        totalReviewCount: googleReviewsSummary.totalReviewCount,
        isLiveApi: false,
      };
    }

    const data = (await response.json()) as GoogleReviewsApiResponse;
    const rawReviews = data.reviews || [];

    // Filter strictly for 5-star reviews
    const fiveStarList: CustomerReview[] = rawReviews
      .filter((r) => r.starRating === 'FIVE' && r.comment && r.comment.trim().length > 0)
      .map((r, index) => {
        const name = r.reviewer?.displayName || 'Google Customer';
        const initials = name
          .split(' ')
          .map((n) => n[0])
          .slice(0, 2)
          .join('')
          .toUpperCase() || 'GA';

        return {
          id: r.reviewId || `google-review-${index}`,
          reviewerName: name,
          reviewerInitials: initials,
          avatarColor: 'from-sky-500 to-cyan-600',
          rating: 5,
          dateText: r.createTime ? new Date(r.createTime).toLocaleDateString() : 'Recent review',
          reviewText: r.comment || '',
          googleReviewUrl: googleReviewsSummary.googleMapsPlaceUrl,
        };
      });

    const reviewsToReturn = fiveStarList.length > 0 ? fiveStarList : verifiedCustomerReviews;
    const avgRating = typeof data.averageRating === 'number' ? data.averageRating : googleReviewsSummary.averageRating;
    const totalCount = typeof data.totalReviewCount === 'number' ? data.totalReviewCount : googleReviewsSummary.totalReviewCount;

    // Cache in memory
    memoryCache = {
      reviews: reviewsToReturn,
      averageRating: avgRating,
      totalReviewCount: totalCount,
      cachedAt: now,
    };

    return {
      reviews: reviewsToReturn,
      averageRating: avgRating,
      totalReviewCount: totalCount,
      isLiveApi: true,
    };
  } catch (err) {
    console.error('[GoogleReviews] Exception fetching reviews:', err);
    return {
      reviews: verifiedCustomerReviews,
      averageRating: googleReviewsSummary.averageRating,
      totalReviewCount: googleReviewsSummary.totalReviewCount,
      isLiveApi: false,
    };
  }
}

