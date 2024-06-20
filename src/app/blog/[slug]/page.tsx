import { Metadata } from "next";

import blocksToText from "@/util/blocksToText";
import { makeSeoData } from "@/util/seo";

import BlogPostPage from "@/components/pages/templates/BlogPost";

import { useBlogPost, useCompanyInfo, useSeoData } from "@/lib/types";

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { companyName } = await useSeoData();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const blogPost = await useBlogPost(params.slug);

    const seoDescription =
        blocksToText(blogPost.content)
            .slice(0, 160)
            .split(" ")
            .slice(0, -1)
            .join(" ") + "...";

    return makeSeoData(
        `${companyName} | ${blogPost.title}`,
        seoDescription,
        blogPost.heroImage || blogPost.heroVideo,
    );
}
export default async function Page({ params }: { params: { slug: string } }) {
    const blogPost = await useBlogPost(params.slug);
    const companyInfo = await useCompanyInfo();

    return <BlogPostPage companyInfo={companyInfo} blogPost={blogPost} />;
}
