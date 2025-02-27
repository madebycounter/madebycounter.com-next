"use client";

import clsx from "clsx";
import Image from "next/image";

import Button from "@/components/site/Button";
import Footer from "@/components/site/Footer";
import Highlight from "@/components/site/Highlight";
import Nav from "@/components/site/Nav";
import PrettyCoolRight from "@/components/site/PrettyCoolRight";
import PortfolioCard from "@/components/site/cards/PortfolioCard";
import Action from "@/components/util/Action";
import Media from "@/components/util/Media";
import { Large, Small } from "@/components/util/MediaSize";
import Slideshow, { filterMedia } from "@/components/util/Slideshow";

import { AboutPage, CompanyInfo } from "@/lib/types";

import styles from "./About.module.css";

export default function Page({
    companyInfo,
    aboutPage,
}: {
    companyInfo: CompanyInfo;
    aboutPage: AboutPage;
}) {
    const gallery = [
        aboutPage.hero.row1 || [],
        aboutPage.hero.row2 || [],
        aboutPage.hero.row3 || [],
        aboutPage.hero.row4 || [],
        aboutPage.hero.row5 || [],
        aboutPage.hero.row6 || [],
        aboutPage.hero.row7 || [],
    ];

    return (
        <div className="bg-black">
            <Nav companyInfo={companyInfo} active="about" />

            <div
                className={clsx(
                    "relative h-screen w-full overflow-hidden",
                    styles.gradient,
                )}
            >
                <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center">
                    {/* <h1 className="text-nowrap text-center font-counter text-[15vw] leading-[1em] tracking-tighter text-white drop-shadow-hero lg:text-[8vw]">
                        We make cool&nbsp;
                        <br className="block lg:hidden" />
                        stuff, 
                    </h1> */}
                    <h1 className="hidden text-nowrap text-center font-counter text-[8vw] leading-[1em] tracking-tighter text-white drop-shadow-hero lg:block">
                        Loud music, <Highlight>louder</Highlight> media.
                    </h1>

                    <h1 className="block text-nowrap text-left font-counter text-[15vw] leading-[1em] tracking-tighter text-white drop-shadow-hero lg:hidden">
                        Loud music,
                        <br />
                        <Highlight>louder</Highlight> media.
                    </h1>
                </div>

                <div className="absolute bottom-0 left-0 z-10 w-full">
                    <div className="mb-[10vh] flex items-center justify-center">
                        <Action
                            href="#content"
                            label="jump to content"
                            className="hover:brightness-75"
                        >
                            <Image
                                src="/caret.png"
                                width={100}
                                height={100}
                                alt=""
                                className={clsx(
                                    "aspect-square w-[10vw] drop-shadow-hero invert lg:w-[4vw]",
                                    styles.bounce,
                                )}
                            />
                        </Action>
                    </div>
                </div>

                <div className="h-full brightness-90">
                    {gallery.map((row, i) => (
                        <div
                            key={i}
                            className="flex h-[161px] origin-top-left translate-x-[-32px] rotate-[-12deg] gap-2 md:h-[212px] md:translate-x-[-42px]"
                        >
                            {row.map((item, j) => (
                                <Media
                                    key={j}
                                    src={item}
                                    size={Small}
                                    mode="height"
                                    className="h-[150px] shrink-0 md:h-[200px]"
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div id="content" />

            <div className="flex w-full flex-col-reverse items-center gap-12 overflow-x-clip py-32 sm:gap-32 xl:flex-row-reverse xl:gap-0">
                <div className="flex w-full flex-col gap-4 bg-white p-4 sm:flex-row xl:w-[450px] xl:flex-col 2xl:w-[750px]">
                    <div className="flex shrink grow-0 flex-col gap-4 xl:flex-row">
                        <div className="aspect-video w-full sm:w-[40vw]">
                            <PortfolioCard
                                className="aspect-video"
                                src={aboutPage.lukeReferences[0]}
                            />
                        </div>

                        <div className="hidden aspect-video w-[40vw] sm:block xl:hidden 2xl:block">
                            <PortfolioCard
                                className="aspect-video"
                                src={aboutPage.lukeReferences[1]}
                            />
                        </div>
                    </div>

                    <div className="flex min-w-0 shrink grow flex-col justify-between">
                        <p className="text-nowrap font-counter text-[19vw] !leading-[0.8em] tracking-tighter sm:text-[12vw] lg:text-9xl xl:text-8xl 2xl:text-9xl">
                            We make
                            <br />
                            business
                            <br />
                            happen.
                        </p>

                        <div className="z-0">
                            <Button
                                href={`/services/${aboutPage.lukeService.slug?.current}`}
                                direction="right"
                                className="mt-8"
                                label={aboutPage.lukeService.title}
                            >
                                <Button.Label className="bg-white text-3xl text-black lg:text-5xl">
                                    Learn More
                                </Button.Label>
                                <Button.Arrow className="bg-white" />
                                <Button.Carousel
                                    items={aboutPage.lukeService.slideshow}
                                />
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
                        <Media src={aboutPage.luke.signature} mode="width" />
                    </div>

                    <div className="absolute left-[51vw] top-[28vw] z-10 w-[44vw] md:left-[540px] md:top-[-50px] md:w-[255px]">
                        <Media src={aboutPage.luke.actionShot} mode="width" />
                    </div>
                </div>
            </div>

            <div className="flex w-full flex-col-reverse items-center gap-12 overflow-x-clip py-32 sm:gap-32 xl:flex-row xl:gap-0">
                <div className="flex w-full flex-col gap-4 bg-white p-4 sm:flex-row-reverse xl:w-[450px] xl:flex-col 2xl:w-[750px]">
                    <div className="flex shrink grow-0 flex-col gap-4 xl:flex-row">
                        <div className="aspect-video w-full sm:w-[40vw]">
                            <PortfolioCard
                                className="aspect-video"
                                src={aboutPage.henryReferences[0]}
                            />
                        </div>

                        <div className="hidden aspect-video w-[40vw] sm:block xl:hidden 2xl:block">
                            <PortfolioCard
                                className="aspect-video"
                                src={aboutPage.henryReferences[1]}
                            />
                        </div>
                    </div>

                    <div className="flex min-w-0 shrink grow flex-col justify-between">
                        <p className="text-nowrap text-right font-counter text-[19vw] !leading-[0.8em] tracking-tighter sm:text-[12vw] lg:text-9xl xl:text-8xl 2xl:text-9xl">
                            Our pics
                            <br />
                            increase
                            <br />
                            sales.
                        </p>

                        <div className="z-0">
                            <Button
                                href={`/services/${aboutPage.henryService.slug?.current}`}
                                direction="left"
                                className="mt-8"
                                label={aboutPage.henryService.title}
                            >
                                <Button.Label className="bg-white text-3xl text-black lg:text-5xl">
                                    Learn More
                                </Button.Label>
                                <Button.Arrow className="bg-white" />
                                <Button.Carousel
                                    items={aboutPage.henryService.slideshow}
                                />
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
                            <Media
                                src={aboutPage.henry.signature}
                                mode="width"
                            />
                        </div>
                    </div>

                    <div className="absolute left-[44vw] top-[-20vw] z-10 w-[51vw] md:left-[-20px] md:top-[-40px] md:w-[310px] md:-scale-x-100">
                        <Media src={aboutPage.henry.actionShot} mode="width" />
                    </div>
                </div>
            </div>

            <div className="flex w-full flex-col-reverse items-center gap-12 overflow-x-clip py-32 sm:gap-32 xl:flex-row-reverse xl:gap-0">
                <div className="flex w-full flex-col gap-4 bg-white p-4 sm:flex-row xl:w-[450px] xl:flex-col 2xl:w-[750px]">
                    <div className="flex shrink grow-0 flex-col gap-4 xl:flex-row">
                        <div className="aspect-video w-full sm:w-[40vw]">
                            <PortfolioCard
                                className="aspect-video"
                                src={aboutPage.williamReferences[0]}
                            />
                        </div>

                        <div className="hidden aspect-video w-[40vw] sm:block xl:hidden 2xl:block">
                            <PortfolioCard
                                className="aspect-video"
                                src={aboutPage.williamReferences[1]}
                            />
                        </div>
                    </div>

                    <div className="flex min-w-0 shrink grow flex-col justify-between">
                        <p className="text-nowrap font-counter text-[19vw] !leading-[0.8em] tracking-tighter sm:text-[10vw] lg:text-9xl xl:text-8xl 2xl:text-9xl">
                            Drones
                            <br />
                            make you
                            <br />
                            stand out.
                        </p>

                        <div className="z-0">
                            <Button
                                href={`/services/${aboutPage.williamService.slug?.current}`}
                                direction="right"
                                className="mt-8"
                                label={aboutPage.williamService.title}
                            >
                                <Button.Label className="bg-white text-3xl text-black lg:text-5xl">
                                    Learn More
                                </Button.Label>
                                <Button.Arrow className="bg-white" />
                                <Button.Carousel
                                    items={aboutPage.williamService.slideshow}
                                />
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
                        <Media src={aboutPage.william.signature} mode="width" />
                    </div>

                    <div className="absolute left-[53vw] top-[-3vw] z-10 w-[40vw] md:left-[520px] md:top-0 md:w-[250px]">
                        <Media
                            src={aboutPage.william.actionShot}
                            mode="width"
                        />
                    </div>

                    <div className="absolute left-[55vw] top-[-31vw] z-10 w-[31vw] md:left-[467px] md:top-[-190px] md:w-[215px]">
                        <Media
                            src={aboutPage.william.actionShotExtra}
                            mode="width"
                        />
                    </div>
                </div>
            </div>

            <div className="m-auto max-w-screen-lg pb-32 md:pt-16">
                <PrettyCoolRight />
            </div>

            <Footer companyInfo={companyInfo} inverted />
        </div>
    );
}
