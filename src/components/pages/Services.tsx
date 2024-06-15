"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import { useScrollPosition } from "@/util/hooks";
import mod from "@/util/mod";
import "@/util/scrollSnap.css";

import Nav from "@/components/site/Nav";
import Media from "@/components/util/Media";

import { CompanyInfo, Service } from "@/lib/types";

export default function Page({
    services,
    companyInfo,
}: {
    services: Service[];
    companyInfo: CompanyInfo;
}) {
    const scrollPosition = useScrollPosition();
    const boxRef = useRef<HTMLDivElement>(null);
    const titlesRef = useRef<HTMLHeadingElement[]>([]);
    const imagesRef = useRef<HTMLDivElement[]>([]);
    const [active, setActive] = useState(0);

    const serviceData = [
        "Photography",
        "Videography",
        "Real Estate",
        "Drone Piloting",
        "Web Development",
        "Live Events",
    ];

    useEffect(() => {
        if (!boxRef.current) return;

        let index = scrollPosition / window.innerHeight;
        let titleHeight =
            titlesRef.current[
                mod(Math.round(index) - 2, titlesRef.current.length)
            ].offsetHeight;
        boxRef.current.style.transform = `translateY(${-index * titleHeight}px)`;

        setActive(Math.round(index));
    }, [scrollPosition, boxRef]);

    return (
        <>
            <Nav
                companyInfo={companyInfo}
                active="services"
                scrollBehavior={false}
            />

            <div ref={boxRef} className="fixed bottom-0 z-50 h-[50vh] w-full">
                {serviceData.map((service, i) => (
                    <h1
                        key={i}
                        onClick={() => {
                            imagesRef.current[i].scrollIntoView({
                                behavior: "smooth",
                            });
                        }}
                        className={clsx(
                            "block cursor-pointer font-counter text-[10vw] tracking-tighter text-white transition-all duration-300 sm:text-7xl lg:text-9xl",
                            {
                                "text-[12vw] sm:text-7xl lg:text-[10rem]":
                                    active === i,
                            },
                        )}
                        style={{
                            opacity: 1 - Math.abs(active - i) * 0.3,
                        }}
                        ref={(el) => {
                            titlesRef.current[i] = el as HTMLHeadingElement;
                        }}
                    >
                        {service}
                    </h1>
                ))}
            </div>

            <div className="brightness-75">
                {serviceData.map((_, i) => (
                    <div
                        key={i}
                        className="h-screen w-full snap-center"
                        ref={(el) => {
                            imagesRef.current[i] = el as HTMLDivElement;
                        }}
                    >
                        <Media
                            src={services[0].slideshow[i]}
                            size="large"
                            mode="cover"
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
