"use client";

import clsx from "clsx";

import Action from "@/components/util/Action";
import Form from "@/components/util/Form";
import Media from "@/components/util/Media";
import SocialIcon from "@/components/util/SocialIcon";

import { CompanyInfo } from "@/lib/types";

import styles from "./Footer.module.css";

export interface FooterProps {
    companyInfo: CompanyInfo;
    className?: string;
    inverted?: boolean;
}

export default function Footer({
    companyInfo,
    className = "",
    inverted = false,
}: FooterProps) {
    return (
        <div
            className={clsx(className, "w-full", {
                "bg-black text-white": !inverted,
                "bg-white text-black": inverted,
            })}
        >
            <div className="mx-auto max-w-screen-lg px-4 py-4 md:py-12">
                <div
                    className={clsx(
                        styles.Footer,
                        "mx-auto max-w-[400px] md:max-w-full",
                    )}
                >
                    <div
                        className={clsx(
                            styles.Quick,
                            "shrink grow basis-[240px]",
                        )}
                    >
                        <p className="my-3 text-sm font-bold sm:text-base">
                            Quick Links
                        </p>
                        {companyInfo.footerLinks.map((fl, idx) => (
                            <p key={idx} className="my-2 text-xs sm:text-sm">
                                <Action
                                    href={fl.url}
                                    target={fl.external ? "_blank" : ""}
                                >
                                    {fl.text}
                                </Action>
                            </p>
                        ))}
                    </div>

                    <div
                        className={clsx(
                            styles.Services,
                            "shrink grow basis-[240px]",
                        )}
                    >
                        <p className="my-3 text-sm font-bold sm:text-base">
                            Our Services
                        </p>
                        {companyInfo.services.map((s, idx) => (
                            <p key={idx} className="my-2 text-xs sm:text-sm">
                                <Action href={`/services/${s.slug.current}`}>
                                    {s.title}
                                </Action>
                            </p>
                        ))}
                    </div>

                    <div
                        className={clsx(
                            styles.Recent,
                            "shrink grow basis-[240px]",
                        )}
                    >
                        <p className="my-3 text-sm font-bold sm:text-base">
                            Recent Work
                        </p>
                        {companyInfo.recent.map((r, idx) => (
                            <p key={idx} className="my-2 text-xs sm:text-sm">
                                <Action href={`/portfolio/${r.slug.current}`}>
                                    {r.title}
                                </Action>
                            </p>
                        ))}
                    </div>

                    <div
                        className={clsx(
                            styles.Newsletter,
                            "shrink grow basis-[240px]",
                        )}
                    >
                        <p className="my-3 font-bold">Newsletter</p>
                        <p className="my-2 text-sm">
                            Want more updates from the team? Subscribe to our
                            monthly newsletter!
                        </p>

                        <Form className="flex items-center justify-center gap-1">
                            <Form.Input
                                className="grow rounded-none border-2 border-black bg-white p-1 text-sm text-black"
                                placeholder="Email"
                                name="email"
                                type="email"
                                autoComplete="email"
                            />

                            <button
                                type="submit"
                                className={clsx(
                                    "float-right rounded-none border-2 border-black px-2 py-1 text-sm",
                                    {
                                        "bg-white text-black": !inverted,
                                        "bg-black text-white": inverted,
                                    },
                                )}
                            >
                                Submit
                            </button>
                        </Form>
                    </div>
                </div>

                <div className="my-4">
                    <ul className="flex items-center justify-center text-3xl">
                        <li
                            className={clsx("mr-4 flex-grow border-t sm:mr-8", {
                                "border-white": !inverted,
                                "border-black": inverted,
                            })}
                        />
                        {companyInfo.socials.map((social, idx) => (
                            <li key={idx}>
                                <Action
                                    label={social.platform}
                                    href={social.link}
                                    target="_blank"
                                >
                                    <SocialIcon
                                        platform={social.platform}
                                        className="m-[0.3em] h-[1em] w-[1em] md:m-[0.8em]"
                                    />
                                </Action>
                            </li>
                        ))}
                        <li
                            className={clsx("ml-4 flex-grow border-t sm:ml-8", {
                                "border-white": !inverted,
                                "border-black": inverted,
                            })}
                        />
                    </ul>
                </div>

                <div>
                    <div className="m-auto w-[150px] py-4">
                        <Media
                            src={companyInfo.logo}
                            size={{
                                img: 300,
                                video: "low",
                            }}
                            className={clsx({
                                invert: !inverted,
                            })}
                        />
                    </div>

                    <p className="text-center text-sm">
                        &copy; {new Date().getFullYear()} {companyInfo.name}.
                        All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
