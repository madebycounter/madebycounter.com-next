import clsx from "clsx";
import Link from "next/link";

import Nav from "@/components/site/Nav";
import Media from "@/components/util/Media";

import { CompanyInfo, PortfolioItem } from "@/lib/types";

import styles from "./Portfolio.module.css";

function PortfolioCard({ portfolioItem }: { portfolioItem: PortfolioItem }) {
    return (
        <Link href={`/portfolio/${portfolioItem.slug.current}`}>
            <div className="aspect-video">
                <Media
                    src={portfolioItem.thumbnail}
                    alt={portfolioItem.title}
                />
            </div>

            <div className="flex justify-between gap-1 pt-2 text-white">
                <h2 className="font-counter text-3xl font-normal leading-[1em]">
                    {portfolioItem.title}
                </h2>

                <p className="whitespace-nowrap text-right text-base font-light leading-[1em]">
                    {portfolioItem.tags.map((tag, i) => (
                        <span key={i}>
                            {tag}
                            <br />
                        </span>
                    ))}
                </p>
            </div>
        </Link>
    );
}

export default function Page({
    companyInfo,
    portfolioItems,
}: {
    companyInfo: CompanyInfo;
    portfolioItems: PortfolioItem[];
}) {
    return (
        <div className="min-h-screen bg-black">
            <Nav companyInfo={companyInfo} active="portfolio" />

            <div
                className={clsx(
                    "m-auto grid max-w-screen-xl grid-flow-row gap-8 px-4 py-32 sm:px-8",
                    styles.container,
                )}
            >
                {portfolioItems
                    .sort()
                    .filter((item) => !item.hidden)
                    .map((portfolioItem, idx) => (
                        <div key={idx}>
                            <PortfolioCard portfolioItem={portfolioItem} />
                        </div>
                    ))}
            </div>
        </div>
    );
}
