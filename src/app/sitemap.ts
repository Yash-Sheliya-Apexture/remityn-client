import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
    if (!siteUrl) {
        console.warn("NEXT_PUBLIC_SITE_URL is not set. Sitemap URLs will be relative.");
        // Or throw an error if you prefer to halt the build
        // throw new Error("NEXT_PUBLIC_SITE_URL is not defined. Cannot generate sitemap.");
    }

    const lastModifiedDate = new Date().toISOString();

    // Static routes from your (website) group
    const staticWebsiteRoutes = [
        '', // Home page
        '/about-us',
        '/faqs',
        '/features',
        '/privacy-policy',
        '/reviews',
        '/terms-and-conditions',
        // Add other static public pages here
    ].map((route) => ({
        url: `${siteUrl || ''}${route}`,
        lastModified: lastModifiedDate,
        changeFrequency: 'monthly' as 'monthly', // Or 'weekly', 'daily'
        priority: route === '' ? 1.0 : 0.8, // Home page higher priority
    }));

    // Example: If you had dynamic blog posts or product pages:
    // const dynamicPosts = await fetchPostsFromCMS(); // Fetch your dynamic content
    // const postEntries = dynamicPosts.map(post => ({
    //   url: `${siteUrl}/blog/${post.slug}`,
    //   lastModified: post.updatedAt,
    //   changeFrequency: 'weekly',
    //   priority: 0.7,
    // }));

    return [
        ...staticWebsiteRoutes,
        // ...postEntries, // if you have dynamic routes
    ];
}