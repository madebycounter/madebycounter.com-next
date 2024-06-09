import clsx from "clsx";
import Link from "next/link";

import Media from "@/components/media/Media";
import BaseNav from "@/components/util/Nav";

import { CompanyInfo } from "@/lib/sanity.types";

export interface NavItemProps {
    children: React.ReactNode;
    href: string;
    active?: boolean;
}

export function NavItem({ children, href, active = false }: NavItemProps) {
    return (
        <li
            className={clsx("text-xl lowercase text-white", {
                underline: active,
            })}
        >
            <Link href={href}>{children}</Link>
        </li>
    );
}

export interface NavProps {
    companyInfo: CompanyInfo;
    active?: "" | "about" | "services" | "portfolio" | "blog";
}

export default function Nav({ companyInfo, active = "" }: NavProps) {
    return (
        <BaseNav.Variable
            className="bg-gradient-to-b from-black/60 to-transparent px-8 transition-all duration-300"
            classNameTop="h-20 py-4"
            classNameScrolled="bg-black h-16 py-2 invert"
        >
            <BaseNav.Logo className="py-2">
                <Link href="/" className="invert">
                    <Media
                        src={companyInfo.logo}
                        alt={companyInfo.name}
                        mode="cover"
                        priority
                        blur={false}
                    />
                </Link>
            </BaseNav.Logo>

            <BaseNav.Items className="gap-8">
                <NavItem href="/" active={active === "about"}>
                    About
                </NavItem>

                <NavItem href="/services" active={active === "services"}>
                    Services
                </NavItem>

                <NavItem href="/portfolio" active={active === "portfolio"}>
                    Portfolio
                </NavItem>

                <NavItem href="/blog" active={active === "blog"}>
                    Blog
                </NavItem>
            </BaseNav.Items>
        </BaseNav.Variable>
    );
}
