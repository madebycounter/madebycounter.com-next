import Link from "next/link";

import Nav from "@/components/site/Nav";
import Media from "@/components/util/Media";

import { CompanyInfo, PortfolioItem } from "@/lib/types";

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

            <div className="m-auto grid max-w-screen-xl gap-8 px-4 py-32 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
                {portfolioItems
                    .sort()
                    .filter((item) => !item.hidden)
                    .map((portfolioItem, idx) => (
                        <>
                            <PortfolioCard
                                key={idx}
                                portfolioItem={portfolioItem}
                            />
                        </>
                    ))}
            </div>
        </div>
    );
}
