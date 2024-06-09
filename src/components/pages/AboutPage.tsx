"use client";

import Media from "@/components/media/Media";
import Button from "@/components/site/Button";
import Nav from "@/components/site/Nav";
import Gallery from "@/components/util/Gallery";
import Lightbox, {
    mapToSlides,
    useLightboxState,
} from "@/components/util/Lightbox";

import {
    CompanyInfo,
    MultiMedia,
    PortfolioItem,
    SanityImage,
    TeamMember,
} from "@/lib/sanity.types";

import { getAspectRatio } from "../media/Media";

export default function AboutPage({
    portfolioItem,
    companyInfo,
    henry,
    luke,
    william,
}: {
    portfolioItem: PortfolioItem;
    companyInfo: CompanyInfo;
    henry: TeamMember;
    luke: TeamMember;
    william: TeamMember;
}) {
    const [open, currentSlide, setLightbox] = useLightboxState();

    return (
        <div className="bg-black">
            <Nav companyInfo={companyInfo} active="about" />

            <div className="relative h-screen w-full">
                <Media
                    src={portfolioItem.gallery[4]}
                    mode="cover"
                    sizes="100vw"
                />

                <div className="absolute bottom-0 left-0 z-10 max-w-[900px] p-4 text-white">
                    <h1 className="font-counter text-9xl font-normal tracking-tighter">
                        We make cool
                        <br />
                        stuff, see?
                    </h1>

                    <p className="mt-4 text-3xl font-light">
                        Counter, your local media production company from San
                        Jose, CA, is a team of skilled professionals across
                        numerous creative disciplines. Hailed as a “one-stop
                        shop”, we pride ourselves on providing everything
                        necessary for your project&apos;s success.
                    </p>
                </div>
            </div>

            <Button href="/contact" className="">
                Learn More
            </Button>

            <div className="flex w-full flex-col-reverse items-center gap-32 overflow-x-clip py-32 xl:flex-row-reverse xl:gap-0">
                <div className="flex w-full flex-col gap-4 bg-white p-4 sm:flex-row xl:w-[432px] xl:flex-col 2xl:w-[830px]">
                    <div className="flex shrink grow-0 flex-col gap-4 xl:flex-row">
                        <div className="aspect-video w-full sm:w-[40vw] lg:w-full">
                            <Media
                                src={portfolioItem.gallery[0]}
                                mode="cover"
                                sizes="400px"
                            />
                        </div>

                        <div className="hidden aspect-video w-[40vw] sm:block lg:w-full xl:hidden 2xl:block">
                            <Media
                                src={portfolioItem.gallery[1]}
                                mode="cover"
                                sizes="400px"
                            />
                        </div>
                    </div>

                    <div className="flex shrink grow flex-col justify-between">
                        <p className="font-counter text-8xl !leading-[0.8em] tracking-tighter sm:text-[10vw] lg:text-9xl xl:text-8xl 2xl:text-9xl">
                            We make
                            <br />
                            business
                            <br />
                            happen.
                        </p>

                        <div>
                            <Button href="/contact" className="!pl-1 invert">
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="relative w-full p-4 md:w-[750px] md:p-0 xl:ml-4">
                    <h2 className="font-counter text-[19vw] font-normal !leading-[0.8em] tracking-tighter text-white md:text-9xl">
                        luke a.
                        <br />
                        makinson
                    </h2>

                    <p className="my-[4vw] text-[5.2vw] font-light leading-[1.3em] text-white md:my-4 md:text-3xl">
                        Hey, Luke here!&nbsp;
                        <br className="inline md:hidden" />
                        Look, I like&nbsp;
                        <br className="hidden md:inline" />
                        making&nbsp;
                        <br className="inline md:hidden" />
                        cool stuff just like&nbsp;
                        <br className="inline md:hidden" />
                        you.&nbsp;
                        <br className="hidden md:inline" />
                        Let&apos;s show off&nbsp;
                        <br className="inline md:hidden" />
                        your brand&nbsp;
                        <br className="hidden md:inline" />
                        with the&nbsp;
                        <br className="inline md:hidden" />
                        quality video&nbsp;
                        <br />
                        it deserves.
                    </p>

                    <div className="flex w-[50vw] flex-col gap-[2vw] md:w-[600px] md:flex-row md:gap-2">
                        <div className="aspect-video w-full">
                            <Media
                                src={portfolioItem.gallery[8]}
                                sizes="300px"
                                mode="cover"
                            />
                        </div>

                        <div className="aspect-video w-full">
                            <Media
                                src={portfolioItem.gallery[6]}
                                sizes="300px"
                                mode="cover"
                            />
                        </div>
                    </div>

                    <div className="absolute left-[32vw] top-[75vw] w-[24vw] invert md:left-[369px] md:top-[320px] md:w-[190px]">
                        <Media
                            src={luke.signature}
                            sizes="200px"
                            mode="width"
                        />
                    </div>

                    <div className="absolute left-[51vw] top-[28vw] w-[44vw] md:left-[540px] md:top-[-50px] md:w-[255px]">
                        <Media
                            src={luke.actionShot}
                            sizes="300px"
                            mode="width"
                        />
                    </div>
                </div>
            </div>

            <Gallery.Vertical
                className="gap-1 p-32"
                items={(portfolioItem.gallery || []).map(
                    (item: MultiMedia) => ({
                        component: (
                            <Media
                                src={item as SanityImage}
                                alt={portfolioItem.title}
                                mode="cover"
                                onClick={(key) => setLightbox(true, key)}
                                sizes="30vw"
                            />
                        ),
                        aspectRatio: getAspectRatio(item),
                    }),
                )}
                columns={3}
            />

            <Lightbox
                open={open}
                setLightbox={setLightbox}
                currentSlide={currentSlide}
                slides={mapToSlides(portfolioItem.gallery)}
            />
        </div>
    );
}
