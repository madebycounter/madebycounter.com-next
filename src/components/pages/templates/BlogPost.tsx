"use client";

import { getImageDimensions } from "@sanity/asset-utils";
import clsx from "clsx";
import { PortableText } from "next-sanity";
import Highlight from "react-highlight";

import Nav from "@/components/site/Nav";
import Lightbox, {
    mapToSlides,
    useLightboxState,
} from "@/components/util/Lightbox";
import Media from "@/components/util/Media";
import { Large, Medium } from "@/components/util/MediaSize";

import { BlogPost, CompanyInfo, SanityImage } from "@/lib/types";

import "@/../node_modules/highlight.js/styles/xcode.css";

function BlogPostGallery({
    items,
    onClick,
}: {
    items: SanityImage[];
    onClick: (key: string) => void;
}) {
    if (items.length === 0) {
        return <p>No gallery content</p>;
    }

    const ar = getImageDimensions(items[0]).aspectRatio;

    return (
        <div className="flex gap-2">
            {items.map((item, idx) => (
                <div
                    key={idx}
                    style={{
                        aspectRatio: ar,
                    }}
                >
                    <Media src={item} onClick={onClick} size={Medium} />
                </div>
            ))}
        </div>
    );
}

function isMedia(block: any) {
    return block._type === "mux.video" || block._type === "image";
}

function isGallery(block: any) {
    return block._type === "blogPostGallery";
}

export default function Page({
    companyInfo,
    blogPost,
}: {
    companyInfo: CompanyInfo;
    blogPost: BlogPost;
}) {
    const [lightboxOpen, lightboxCurrent, setLightbox] = useLightboxState();

    return (
        <div>
            <Nav companyInfo={companyInfo} active="blog" />

            <Lightbox
                open={lightboxOpen}
                setLightbox={setLightbox}
                currentSlide={lightboxCurrent}
                slides={mapToSlides(
                    [
                        blogPost.heroVideo,
                        blogPost.heroImage,
                        ...blogPost.content.filter(isMedia),
                        ...blogPost.content
                            .filter(isGallery)
                            .flatMap((gallery: any) => gallery.items),
                    ].filter(Boolean),
                )}
            />

            <div className="h-[65vh] w-full">
                <Media
                    src={blogPost.heroVideo || blogPost.heroImage}
                    mode="cover"
                    size={{
                        img: 1920,
                        video: "stream",
                    }}
                    onClick={(key) => setLightbox(true, key)}
                />
            </div>

            <div className="m-auto max-w-screen-lg p-4">
                <h1 className="font-counter text-7xl font-normal leading-[1em] tracking-tighter">
                    {blogPost.title}
                </h1>

                <div className="flex items-end gap-2">
                    <div className="grow-0">
                        <Media
                            src={blogPost.author.profile}
                            size={{
                                img:
                                    blogPost.author.slug.current ===
                                    "counter-llc"
                                        ? 40
                                        : 50,
                                video: "low",
                            }}
                            onClick={(key) => setLightbox(true, key)}
                        />
                    </div>

                    <div>
                        <p className="mb-1 font-light leading-[1em]">
                            Written by {blogPost.author.name.split(" ")[0]}
                        </p>

                        <p className="font-light leading-[1em]">
                            {new Date(blogPost.date).toLocaleDateString(
                                "en-US",
                                {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                },
                            )}
                        </p>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="my-8 text-xl font-light md:text-2xl">
                    <PortableText
                        value={blogPost.content}
                        components={{
                            block: {
                                normal: ({ children }) => (
                                    <p className="my-4 leading-normal">
                                        {children}
                                    </p>
                                ),
                                h1: ({ children }) => (
                                    <h2 className="my-4 text-5xl font-bold">
                                        {children}
                                    </h2>
                                ),
                                h2: ({ children }) => (
                                    <h3 className="my-4 text-4xl font-bold">
                                        {children}
                                    </h3>
                                ),
                                h3: ({ children }) => (
                                    <h4 className="my-4 text-3xl font-bold">
                                        {children}
                                    </h4>
                                ),
                            },
                            marks: {
                                strong: ({ children }) => (
                                    <strong className="font-bold">
                                        {children}
                                    </strong>
                                ),
                                code: ({ children }) => (
                                    <code className="bg-gray-200">
                                        {children}
                                    </code>
                                ),
                            },
                            list: {
                                bullet: ({ children, value }) => (
                                    <ul
                                        className={clsx("ml-[2em]", {
                                            "my-4 list-decimal":
                                                value.level === 1,
                                            "list-[lower-alpha]":
                                                value.level === 2,
                                        })}
                                    >
                                        {children}
                                    </ul>
                                ),
                                number: ({ children, value }) => (
                                    <ol
                                        className={clsx("ml-[2em]", {
                                            "my-4 list-disc": value.level === 1,
                                            "list-[circle]": value.level === 2,
                                        })}
                                    >
                                        {children}
                                    </ol>
                                ),
                            },
                            types: {
                                image: ({ value }) => (
                                    <div className="mx-auto my-4 max-w-screen-md">
                                        <Media
                                            src={value}
                                            size={Large}
                                            onClick={(key) =>
                                                setLightbox(true, key)
                                            }
                                        />
                                    </div>
                                ),
                                "mux.video": ({ value }) => (
                                    <div className="mx-auto my-4 max-w-screen-md">
                                        <Media
                                            src={value}
                                            size={Medium}
                                            onClick={(key) =>
                                                setLightbox(true, key)
                                            }
                                        />
                                    </div>
                                ),
                                blogPostGallery: ({ value }) => (
                                    <div className="mx-auto my-4 max-w-screen-md">
                                        <BlogPostGallery
                                            items={value.items}
                                            onClick={(key) =>
                                                setLightbox(true, key)
                                            }
                                        />
                                    </div>
                                ),
                                code: ({ value }) => (
                                    <Highlight
                                        className={clsx(
                                            "text-base",
                                            value.language,
                                        )}
                                    >
                                        {value.code}
                                    </Highlight>
                                ),
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
