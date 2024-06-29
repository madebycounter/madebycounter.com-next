import { Metadata } from "next";

import { makeSeoData } from "@/util/seo";

import BlogPage from "@/components/pages/Blog";

import { useSeoData, useBlogPosts, useCompanyInfo } from "@/lib/query";

export async function generateMetadata(): Promise<Metadata> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { companyName, blogPageSeo } = await useSeoData();

    return makeSeoData(
        `${companyName} | ${blogPageSeo.title}`,
        blogPageSeo.description,
        blogPageSeo.image,
    );
}

export default async function Page() {
    const blogPosts = await useBlogPosts();
    const companyInfo = await useCompanyInfo();

    return <BlogPage companyInfo={companyInfo} blogPosts={blogPosts} />;
}
