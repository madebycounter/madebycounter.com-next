import clsx from "clsx";

import Media from "@/components/util/Media";

import { PortfolioItem } from "@/lib/types";

export interface PortfolioCardProps {
    src: PortfolioItem;
    className?: string;
}

export default function PortfolioCard({ src, className }: PortfolioCardProps) {
    return (
        <a
            className={clsx(
                className,
                "group relative block w-full cursor-pointer overflow-hidden",
            )}
            href={`/portfolio/${src.slug.current}`}
        >
            <div className="h-full w-full scale-100 blur-xs brightness-75 transition-all group-hover:scale-105 group-hover:brightness-100">
                <Media src={src.thumbnail} mode="cover" />
            </div>

            <p className="absolute bottom-0 left-0 z-10 m-2 mr-4 font-counter text-4xl font-normal leading-[0.9em] tracking-tight text-white drop-shadow-counter">
                {src.title}
            </p>

            <p className="absolute left-0 top-0 z-10 w-full p-2 text-right font-light leading-[0.9em] text-white drop-shadow-counter">
                {src.tags.map((tag, i) => (
                    <span key={i}>
                        {tag}
                        <br />
                    </span>
                ))}
            </p>
        </a>
    );
}
