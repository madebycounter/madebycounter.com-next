import clsx from "clsx";
import { PortableText } from "next-sanity";

import Slash from "@/components/site/Slash";
import Media from "@/components/util/Media";
import Rating from "@/components/util/Rating";

import { Testimonial } from "@/lib/types";

import styles from "./TestimonialCard.module.css";

export interface TestimonialCardProps {
    src: Testimonial;
    className?: string;
}

export default function TestimonialCard({
    src,
    className,
}: TestimonialCardProps) {
    return (
        <div className={clsx(className, styles.TestimonialCard)}>
            <div className={clsx(styles.Review, "bg-black text-white")}>
                <Rating className="mb-2 mt-4 h-[30px] gap-1">
                    <Rating.Star className="bg-white" />
                    <Rating.Star className="bg-white" />
                    <Rating.Star className="bg-white" />
                    <Rating.Star className="bg-white" />
                    <Rating.Star className="bg-white" />
                </Rating>

                <div className={clsx(styles.ReviewContent)}>
                    <p className={clsx("font-light")}>
                        &ldquo;
                        <PortableText
                            value={src.quote}
                            components={{
                                block: {
                                    normal: ({ children }) => <>{children}</>,
                                },
                            }}
                        />
                        &rdquo;
                    </p>
                </div>

                <div className={clsx(styles.ReviewerMobile)}>
                    <p className={clsx(styles.ReviewerDetails)}>
                        <span
                            className={clsx(styles.ReviewerName, "font-bold")}
                        >
                            {src.name}
                        </span>

                        <span className={clsx(styles.ReviewerTitle)}>
                            , {src.jobTitle[src.jobTitle.length - 1]}
                        </span>
                    </p>
                </div>

                <Slash
                    direction="left"
                    className={clsx(styles.ReviewSlash, "bg-black")}
                />
            </div>

            <div className={clsx(styles.Reviewer)}>
                <div className={clsx(styles.MediaBox)}>
                    <div className="aspect-square">
                        <Media src={src.photo} mode="contain" />
                    </div>
                </div>

                <p className={clsx(styles.ReviewerDetails, "font-light")}>
                    <span className={clsx(styles.ReviewerName, "font-bold")}>
                        {src.name}
                        <br />
                    </span>

                    {src.jobTitle.map((title, idx) => (
                        <span key={idx} className={clsx(styles.ReviewerTitle)}>
                            {title}
                            <br />
                        </span>
                    ))}
                </p>
            </div>
        </div>
    );
}
