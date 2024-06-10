import Link from "next/link";

import Media from "@/components/media/Media";
import Nav from "@/components/site/Nav";

import { CompanyInfo, PortfolioItem } from "@/lib/sanity.types";

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
                    {portfolioItem.tags.map((tag) => (
                        <>
                            {tag}
                            <br />
                        </>
                    ))}
                </p>
            </div>
        </Link>
    );
}

export default function Portfolio({
    companyInfo,
    portfolioItems,
}: {
    companyInfo: CompanyInfo;
    portfolioItems: PortfolioItem[];
}) {
    return (
        <div className="min-h-screen bg-black">
            <Nav companyInfo={companyInfo} active="portfolio" />

            <div className="m-auto grid max-w-screen-lg gap-8 px-4 py-32 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
                {portfolioItems.map((portfolioItem) => (
                    <>
                        <PortfolioCard
                            key={portfolioItem._id}
                            portfolioItem={portfolioItem}
                        />

                        <PortfolioCard
                            key={portfolioItem._id}
                            portfolioItem={portfolioItem}
                        />

                        <PortfolioCard
                            key={portfolioItem._id}
                            portfolioItem={portfolioItem}
                        />

                        <PortfolioCard
                            key={portfolioItem._id}
                            portfolioItem={portfolioItem}
                        />

                        <PortfolioCard
                            key={portfolioItem._id}
                            portfolioItem={portfolioItem}
                        />

                        <PortfolioCard
                            key={portfolioItem._id}
                            portfolioItem={portfolioItem}
                        />

                        <PortfolioCard
                            key={portfolioItem._id}
                            portfolioItem={portfolioItem}
                        />

                        <PortfolioCard
                            key={portfolioItem._id}
                            portfolioItem={portfolioItem}
                        />
                        <PortfolioCard
                            key={portfolioItem._id}
                            portfolioItem={portfolioItem}
                        />

                        <PortfolioCard
                            key={portfolioItem._id}
                            portfolioItem={portfolioItem}
                        />

                        <PortfolioCard
                            key={portfolioItem._id}
                            portfolioItem={portfolioItem}
                        />

                        <PortfolioCard
                            key={portfolioItem._id}
                            portfolioItem={portfolioItem}
                        />

                        <PortfolioCard
                            key={portfolioItem._id}
                            portfolioItem={portfolioItem}
                        />

                        <PortfolioCard
                            key={portfolioItem._id}
                            portfolioItem={portfolioItem}
                        />

                        <PortfolioCard
                            key={portfolioItem._id}
                            portfolioItem={portfolioItem}
                        />

                        <PortfolioCard
                            key={portfolioItem._id}
                            portfolioItem={portfolioItem}
                        />
                        <PortfolioCard
                            key={portfolioItem._id}
                            portfolioItem={portfolioItem}
                        />

                        <PortfolioCard
                            key={portfolioItem._id}
                            portfolioItem={portfolioItem}
                        />

                        <PortfolioCard
                            key={portfolioItem._id}
                            portfolioItem={portfolioItem}
                        />

                        <PortfolioCard
                            key={portfolioItem._id}
                            portfolioItem={portfolioItem}
                        />

                        <PortfolioCard
                            key={portfolioItem._id}
                            portfolioItem={portfolioItem}
                        />

                        <PortfolioCard
                            key={portfolioItem._id}
                            portfolioItem={portfolioItem}
                        />

                        <PortfolioCard
                            key={portfolioItem._id}
                            portfolioItem={portfolioItem}
                        />

                        <PortfolioCard
                            key={portfolioItem._id}
                            portfolioItem={portfolioItem}
                        />
                    </>
                ))}
            </div>
        </div>
    );
}
