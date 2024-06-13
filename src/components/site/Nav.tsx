import clsx from "clsx";
import Link from "next/link";

import Media from "@/components/util/Media";
import BaseNav from "@/components/util/Nav";

import { CompanyInfo } from "@/lib/types";

export interface NavItemProps {
    children: React.ReactNode;
    href: string;
    active?: boolean;
    inverted?: boolean;
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
}

export default function Nav({
    companyInfo,
    inverted = false,
    active = "",
    threshold,
}: NavProps) {
    return (
        <BaseNav.Variable
            className={clsx("px-8 transition-all duration-300", {
                "bg-gradient-to-b from-black/60 to-transparent": !inverted,
                "bg-white": inverted,
            })}
            classNameTop="h-20 py-4"
            classNameScrolled={clsx("h-16 py-2", {
                "bg-black": !inverted,
                "bg-white": inverted,
            })}
            threshold={threshold}
        >
            <BaseNav.Logo className="py-2">
                <Link
                    href="/"
                    className={clsx({
                        invert: !inverted,
                    })}
                >
                    <Media
                        src={companyInfo.logo}
                        alt={companyInfo.name}
                        mode="cover"
                    />
                </Link>
            </BaseNav.Logo>

            <BaseNav.Items className="gap-8">
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
        </BaseNav.Variable>
    );
}
