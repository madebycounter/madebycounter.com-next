import clsx from "clsx";

import Contact from "@/components/site/Contact";

export interface PrettyCoolRightProps {
    className?: string;
    inverted?: boolean;
}

export default function PrettyCoolRight({
    className,
    inverted = false,
}: PrettyCoolRightProps) {
    return (
        <div
            className={clsx(className, "mx-4 flex flex-col gap-8 md:flex-row")}
        >
            <div>
                <p
                    className={clsx(
                        "font-counter text-[17vw] leading-[0.9em] tracking-tighter md:text-9xl md:leading-[0.8em]",
                        {
                            "text-white": !inverted,
                            "text-black": inverted,
                        },
                    )}
                >
                    Pretty&nbsp;
                    <br className="hidden md:block" />
                    cool,
                    <br />
                    right?
                </p>
            </div>

            <div className="grow">
                <Contact inverted={inverted} />
            </div>
        </div>
    );
}
