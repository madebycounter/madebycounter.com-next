import { Metadata } from "next";

import formatTitle from "@/util/formatTitle";
import { makeSeoData } from "@/util/seo";

import BlogPage from "@/components/pages/Blog";

import { useBlogPosts, useCompanyInfo, useBlogPage } from "@/lib/query";

export async function generateMetadata(): Promise<Metadata> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const companyInfo = await useCompanyInfo();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const blogPage = await useBlogPage();

    return makeSeoData(
        formatTitle(companyInfo.titleFormat, blogPage.title),
        blogPage.description,
        blogPage.image,
    );
}

export default async function Page() {
    const blogPosts = await useBlogPosts();
    const companyInfo = await useCompanyInfo();

    return <BlogPage companyInfo={companyInfo} blogPosts={blogPosts} />;
}
