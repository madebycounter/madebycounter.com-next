import { PortableText } from "next-sanity";

import Button from "@/components/site/Button";
import HeroMedia from "@/components/site/HeroMedia";
import Nav, { NavSpacer } from "@/components/site/Nav";
import MiniServiceCard from "@/components/site/cards/MiniServiceCard";
import Media from "@/components/util/Media";
import Scroller from "@/components/util/Scroller";

import {
    CompanyInfo,
    FunFact,
    MediaGroup,
    MiniServiceGroup,
    Service,
    ServiceContent,
    Testimonial,
} from "@/lib/types";
import { PortfolioItemGroup } from "@/lib/types/groups/portfolioItemGroup";

function findItem<T extends { _id: string }>(items: T[], id: string) {
    return items.find((item) => item._id === id) as T;
}

function makeContent(content: ServiceContent) {
    return content.references.map((ref, idx) => (
        <div className="my-16 lg:my-32" key={idx}>
            {ref._type === "funFact" &&
                makeFunFact(findItem(content.funFacts, ref._id))}
            {ref._type === "testimonial" &&
                makeTestimonial(findItem(content.testimonials, ref._id))}
            {ref._type === "mediaGroup" &&
                makeMediaGroup(findItem(content.mediaGroups, ref._id))}
            {ref._type === "miniServiceGroup" &&
                makeServiceGroup(findItem(content.miniServiceGroups, ref._id))}
            {ref._type === "portfolioItemGroup" &&
                makePortfolioGroup(
                    findItem(content.portfolioItemGroups, ref._id),
                )}
        </div>
    ));
}

function makeFunFact(funFact: FunFact) {
    return <p>{funFact.title}</p>;
}

function makeTestimonial(testimonial: Testimonial) {
    return <p>{testimonial.name}</p>;
}

function makeMediaGroup(mediaGroup: MediaGroup) {
    return <p>{mediaGroup.title}</p>;
}

function makeServiceGroup(servicesGroup: MiniServiceGroup) {
    return (
        <Scroller className="flex gap-4">
            {servicesGroup.items.map((service, idx) => (
                <MiniServiceCard
                    className="min-w-[300px] shrink-0 grow basis-1"
                    src={service}
                    key={idx}
                />
            ))}
        </Scroller>
    );
}

function makePortfolioGroup(portfolioGroup: PortfolioItemGroup) {
    return <p>{portfolioGroup.title}</p>;
}

export default function Page({
    service,
    companyInfo,
}: {
    companyInfo: CompanyInfo;
    service: Service;
}) {
    console.log(service);

    return (
        <>
            <Nav companyInfo={companyInfo} inverted />

            <NavSpacer />

            <div className="m-auto max-w-screen-2xl px-4 pt-2">
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
                                        <p className="text-[1.6rem] font-light leading-[1.2em] md:max-w-[80%]">
                                            {children}
                                        </p>
                                    ),
                                },
                            }}
                        />

                        <div>
                            <Button
                                href="#"
                                className="my-4 hidden text-3xl md:flex"
                                // classNameInner="!pl-0"
                                inverted
                            >
                                {service.callToAction}
                            </Button>
                        </div>

                        <div className="absolute right-0 top-[-10px] hidden h-[110%] md:block lg:right-[-70px]">
                            <Media
                                src={service.teamMember.actionShot}
                                size="small"
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

            <div className="m-auto max-w-screen-lg px-4">
                {makeContent(service.content)}
            </div>
        </>
    );
}
