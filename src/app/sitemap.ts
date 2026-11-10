import { MetadataRoute } from 'next';
import { dedicatedServices, blogArticles, siteUrl } from '@/data/janakaData';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Root Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  // Dedicated Service Pages (High Commercial Intent)
  dedicatedServices.forEach((service) => {
    routes.push({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    });
  });

  // National Educational Guides (Informational & Sri Lanka-wide Authority)
  blogArticles.forEach((article) => {
    routes.push({
      url: `${siteUrl}/blog/${article.slug}`,
      lastModified: article.publishedDate || currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  return routes;
}

