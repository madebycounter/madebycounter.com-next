import clsx from "clsx";

import Media from "@/components/util/Media";

import { PortfolioItem } from "@/lib/types";

export interface PortfolioCardProps {
    src: PortfolioItem;
    className?: string;
}

export default function PortfolioCard({ src, className }: PortfolioCardProps) {
    return (
        <div
            className={clsx(
                className,
                "group relative block w-full cursor-pointer overflow-hidden",
            )}
        >
            <div className="h-full w-full scale-100 blur-sm brightness-75 transition-all group-hover:scale-105 group-hover:brightness-100">
                <Media src={src.thumbnail} mode="cover" />
            </div>

            <h3 className="absolute bottom-0 left-0 z-10 m-2 mr-4 font-counter text-3xl font-normal leading-[0.9em] tracking-tight text-white drop-shadow-sm">
                {src.title}
            </h3>

            <p className="absolute left-0 top-0 z-10 w-full p-2 text-right font-light leading-[0.9em] text-white drop-shadow-sm">
                {src.tags.map((tag, i) => (
                    <span key={i}>
                        {tag}
                        <br />
                    </span>
                ))}
            </p>
        </div>
    );
}
