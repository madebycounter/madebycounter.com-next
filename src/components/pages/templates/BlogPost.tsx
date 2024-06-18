import { BlogPost, CompanyInfo } from "@/lib/types";

export default function Page({
    companyInfo,
    blogPost,
}: {
    companyInfo: CompanyInfo;
    blogPost: BlogPost;
}) {
    return <h1>{blogPost.title}</h1>;
}
