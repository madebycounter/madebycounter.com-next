"use client";

import clsx from "clsx";

import Button from "@/components/site/Button";
import Contact from "@/components/site/Contact";
import Nav from "@/components/site/Nav";
import PrettyCoolRight from "@/components/site/PrettyCoolRight";
import PortfolioCard from "@/components/site/cards/PortfolioCard";
import Media from "@/components/util/Media";
import Slideshow, { filterMedia } from "@/components/util/Slideshow";

import { AboutPage, CompanyInfo, PortfolioItem, TeamMember } from "@/lib/types";

import styles from "./About.module.css";

export default function Page({
    portfolioItem,
    companyInfo,
    henry,
    luke,
    william,
    aboutPage,
}: {
    portfolioItem: PortfolioItem;
    companyInfo: CompanyInfo;
    henry: TeamMember;
    luke: TeamMember;
    william: TeamMember;
    aboutPage: AboutPage;
}) {
    return (
        <div className="bg-black">
            <Nav companyInfo={companyInfo} active="about" />

            <div className="relative h-screen w-full">
                <Media
                    src={portfolioItem.gallery[9]}
                    mode="cover"
                    size="large"
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

            <div className="flex w-full flex-col-reverse items-center gap-12 overflow-x-clip py-32 sm:gap-32 xl:flex-row-reverse xl:gap-0">
                <div className="flex w-full flex-col gap-4 bg-white p-4 sm:flex-row xl:w-[450px] xl:flex-col 2xl:w-[750px]">
                    <div className="flex shrink grow-0 flex-col gap-4 xl:flex-row">
                        <div className="aspect-video w-full sm:w-[40vw] lg:w-full">
                            <PortfolioCard
                                className="aspect-video"
                                src={aboutPage.lukeReferences[0]}
                            />
                        </div>

                        <div className="hidden aspect-video w-[40vw] sm:block lg:w-full xl:hidden 2xl:block">
                            <PortfolioCard
                                className="aspect-video"
                                src={aboutPage.lukeReferences[1]}
                            />
                        </div>
                    </div>

                    <div className="flex shrink grow flex-col justify-between">
                        <p className="font-counter text-[19vw] !leading-[0.8em] tracking-tighter sm:text-[12vw] lg:text-9xl xl:text-8xl 2xl:text-9xl">
                            We make
                            <br />
                            business
                            <br />
                            happen.
                        </p>

                        <div>
                            <Button href="/contact" className="mt-8">
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

                    <p className="my-[4vw] text-[5.2vw] font-light leading-[1.3em] text-white md:my-4 md:text-4xl">
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
                            <Slideshow
                                items={filterMedia(aboutPage.lukeSlideshow1)}
                            />
                        </div>

                        <div className="aspect-video w-full">
                            <Slideshow
                                items={filterMedia(aboutPage.lukeSlideshow2)}
                            />
                        </div>
                    </div>

                    <div className="absolute left-[32vw] top-[75vw] z-10 w-[24vw] invert md:left-[369px] md:top-[320px] md:w-[190px]">
                        <Media src={luke.signature} mode="width" />
                    </div>

                    <div className="absolute left-[51vw] top-[28vw] z-10 w-[44vw] md:left-[540px] md:top-[-50px] md:w-[255px]">
                        <Media src={luke.actionShot} mode="width" />
                    </div>
                </div>
            </div>

            <div className="flex w-full flex-col-reverse items-center gap-12 overflow-x-clip py-32 sm:gap-32 xl:flex-row xl:gap-0">
                <div className="flex w-full flex-col gap-4 bg-white p-4 sm:flex-row-reverse xl:w-[450px] xl:flex-col 2xl:w-[750px]">
                    <div className="flex shrink grow-0 flex-col gap-4 xl:flex-row">
                        <div className="aspect-video w-full sm:w-[40vw] lg:w-full">
                            <PortfolioCard
                                className="aspect-video"
                                src={aboutPage.henryReferences[0]}
                            />
                        </div>

                        <div className="hidden aspect-video w-[40vw] sm:block lg:w-full xl:hidden 2xl:block">
                            <PortfolioCard
                                className="aspect-video"
                                src={aboutPage.henryReferences[1]}
                            />
                        </div>
                    </div>

                    <div className="flex shrink grow flex-col justify-between">
                        <p className="text-right font-counter text-[19vw] !leading-[0.8em] tracking-tighter sm:text-[12vw] lg:text-9xl xl:text-8xl 2xl:text-9xl">
                            Our pics
                            <br />
                            increase
                            <br />
                            sales.
                        </p>

                        <div>
                            <Button
                                href="/contact"
                                className="mt-8"
                                direction="left"
                            >
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="relative flex w-full flex-col-reverse gap-4 p-4 md:w-[750px] md:flex-row md:items-end md:justify-end md:p-0 lg:w-[800px] xl:mr-4">
                    <div className="flex w-[49vw] flex-col gap-[2vw] md:w-[250px] md:gap-2">
                        <div
                            className={clsx(
                                styles.henryImageMobile,
                                "absolute bottom-4 right-4 z-10 aspect-[3/4] md:relative md:bottom-0 md:right-0",
                            )}
                        >
                            <Slideshow
                                items={filterMedia(aboutPage.henrySlideshow2)}
                                offset={2500}
                            />
                        </div>

                        <div className="aspect-video w-full">
                            <Slideshow
                                items={filterMedia(aboutPage.henrySlideshow1)}
                            />
                        </div>
                    </div>

                    <div>
                        <h2 className="font-counter text-[19vw] font-normal !leading-[0.8em] tracking-tighter text-white md:text-9xl">
                            henry
                            <br />
                            j. buck
                        </h2>

                        <p className="my-[4vw] text-[5.2vw] font-light leading-[1.3em] text-white md:my-8 md:text-4xl">
                            Hi, I&apos;m Henry! Your
                            <br />
                            hard work deserves
                            <br />
                            a strong social media
                            <br />
                            presence. Let&apos;s build
                            <br />
                            your following with
                            <br />
                            quality photography
                            <br />
                            and graphic design.
                        </p>

                        <div className="w-[50vw] invert md:w-[335px]">
                            <Media src={henry.signature} mode="width" />
                        </div>
                    </div>

                    <div className="absolute left-[44vw] top-[-20vw] z-10 w-[51vw] md:left-[-20px] md:top-[-40px] md:w-[310px] md:-scale-x-100">
                        <Media src={henry.actionShot} mode="width" />
                    </div>
                </div>
            </div>

            <div className="flex w-full flex-col-reverse items-center gap-12 overflow-x-clip py-32 sm:gap-32 xl:flex-row-reverse xl:gap-0">
                <div className="flex w-full flex-col gap-4 bg-white p-4 sm:flex-row xl:w-[450px] xl:flex-col 2xl:w-[750px]">
                    <div className="flex shrink grow-0 flex-col gap-4 xl:flex-row">
                        <div className="aspect-video w-full sm:w-[40vw] lg:w-full">
                            <PortfolioCard
                                className="aspect-video"
                                src={aboutPage.williamReferences[0]}
                            />
                        </div>

                        <div className="hidden aspect-video w-[40vw] sm:block lg:w-full xl:hidden 2xl:block">
                            <PortfolioCard
                                className="aspect-video"
                                src={aboutPage.williamReferences[1]}
                            />
                        </div>
                    </div>

                    <div className="flex shrink grow flex-col justify-between">
                        <p className="font-counter text-[19vw] !leading-[0.8em] tracking-tighter sm:text-[12vw] lg:text-9xl xl:text-8xl 2xl:text-9xl">
                            Drones
                            <br />
                            make you
                            <br />
                            stand out.
                        </p>

                        <div>
                            <Button href="/contact" className="mt-8">
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="relative w-full p-4 md:w-[750px] md:p-0 xl:ml-4">
                    <h2 className="font-counter text-[19vw] font-normal !leading-[0.8em] tracking-tighter text-white md:text-9xl">
                        william&nbsp;
                        <br className="hidden md:inline" />
                        d.&nbsp;
                        <br className="inline md:hidden" />
                        gardner
                    </h2>

                    <p className="my-[8vw] text-[5.2vw] font-light leading-[1.3em] text-white md:my-8 md:text-4xl">
                        Hello, I&apos;m William.&nbsp;
                        <br className="inline md:hidden" />
                        Stunning aerial&nbsp;
                        <br className="hidden md:inline" />
                        footage&nbsp;
                        <br className="inline md:hidden" />
                        makes your business&nbsp;
                        <br className="inline md:hidden" />
                        stand&nbsp;
                        <br className="hidden md:inline" />
                        out. We remove&nbsp;
                        <br className="inline md:hidden" />
                        the hurdles and&nbsp;
                        <br className="hidden md:inline" />
                        put&nbsp;
                        <br className="inline md:hidden" />
                        drones to work
                        <br />
                        for you!
                    </p>

                    <div className="flex w-full flex-row gap-[2vw] md:w-[636px] md:gap-2">
                        <div className="aspect-video w-full">
                            <Slideshow
                                items={filterMedia(aboutPage.williamSlideshow1)}
                            />
                        </div>

                        <div className="aspect-video w-full">
                            <Slideshow
                                items={filterMedia(aboutPage.williamSlideshow2)}
                            />
                        </div>
                    </div>

                    <div className="absolute left-[40vw] top-[77vw] z-10 w-[25vw] invert md:left-[394px] md:top-[362px] md:w-[146px]">
                        <Media src={william.signature} mode="width" />
                    </div>

                    <div className="absolute left-[53vw] top-[-3vw] z-10 w-[40vw] md:left-[520px] md:top-0 md:w-[250px]">
                        <Media src={william.actionShot} mode="width" />
                    </div>

                    <div className="absolute left-[55vw] top-[-31vw] z-10 w-[31vw] md:left-[467px] md:top-[-190px] md:w-[215px]">
                        <Media src={william.actionShotExtra} mode="width" />
                    </div>
                </div>
            </div>

            <div className="m-auto max-w-screen-lg px-4 py-32 sm:px-8">
                <PrettyCoolRight />
            </div>
        </div>
    );
}
