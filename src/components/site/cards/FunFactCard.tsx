import clsx from "clsx";
import { PortableText } from "next-sanity";

import Arrow from "@/components/site/Arrow";
import CarouselButton from "@/components/site/CarouselButton";
import Media from "@/components/util/Media";
import { Small } from "@/components/util/MediaSize";

import { FunFact, MultiMedia } from "@/lib/types";

import styles from "./FunFactCard.module.css";

export interface FunFactCardProps {
    src: FunFact;
    gallery: MultiMedia[];
}

export default function FunFactCard({ src, gallery }: FunFactCardProps) {
    return (
        <div className={clsx(styles.FunFactCard)}>
            <div className={clsx(styles.Portrait)}>
                <div className={clsx(styles.Portrait__desktop)}>
                    <Media src={src.teamMember.profile} size={Small} />
                </div>

                <div className={clsx(styles.Portrait__mobile)}>
                    <Media
                        src={src.teamMember.funFact}
                        size={Small}
                        className="block"
                    />
                </div>
            </div>

            <div className={clsx(styles.Fact, "bg-black text-white")}>
                <p className="font-light">
                    &ldquo;
                    <PortableText
                        value={src.fact}
                        components={{
                            block: {
                                normal: ({ children }) => <>{children}</>,
                            },
                            marks: {
                                link: ({ children, value }) => {
                                    return (
                                        <a
                                            href={value.href}
                                            className="underline has-[sup]:no-underline [&>sup]:underline"
                                        >
                                            {children}
                                        </a>
                                    );
                                },
                                sup: ({ children }) => (
                                    <sup className="text-sm">{children}</sup>
                                ),
                            },
                        }}
                    />
                    &rdquo;
                </p>

                <Arrow
                    className={clsx(styles.Arrow, "bg-black")}
                    direction="left"
                />
            </div>

            <div className={clsx(styles.ButtonBox)}>
                <CarouselButton
                    href="/contact"
                    className={styles.Button}
                    media={gallery}
                >
                    {src.buttonText}
                </CarouselButton>
            </div>
        </div>
    );
}
