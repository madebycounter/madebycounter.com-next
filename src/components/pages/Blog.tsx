import clsx from "clsx";

import Footer from "@/components/site/Footer";
import Nav from "@/components/site/Nav";
import Action from "@/components/util/Action";
import Media from "@/components/util/Media";
import { Small } from "@/components/util/MediaSize";

import { BlogPost, CompanyInfo } from "@/lib/types";

import styles from "./Blog.module.css";

function BlogPostCard({ post }: { post: BlogPost }) {
    return (
        <Action href={`/blog/${post.slug?.current}`}>
            <div className="aspect-4/3">
                <Media src={post.heroVideo || post.heroImage} size={Small} />
            </div>

            <h2 className="py-2 font-counter text-[1.6rem] font-normal leading-[1em] tracking-tighter underline">
                {post.title}
            </h2>

            <div className="flex items-end gap-2">
                <div className="grow-0">
                    <Media
                        src={post.author?.profile}
                        size={{
                            img:
                                post.author?.slug?.current === "counter-llc"
                                    ? 40
                                    : 50,
                            video: "low",
                        }}
                    />
                </div>

                <div>
                    <p className="mb-1 font-light leading-[1em]">
                        Written by {post.author?.name?.split(" ")[0]}
                    </p>

                    <p className="font-light leading-[1em]">
                        {post.date &&
                            new Date(post.date).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                    </p>
                </div>
            </div>
        </Action>
    );
}

export default function Blog({
    companyInfo,
    blogPosts,
}: {
    companyInfo: CompanyInfo;
    blogPosts: BlogPost[];
}) {
    return (
        <div className="bg-white">
            <Nav companyInfo={companyInfo} active="blog" inverted />

            <div
                className={clsx(
                    styles.container,
                    "m-auto grid max-w-screen-xl grid-flow-row gap-8 px-4 py-32 sm:px-8",
                )}
            >
                {blogPosts.sort().map((post, idx) => (
                    <div key={idx}>
                        <BlogPostCard post={post} />
                    </div>
                ))}
            </div>

            <Footer companyInfo={companyInfo} />
        </div>
    );
}
