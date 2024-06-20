import { MetadataRoute } from "next";

import { useBlogPosts, usePortfolioItems, useServices } from "@/lib/types";

type SitemapItem = {
    url: string;
    lastModified?: string | Date | undefined;
    changeFrequency?:
        | "yearly"
        | "always"
        | "hourly"
        | "daily"
        | "weekly"
        | "monthly"
        | "never"
        | undefined;
    priority?: number | undefined;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://madebycounter.com";
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const portfolioItems = await usePortfolioItems();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const services = await useServices();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const blogPosts = await useBlogPosts();

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${baseUrl}/portfolio`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.5,
        },
        ...portfolioItems.map(
            (item) =>
                ({
                    url: `${baseUrl}/portfolio/${item.slug.current}`,
                    lastModified: new Date(item._updatedAt),
                    changeFrequency: "monthly",
                    priority: 0.8,
                }) as SitemapItem,
        ),
        ...services.map(
            (service) =>
                ({
                    url: `${baseUrl}/services/${service.slug.current}`,
                    lastModified: new Date(service._updatedAt),
                    changeFrequency: "monthly",
                    priority: 1,
                }) as SitemapItem,
        ),
        ...blogPosts.map(
            (post) =>
                ({
                    url: `${baseUrl}/blog/${post.slug.current}`,
                    lastModified: new Date(post._updatedAt),
                    changeFrequency: "monthly",
                    priority: 0.5,
                }) as SitemapItem,
        ),
    ];
}
