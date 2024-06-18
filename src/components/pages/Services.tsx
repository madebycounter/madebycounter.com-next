"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { IoCaretForwardSharp } from "react-icons/io5";

import { useScrollPosition } from "@/util/hooks";
import "@/util/scrollSnap.css";

import Footer from "@/components/site/Footer";
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
    const imagesRef = useRef<HTMLDivElement[]>([]);
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (!boxRef.current) return;

        let index = scrollPosition / window.innerHeight;
        boxRef.current.style.transform = `translateY(${-index * 128}px)`;

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
                {services.map((service, idx) => (
                    <h1
                        key={idx}
                        onClick={() => {
                            if (idx === active) {
                                window.location.href = `/services/${service.slug.current}`;
                            } else {
                                imagesRef.current[idx].scrollIntoView({
                                    behavior: "smooth",
                                });
                            }
                        }}
                        className={clsx(
                            "block cursor-pointer font-counter text-9xl leading-[1.2em] tracking-tighter text-white transition-all duration-300",
                            {
                                "text-[10rem] drop-shadow-counter":
                                    active === idx,
                            },
                        )}
                        style={{
                            opacity: 1 - Math.abs(active - idx) * 0.3,
                        }}
                    >
                        <IoCaretForwardSharp
                            className={clsx(
                                "inline h-[11.5rem] align-top transition-all duration-300",
                                {
                                    "w-[9.5rem] translate-x-2 scale-x-100 scale-y-100":
                                        active === idx,
                                    "w-[2.7rem] -translate-x-6 scale-x-0 scale-y-50 opacity-0":
                                        active !== idx,
                                },
                            )}
                        />
                        {service.title}
                    </h1>
                ))}
            </div>

            <div className="brightness-75">
                {services.map((_, idx) => (
                    <div
                        key={idx}
                        className="h-screen w-full snap-center"
                        ref={(el) => {
                            imagesRef.current[idx] = el as HTMLDivElement;
                        }}
                    >
                        <Media
                            src={services[idx].videoSnippet}
                            size={{
                                img: 1920,
                                video: "stream",
                            }}
                            mode="cover"
                        />
                    </div>
                ))}
            </div>

            <Footer companyInfo={companyInfo} />
        </>
    );
}
