"use client";

import clsx from "clsx";
import { PortableText } from "next-sanity";
import { useRef } from "react";

import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import HeroMedia from "@/components/site/HeroMedia";
import Nav, { NavSpacer } from "@/components/site/Nav";
import PortfolioCard from "@/components/site/cards/PortfolioCard";
import PortfolioTestimonial from "@/components/site/cards/PortfolioTestimonial";
import ServiceCard from "@/components/site/cards/ServiceCard";
import Gallery from "@/components/util/Gallery";
import Lightbox, {
    mapToSlides,
    useLightboxState,
} from "@/components/util/Lightbox";
import Media, { getAspectRatio } from "@/components/util/Media";
import { Medium } from "@/components/util/MediaSize";
import Parallax from "@/components/util/Parallax";
import Rating from "@/components/util/Rating";
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
        <div className="bg-white">
            <Lightbox
                open={lightboxOpen}
                setLightbox={setLightbox}
                currentSlide={lightboxCurrent}
                slides={mapToSlides([
                    ...(portfolioItem.heroMedia || []),
                    ...(portfolioItem.gallery || []),
                ])}
            />

            <Nav
                companyInfo={companyInfo}
                active="portfolio"
                threshold={48 + 16 * 2}
                inverted
            />

            <NavSpacer />

            {/* DESKTOP */}
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
                            onClick={(key) => setLightbox(true, key)}
                        />

                        <Gallery.Vertical
                            items={
                                portfolioItem.gallery?.map((item) => ({
                                    component: (
                                        <Media
                                            src={item}
                                            onClick={(key) =>
                                                setLightbox(true, key)
                                            }
                                            size={Medium}
                                        />
                                    ),
                                    aspectRatio: getAspectRatio(item),
                                })) || []
                            }
                            className="my-2 gap-2"
                            columns={2}
                        />
                    </Parallax.Driver>

                    <Parallax
                        className="shrink-0 grow-0 basis-[500px] px-4"
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
                                    {portfolioItem.tags?.join(", ")}
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

                                {portfolioItem.testimonial && (
                                    <PortfolioTestimonial
                                        src={portfolioItem.testimonial}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="my-8 flex flex-col gap-4">
                            {portfolioItem.serviceReference && (
                                <ServiceCard
                                    src={portfolioItem.serviceReference}
                                />
                            )}

                            {(portfolioItem.relatedProjects || []).map(
                                (item, i) => (
                                    <PortfolioCard
                                        className="aspect-video"
                                        key={i}
                                        src={item}
                                    />
                                ),
                            )}
                        </div>

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

            {/* MOBILE */}
            <div className="mb-4 block lg:hidden">
                <HeroMedia
                    className="aspect-video"
                    video={portfolioItem.heroEmbed}
                    slideshow={portfolioItem.heroMedia}
                    onClick={(key) => setLightbox(true, key)}
                />

                <div className="px-4">
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
                            {portfolioItem.tags?.join(", ")}
                        </p>

                        <p className="m-0 text-xl font-light leading-[1.2em] md:text-3xl">
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

                        {portfolioItem.testimonial && (
                            <div>
                                <p className="m-0 text-xl font-light leading-[1.2em] md:text-3xl">
                                    <span className="font-counter tracking-tighter">
                                        /review&nbsp;
                                    </span>
                                    &ldquo;
                                    <PortableText
                                        value={portfolioItem.testimonial.quote}
                                        components={{
                                            block: {
                                                normal: ({ children }) => (
                                                    <>{children}</>
                                                ),
                                            },
                                        }}
                                    />
                                    &rdquo;
                                </p>

                                <p className="text-md mt-2 text-right font-light leading-[1.2em] md:text-3xl">
                                    <span className="font-bold">
                                        {portfolioItem.testimonial.name}
                                    </span>

                                    {/* AAAAAAAAAAAAA */}
                                    <span>
                                        ,{" "}
                                        {portfolioItem.testimonial &&
                                            portfolioItem.testimonial
                                                .jobTitle &&
                                            portfolioItem.testimonial.jobTitle[
                                                portfolioItem.testimonial
                                                    .jobTitle.length - 1
                                            ]}
                                    </span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="my-4 flex flex-col gap-2">
                    {arrangeImageScrollers(portfolioItem.gallery || []).map(
                        (row, i) => (
                            <Scroller
                                key={i}
                                className="flex h-[200px] gap-2 px-2 md:h-[300px]"
                            >
                                {row.map((item, j) => (
                                    <Media
                                        onClick={(key) =>
                                            setLightbox(true, key)
                                        }
                                        key={j}
                                        src={item}
                                        mode="height"
                                        className="shrink-0"
                                    />
                                ))}
                            </Scroller>
                        ),
                    )}

                    <Scroller className="flex h-[200px] gap-2 px-2 md:h-[300px]">
                        {(portfolioItem.relatedProjects || []).map(
                            (item, i) => (
                                <div key={i} className="aspect-[3/2] shrink-0">
                                    <PortfolioCard
                                        className="h-full w-full"
                                        key={i}
                                        src={item}
                                    />
                                </div>
                            ),
                        )}
                    </Scroller>
                </div>

                <div className="mt-8 px-4">
                    <p className="mb-4 font-counter text-7xl leading-[1em] tracking-tighter">
                        Pretty cool,
                        <br />
                        right?
                    </p>
                    <Contact inverted />
                </div>
            </div>

            <Footer companyInfo={companyInfo} inverted className="mt-12" />
        </div>
    );
}
