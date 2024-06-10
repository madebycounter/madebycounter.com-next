"use client";

import { PortableText } from "next-sanity";
import { useEffect, useRef } from "react";

import { useContainerSize } from "@/util/hooks";

import Media from "@/components/media/Media";
import Contact from "@/components/site/Contact";
import Nav from "@/components/site/Nav";
import Gallery from "@/components/util/Gallery";
import Parallax from "@/components/util/Parallax";
import Slideshow, { filterMedia } from "@/components/util/Slideshow";
import { VideoEmbed } from "@/components/util/VideoEmbed";

import { CompanyInfo, PortfolioItem } from "@/lib/sanity.types";

export default function Page({
    portfolioItem,
    companyInfo,
}: {
    companyInfo: CompanyInfo;
    portfolioItem: PortfolioItem;
}) {
    const parallaxRef = useRef<HTMLDivElement>(null);
    const mediaRef = useRef<HTMLDivElement>(null);
    const mediaSize = useContainerSize(mediaRef);

    console.log(portfolioItem.description);

    return (
        <div>
            <Nav
                companyInfo={companyInfo}
                active="portfolio"
                threshold={48 + 16 * 2}
                inverted
            />

            <div className="h-20" />

            <div className="m-auto max-w-screen-2xl">
                <div className="relative flex gap-0">
                    <Parallax.Driver
                        className="shrink grow"
                        driverRef={parallaxRef}
                    >
                        <div ref={mediaRef}>
                            {portfolioItem.heroEmbed && (
                                <div className="aspect-[4096/2160]">
                                    <VideoEmbed url={portfolioItem.heroEmbed} />
                                </div>
                            )}

                            {portfolioItem.heroMedia && (
                                <Slideshow
                                    items={filterMedia(portfolioItem.heroMedia)}
                                />
                            )}
                        </div>

                        <Gallery.Vertical
                            items={portfolioItem.gallery.map((item) => ({
                                component: <Media src={item} />,
                                aspectRatio: 16 / 9,
                            }))}
                            className="gap-2 pt-2"
                            columns={2}
                        />
                    </Parallax.Driver>

                    <Parallax
                        className="shrink-0 grow basis-[500px] px-4"
                        driverRef={parallaxRef}
                    >
                        <div
                            className="flex flex-col items-stretch justify-end gap-4"
                            style={{
                                height: mediaSize.height,
                            }}
                        >
                            <h1 className="font-counter text-8xl leading-[0.8em] tracking-tighter">
                                {portfolioItem.title}
                            </h1>

                            <div className="flex flex-col gap-2">
                                <p className="m-0 text-[1.6rem] font-light leading-[1.2em]">
                                    <span className="font-counter tracking-tighter">
                                        /date&nbsp;
                                    </span>
                                    {portfolioItem.date}
                                </p>

                                <p className="m-0 text-[1.6rem] font-light leading-[1.2em]">
                                    <span className="font-counter tracking-tighter">
                                        /tags&nbsp;
                                    </span>
                                    {portfolioItem.tags.join(", ")}
                                </p>

                                <p className="m-0 text-[1.6rem] font-light leading-[1.2em]">
                                    <span className="font-counter tracking-tighter">
                                        /description&nbsp;
                                    </span>
                                    <PortableText
                                        value={portfolioItem.description}
                                        components={{
                                            block: {
                                                normal: ({ children }) => (
                                                    <>{children}</>
                                                ),
                                            },
                                        }}
                                    />
                                </p>
                            </div>
                        </div>

                        <Gallery.Vertical
                            items={portfolioItem.gallery
                                .slice(0, 2)
                                .map((item) => ({
                                    component: <Media src={item} />,
                                    aspectRatio: 16 / 9,
                                }))}
                            className="gap-2 pt-2"
                            columns={1}
                        />

                        <div className="pt-8">
                            <p className="mb-8 font-counter text-8xl leading-[1em] tracking-tighter">
                                Pretty cool,
                                <br />
                                right?
                            </p>
                            <Contact inverted />
                        </div>
                    </Parallax>
                </div>
            </div>
        </div>
    );
}
