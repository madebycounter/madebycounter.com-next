import clsx from "clsx";
import { link } from "fs";
import { PortableText } from "next-sanity";

import Arrow from "@/components/site/Arrow";
import Button from "@/components/site/Button";
import Media from "@/components/util/Media";

import { FunFact } from "@/lib/types";

import styles from "./FunFactCard.module.css";

export interface FunFactCardProps {
    src: FunFact;
}

export default function FunFactCard({ src }: FunFactCardProps) {
    return (
        <div className={clsx(styles.FunFactCard)}>
            <div className={clsx(styles.Portrait)}>
                <div className={clsx(styles.Portrait__desktop)}>
                    <Media src={src.teamMember.profile} size="small" />
                </div>

                <div className={clsx(styles.Portrait__mobile)}>
                    <Media
                        src={src.teamMember.funFact}
                        size="small"
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
                <Button href="/contact" className={styles.Button}>
                    {src.buttonText}
                </Button>
            </div>
        </div>
    );
}
