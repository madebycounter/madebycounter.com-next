import BlogPostPage from "@/components/pages/templates/BlogPost";

import { useBlogPost, useCompanyInfo } from "@/lib/types";

export default async function Page({ params }: { params: { slug: string } }) {
    const blogPost = await useBlogPost(params.slug);
    const companyInfo = await useCompanyInfo();

    return <BlogPostPage companyInfo={companyInfo} blogPost={blogPost} />;
}
