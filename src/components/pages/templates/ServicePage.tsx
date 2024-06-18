"use client";

import clsx from "clsx";
import { PortableText } from "next-sanity";
import { useRef } from "react";

import { useContainerSize, useWindowSize } from "@/util/hooks";

import Button from "@/components/site/Button";
import HeroMedia from "@/components/site/HeroMedia";
import Nav, { NavSpacer } from "@/components/site/Nav";
import PrettyCoolRight from "@/components/site/PrettyCoolRight";
import FunFactCard from "@/components/site/cards/FunFactCard";
import MiniServiceCard from "@/components/site/cards/MiniServiceCard";
import PortfolioCard from "@/components/site/cards/PortfolioCard";
import TestimonialCard from "@/components/site/cards/TestimonialCard";
import Carousel from "@/components/util/Carousel";
import Gallery from "@/components/util/Gallery";
import Media, { getAspectRatio } from "@/components/util/Media";
import { Medium, Small } from "@/components/util/MediaSize";
import Scroller from "@/components/util/Scroller";

import {
    CompanyInfo,
    FunFact,
    MediaGroup,
    MiniServiceGroup,
    MultiMedia,
    Service,
    ServiceContent,
    Testimonial,
} from "@/lib/types";
import { PortfolioItemGroup } from "@/lib/types/groups/portfolioItemGroup";

function findItem<T extends { _id: string }>(items: T[] = [], id: string) {
    return items.find((item) => item._id === id) as T;
}

function makeContent(
    content: ServiceContent,
    gallery: MultiMedia[],
    windowSize: { width: number },
) {
    return content.references.map((ref, idx) => (
        <div className="my-16 lg:my-16" key={idx}>
            {ref._type === "funFact" &&
                makeFunFact(findItem(content.funFacts, ref._id), gallery)}
            {ref._type === "testimonial" &&
                makeTestimonial(findItem(content.testimonials, ref._id))}
            {ref._type === "mediaGroup" &&
                makeMediaGroup(
                    findItem(content.mediaGroups, ref._id),
                    windowSize,
                )}
            {ref._type === "miniServiceGroup" &&
                makeServiceGroup(findItem(content.miniServiceGroups, ref._id))}
            {ref._type === "portfolioItemGroup" &&
                makePortfolioGroup(
                    findItem(content.portfolioItemGroups, ref._id),
                )}
        </div>
    ));
}

function makeFunFact(funFact: FunFact, gallery: MultiMedia[]) {
    return (
        <div className="m-auto max-w-[900px]">
            <FunFactCard src={funFact} gallery={gallery} />
        </div>
    );
}

function makeTestimonial(testimonial: Testimonial) {
    return (
        <div className="m-auto max-w-[900px]">
            <TestimonialCard src={testimonial} />
        </div>
    );
}

function makeMediaGroup(mediaGroup: MediaGroup, windowSize: { width: number }) {
    return (
        <Gallery.Carousel
            rows={2}
            gap={windowSize.width > 800 ? 8 : 4}
            height={windowSize.width > 800 ? 300 : 150}
            speed={50}
            items={(mediaGroup.items || []).map((item) => ({
                component: <Media src={item} size={Medium} />,
                aspectRatio: getAspectRatio(item),
            }))}
        />
    );
}

function makeServiceGroup(servicesGroup: MiniServiceGroup) {
    return (
        <div className="m-auto max-w-[900px]">
            <Scroller className="flex gap-4">
                {servicesGroup.items.map((service, idx) => (
                    <MiniServiceCard
                        className="min-w-[280px] shrink-0 grow basis-1"
                        src={service}
                        key={idx}
                    />
                ))}
            </Scroller>
        </div>
    );
}

function makePortfolioGroup(portfolioGroup: PortfolioItemGroup) {
    return (
        <div className="m-auto max-w-[900px]">
            <Scroller className="flex gap-4">
                {portfolioGroup.items.map((item, idx) => (
                    <PortfolioCard
                        className="aspect-4/3 min-w-[280px] shrink-0 grow basis-1"
                        src={item}
                        key={idx}
                    />
                ))}
            </Scroller>
        </div>
    );
}

export default function Page({
    service,
    companyInfo,
}: {
    companyInfo: CompanyInfo;
    service: Service;
}) {
    const windowSize = useWindowSize();

    return (
        <>
            <Nav
                companyInfo={companyInfo}
                active="services"
                threshold={0}
                inverted
            />

            <NavSpacer />

            <div className="m-auto max-w-screen-2xl px-4 pt-2 md:mb-24">
                <div className="grid grid-rows-[auto_auto] gap-8 lg:grid-cols-2 lg:grid-rows-1">
                    <div className="relative order-2 lg:order-1">
                        <PortableText
                            value={service.heroText}
                            components={{
                                block: {
                                    h1: ({ children }) => (
                                        <h1 className="mb-4 font-counter text-[15vw] leading-[0.8em] tracking-tighter md:text-8xl lg:text-7xl xl:text-8xl 2xl:text-9xl">
                                            {children}
                                        </h1>
                                    ),
                                    normal: ({ children }) => (
                                        <p className="text-xl font-light leading-[1.2em] sm:text-[1.6rem] md:max-w-[80%]">
                                            {children}
                                        </p>
                                    ),
                                },
                            }}
                        />

                        <div>
                            <Button className="my-4">
                                <Button.Label className="bg-black pb-1 text-3xl text-white">
                                    {service.callToAction}
                                </Button.Label>
                                <Button.Arrow className="bg-black" />
                                <Button.Spacer />
                            </Button>
                        </div>

                        <div
                            className={clsx(
                                "absolute right-0 hidden md:block",
                                {
                                    "top-[-10px] h-[110%] lg:right-[-70px]":
                                        service.teamMember.slug.current ===
                                        "william-gardner",
                                    "top-[-13px] h-[115%] lg:right-[-100px]":
                                        service.teamMember.slug.current ===
                                        "luke-a-makinson",
                                    "top-[-10px] h-[110%] lg:right-[-71px]":
                                        service.teamMember.slug.current ===
                                        "henry-buck",
                                },
                            )}
                        >
                            <Media
                                src={service.teamMember.actionShot}
                                size={Small}
                                mode="contain"
                                className="float-right"
                            />
                        </div>
                    </div>

                    <div className="order-1 items-center lg:order-2 lg:flex">
                        <div className="aspect-video grow">
                            <HeroMedia
                                className="h-full w-full"
                                video={service.videoEmbed}
                                slideshow={service.slideshow}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {makeContent(service.content, service.slideshow, windowSize)}

            <div className="m-auto max-w-[900px] px-4">
                <PrettyCoolRight className="mb-32" inverted />
            </div>
        </>
    );
}
