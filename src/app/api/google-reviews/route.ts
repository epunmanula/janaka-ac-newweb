import { NextResponse } from 'next/server';
import { fetchGoogleBusinessProfileReviews } from '@/lib/google-business-profile';
import { googleReviewsSummary } from '@/data/customerReviews';

export async function GET() {
  try {
    const data = await fetchGoogleBusinessProfileReviews();

    return NextResponse.json({
      success: true,
      averageRating: data.averageRating,
      totalReviewCount: data.totalReviewCount,
      isLiveApi: data.isLiveApi,
      googleMapsPlaceUrl: googleReviewsSummary.googleMapsPlaceUrl,
      googleMapsWriteReviewUrl: googleReviewsSummary.googleMapsWriteReviewUrl,
      reviews: data.reviews,
    });
  } catch (error) {
    console.error('Failed to get Google Reviews:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve reviews',
        averageRating: googleReviewsSummary.averageRating,
        totalReviewCount: googleReviewsSummary.totalReviewCount,
        reviews: [],
      },
      { status: 500 }
    );
  }
}
