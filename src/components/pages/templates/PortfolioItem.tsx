"use client";

import { PortableText } from "next-sanity";
import { useRef } from "react";

import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import HeroMedia from "@/components/site/HeroMedia";
import Nav, { NavSpacer } from "@/components/site/Nav";
import Gallery from "@/components/util/Gallery";
import Lightbox, {
    mapToSlides,
    useLightboxState,
} from "@/components/util/Lightbox";
import Media, { getAspectRatio } from "@/components/util/Media";
import Parallax from "@/components/util/Parallax";
import Scroller from "@/components/util/Scroller";

import { CompanyInfo, MultiMedia, PortfolioItem } from "@/lib/types";

function arrangeImageScrollers(
    media: MultiMedia[],
    maxPerRow: number = 6,
): MultiMedia[][] {
    var rowsRequired = Math.ceil(media.length / maxPerRow);
    var quantityPerRow = Math.ceil(media.length / rowsRequired);
    var rows: MultiMedia[][] = [];

    for (let i = 0; i < rowsRequired; i++) {
        rows.push(media.slice(i * quantityPerRow, (i + 1) * quantityPerRow));
    }

    return rows;
}

export default function Page({
    portfolioItem,
    companyInfo,
}: {
    companyInfo: CompanyInfo;
    portfolioItem: PortfolioItem;
}) {
    const parallaxRef = useRef<HTMLDivElement>(null);
    const [lightboxOpen, lightboxCurrent, setLightbox] = useLightboxState();

    return (
        <div>
            <Lightbox
                open={lightboxOpen}
                setLightbox={setLightbox}
                currentSlide={lightboxCurrent}
                slides={mapToSlides(portfolioItem.gallery)}
            />

            <Nav
                companyInfo={companyInfo}
                active="portfolio"
                threshold={48 + 16 * 2}
                inverted
            />

            <NavSpacer />

            <div className="m-auto hidden max-w-screen-2xl lg:block">
                <div className="relative flex gap-0">
                    <Parallax.Driver
                        className="shrink grow pl-4"
                        driverRef={parallaxRef}
                    >
                        <HeroMedia
                            className="aspect-video"
                            video={portfolioItem.heroEmbed}
                            slideshow={portfolioItem.heroMedia}
                        />

                        <Gallery.Vertical
                            items={portfolioItem.gallery.map((item) => ({
                                component: (
                                    <Media
                                        src={item}
                                        onClick={(key) =>
                                            setLightbox(true, key)
                                        }
                                        size="medium"
                                    />
                                ),
                                aspectRatio: getAspectRatio(item),
                            }))}
                            className="my-2 gap-2"
                            columns={2}
                        />
                    </Parallax.Driver>

                    <Parallax
                        className="shrink-0 grow basis-[500px] px-4"
                        driverRef={parallaxRef}
                    >
                        <div className="flex flex-col items-stretch justify-end gap-4">
                            <h1 className="font-counter text-7xl leading-[0.8em] tracking-tighter">
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
                                    component: (
                                        <Media
                                            src={item}
                                            onClick={(key) =>
                                                setLightbox(true, key)
                                            }
                                            size="small"
                                        />
                                    ),
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

            <div className="m-4 block lg:hidden">
                <HeroMedia
                    className="aspect-video"
                    video={portfolioItem.heroEmbed}
                    slideshow={portfolioItem.heroMedia}
                />

                <h1 className="py-4 font-counter text-5xl leading-[0.8em] tracking-tighter md:text-8xl">
                    {portfolioItem.title}
                </h1>

                <div className="flex flex-col gap-1">
                    <p className="m-0 text-xl font-light leading-[1.2em] md:text-3xl">
                        <span className="font-counter tracking-tighter">
                            /date&nbsp;
                        </span>
                        {portfolioItem.date}
                    </p>

                    <p className="m-0 text-xl font-light leading-[1.2em] md:text-3xl">
                        <span className="font-counter tracking-tighter">
                            /tags&nbsp;
                        </span>
                        {portfolioItem.tags.join(", ")}
                    </p>

                    <p className="m-0 text-xl font-light leading-[1.2em] md:text-3xl">
                        <span className="font-counter tracking-tighter">
                            /description&nbsp;
                        </span>
                        <PortableText
                            value={portfolioItem.description}
                            components={{
                                block: {
                                    normal: ({ children }) => <>{children}</>,
                                },
                            }}
                        />
                    </p>
                </div>

                <div className="my-4 flex flex-col gap-2">
                    {arrangeImageScrollers(portfolioItem.gallery).map(
                        (row, i) => (
                            <Scroller
                                key={i}
                                className="flex h-[200px] gap-2 md:h-[300px]"
                            >
                                {row.map((item, j) => (
                                    <Media
                                        key={j}
                                        src={item}
                                        mode="height"
                                        className="shrink-0"
                                    />
                                ))}
                            </Scroller>
                        ),
                    )}
                </div>

                <p className="mb-4 mt-8 font-counter text-7xl leading-[1em] tracking-tighter">
                    Pretty cool,
                    <br />
                    right?
                </p>
                <Contact inverted />
            </div>

            <Footer inverted />
        </div>
    );
}
