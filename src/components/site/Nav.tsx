"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

import Action from "@/components/util/Action";
import Media from "@/components/util/Media";
import BaseNav from "@/components/util/Nav";

import { CompanyInfo } from "@/lib/types";

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
}

export default function Nav({
    companyInfo,
    inverted = false,
    active = "",
    threshold,
    scrollBehavior = true,
}: NavProps) {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <>
            <BaseNav.Variable
                className={clsx(
                    "z-30 h-16 px-4 py-2 transition-all duration-300 md:px-8",
                    {
                        "bg-gradient-to-b from-black/60 to-transparent":
                            !inverted,
                        "bg-white": inverted,
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

                        <NavItem
                            href="/services"
                            active={active === "services"}
                            inverted={inverted}
                        >
                            Services
                        </NavItem>

                        <NavItem
                            href="/portfolio"
                            active={active === "portfolio"}
                            inverted={inverted}
                        >
                            Portfolio
                        </NavItem>

                        <NavItem
                            href="/blog"
                            active={active === "blog"}
                            inverted={inverted}
                        >
                            Blog
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

                    <div className="m-4 mt-12 flex flex-col items-start gap-2">
                        <Link
                            className="font-counter text-4xl uppercase tracking-tight text-white hover:brightness-75"
                            href="/"
                        >
                            About
                        </Link>
                        <Link
                            className="font-counter text-4xl uppercase tracking-tight text-white hover:brightness-75"
                            href="/services"
                        >
                            Services
                        </Link>
                        <Link
                            className="font-counter text-4xl uppercase tracking-tight text-white hover:brightness-75"
                            href="/portfolio"
                        >
                            Portfolio
                        </Link>
                        <Link
                            className="font-counter text-4xl uppercase tracking-tight text-white hover:brightness-75"
                            href="/blog"
                        >
                            Blog
                        </Link>
                    </div>
                </Action>
            </div>
        </>
    );
}
