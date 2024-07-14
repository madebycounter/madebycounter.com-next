import { Metadata } from "next";
import { notFound } from "next/navigation";

import blocksToText from "@/util/blocksToText";
import formatTitle from "@/util/formatTitle";
import { makeSeoData } from "@/util/seo";

import BlogPostPage from "@/components/pages/templates/BlogPost";

import { useBlogPost, useCompanyInfo } from "@/lib/query";

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const companyInfo = await useCompanyInfo();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const blogPost = await useBlogPost(params.slug);

    if (!blogPost) return {};

    const seoDescription =
        blocksToText(blogPost.content)
            .slice(0, 160)
            .split(" ")
            .slice(0, -1)
            .join(" ") + "...";

    return makeSeoData(
        formatTitle(companyInfo.titleFormat, blogPost.title),
        seoDescription,
        blogPost.heroImage || blogPost.heroVideo,
    );
}
export default async function Page({ params }: { params: { slug: string } }) {
    const blogPost = await useBlogPost(params.slug);
    const companyInfo = await useCompanyInfo();

    if (!blogPost) return notFound();

    return <BlogPostPage companyInfo={companyInfo} blogPost={blogPost} />;
}
