"use client";

import { stegaClean } from "@sanity/client/stega";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

import Action from "@/components/util/Action";
import Media from "@/components/util/Media";
import BaseNav from "@/components/util/Nav";

import { CompanyInfo } from "@/lib/types";

import styles from "./Nav.module.css";

export interface NavItemProps {
    children: React.ReactNode;
    href: string;
    active?: boolean;
    inverted?: boolean;
}

export function NavSpacer() {
    return <div className="h-16" />;
}

export function NavItem({
    children,
    href,
    active = false,
    inverted,
}: NavItemProps) {
    return (
        <li
            className={clsx("text-md font-counter uppercase tracking-wider", {
                underline: active,
                "text-white": !inverted,
                "text-black": inverted,
            })}
        >
            <Link href={href}>{children}</Link>
        </li>
    );
}

export interface NavProps {
    companyInfo: CompanyInfo;
    active?: "" | "about" | "services" | "portfolio" | "blog";
    inverted?: boolean;
    threshold?: number;
    scrollBehavior?: boolean;
    solid?: boolean;
}

export default function Nav({
    companyInfo,
    inverted = false,
    active = "",
    threshold,
    scrollBehavior = true,
    solid = false,
}: NavProps) {
    const [navOpen, setNavOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);

    return (
        <>
            <BaseNav.Variable
                className={clsx(
                    "z-30 h-16 px-4 py-2 transition-all duration-300 md:px-8",
                    {
                        "bg-gradient-to-b from-black/60 to-transparent hover:bg-black":
                            !inverted && !solid,
                        "bg-black hover:bg-black": inverted || solid,
                        "bg-white hover:bg-white": inverted,
                    },
                )}
                classNameScrolled={
                    scrollBehavior
                        ? clsx({
                              "bg-black": !inverted,
                              "bg-white": inverted,
                          })
                        : ""
                }
                // className={clsx("px-8 transition-all duration-300", {
                //     "bg-gradient-to-b from-black/60 to-transparent": !inverted,
                //     "bg-white": inverted,
                //     "h-20 py-4": !scrollBehavior,
                // })}
                // classNameTop="h-20 py-4"
                // classNameScrolled={
                //     scrollBehavior
                //         ? clsx("h-16 py-2", {
                //               "bg-black": !inverted,
                //               "bg-white": inverted,
                //           })
                //         : ""
                // }
                threshold={threshold}
            >
                <BaseNav.Logo className="py-2">
                    <Link href="/">
                        <Media
                            src={companyInfo.logo}
                            alt={companyInfo.name}
                            mode="cover"
                            size={{
                                img: 300,
                                video: "low",
                            }}
                            className={clsx("!h-auto !w-[150px]", {
                                "!invert": !inverted,
                            })}
                        />
                    </Link>
                </BaseNav.Logo>

                <div>
                    <BaseNav.Items className="!hidden gap-8 md:!flex">
                        <NavItem
                            href="/"
                            active={active === "about"}
                            inverted={inverted}
                        >
                            About
                        </NavItem>

                        <li
                            className={clsx(
                                "text-md relative font-counter uppercase tracking-wide",
                                {
                                    underline: active === "services",
                                    "text-white": !inverted,
                                    "text-black": inverted,
                                },
                                styles.dropdown,
                            )}
                        >
                            Services
                            <div
                                className={clsx(styles.content, {
                                    "bg-black": !inverted,
                                    "bg-white": inverted,
                                })}
                            >
                                {companyInfo.services
                                    ?.filter((service) => !service.hidden)
                                    .map((service, idx) => (
                                        <Action
                                            key={idx}
                                            className={clsx(
                                                "block text-nowrap",
                                                {
                                                    "text-white": !inverted,
                                                    "text-black": inverted,
                                                },
                                            )}
                                            href={`/services/${service.slug?.current}`}
                                        >
                                            {stegaClean(service.title)}
                                        </Action>
                                    ))}
                            </div>
                        </li>

                        <NavItem
                            href="/portfolio"
                            active={active === "portfolio"}
                            inverted={inverted}
                        >
                            Portfolio
                        </NavItem>

                        <NavItem
                            href="https://www.youtube.com/@madebycounter?sub_confirmation=1"
                            active={active === "blog"}
                            inverted={inverted}
                        >
                            Watch
                        </NavItem>
                    </BaseNav.Items>

                    <BaseNav.Items className="!flex gap-8 md:!hidden">
                        <Action onClick={() => setNavOpen(true)}>
                            <GiHamburgerMenu
                                className={clsx("h-[1.5rem] w-[1.5rem]", {
                                    "text-black": inverted,
                                    "text-white": !inverted,
                                })}
                            />
                        </Action>
                    </BaseNav.Items>
                </div>
            </BaseNav.Variable>

            <div
                className={clsx(
                    "fixed right-0 top-0 z-50 h-full w-full max-w-[300px] bg-black transition-all duration-300",
                    {
                        "translate-x-full": !navOpen,
                    },
                )}
            >
                <Action onClick={() => setNavOpen(false)}>
                    <IoMdClose
                        className={clsx(
                            "absolute right-0 top-0 mr-3 mt-3 h-[2.2rem] w-[2.2rem] text-white hover:brightness-75",
                            {
                                "": inverted,
                            },
                        )}
                    />
                </Action>

                <div className="m-4 mt-12">
                    <Action
                        className="mb-2 block font-counter text-4xl uppercase tracking-tight text-white hover:brightness-75"
                        href="/"
                    >
                        About
                    </Action>
                    <Action
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className="mb-2 block font-counter text-4xl uppercase tracking-tight text-white hover:brightness-75"
                    >
                        Services
                    </Action>
                    <div
                        className={clsx("origin-top transition-all", {
                            "pointer-events-none mb-0 h-0 scale-y-50 opacity-0":
                                !servicesOpen,
                            "pointer-events-auto mb-2 h-auto scale-y-100 opacity-100":
                                servicesOpen,
                        })}
                    >
                        {companyInfo.services
                            ?.filter((service) => !service.hidden)
                            .map((service, idx) => (
                                <Action
                                    key={idx}
                                    className={clsx(
                                        "ml-4 block text-nowrap font-counter text-2xl uppercase tracking-tight text-white hover:brightness-75",
                                    )}
                                    href={`/services/${service.slug?.current}`}
                                >
                                    {stegaClean(service.title)}
                                </Action>
                            ))}
                    </div>
                    <Action
                        className="mb-2 block font-counter text-4xl uppercase tracking-tight text-white hover:brightness-75"
                        href="/portfolio"
                    >
                        Portfolio
                    </Action>
                    <Action
                        className="mb-2 block font-counter text-4xl uppercase tracking-tight text-white hover:brightness-75"
                        href="https://www.youtube.com/@madebycounter?sub_confirmation=1"
                    >
                        Watch
                    </Action>
                </div>
            </div>
        </>
    );
}
