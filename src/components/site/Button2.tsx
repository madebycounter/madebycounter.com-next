import clsx from "clsx";
import {
    ReactNode,
    RefObject,
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

import Carousel from "@/components/util/Carousel";
import Media, { getVideoThumbnail } from "@/components/util/Media";

import { MultiMedia } from "@/lib/types";

import styles from "./Button.module.css";

const ButtonContext = createContext<{
    height: number;
    direction: "left" | "right";
    ref: RefObject<HTMLDivElement> | null;
}>({ height: 0, direction: "right", ref: null });

export interface ButtonProps {
    children?: ReactNode;
    direction?: "left" | "right";
    href?: string;
    onClick?: () => void;
}

function Button({ children, href, direction = "right", onClick }: ButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const Action = href ? "a" : "button";

    useEffect(() => {
        function update() {
            if (!ref.current) return;
            setHeight(ref.current.offsetHeight);
            console.log(ref.current.offsetHeight);
        }

        window.addEventListener("resize", update);
        update();

        return () => {
            window.removeEventListener("resize", update);
        };
    }, [ref]);

    return (
        <ButtonContext.Provider value={{ height, direction, ref }}>
            <Action
                href={href}
                onClick={onClick}
                className={clsx("z-0 flex w-full items-start", {
                    "flex-row": direction === "right",
                    "flex-row-reverse": direction === "left",
                })}
            >
                {children}
            </Action>
        </ButtonContext.Provider>
    );
}

export interface ButtonLabelProps {
    children?: ReactNode;
    className?: string;
}

function Label({ children, className }: ButtonLabelProps) {
    const ctx = useContext(ButtonContext);

    return (
        <div
            className={clsx(
                className,
                "text-nowrap p-[0.17em] pb-0 font-counter leading-[1em] tracking-tighter",
            )}
            ref={ctx.ref}
        >
            {children}
        </div>
    );
}

export interface ButtonArrowProps {
    className?: string;
}

function Arrow({ className }: ButtonArrowProps) {
    const ctx = useContext(ButtonContext);

    return (
        <div className="relative">
            <div
                className={clsx("absolute z-10 aspect-[16/46]", className, {
                    [styles.right]: ctx.direction === "right",
                    [styles.left]: ctx.direction === "left",
                })}
                style={{
                    height: ctx.height,
                }}
            />
        </div>
    );
}

export interface ButtonSpacerProps {
    children?: ReactNode;
    className?: string;
}

function Spacer({ children, className }: ButtonSpacerProps) {
    const ctx = useContext(ButtonContext);

    return (
        <div
            className={clsx(className)}
            style={{
                height: ctx.height,
                minWidth: ctx.height * (16 / 46),
            }}
        >
            {children}
        </div>
    );
}

export interface ButtonCarouselProps {
    items: MultiMedia[];
    className?: string;
    speed?: number;
}

function CarouselSpacer({ items, speed = 30, className }: ButtonCarouselProps) {
    const ctx = useContext(ButtonContext);

    return (
        <div
            className={clsx(className, "-z-10 grow overflow-hidden")}
            style={{
                height: ctx.height,
                minWidth: ctx.height * (16 / 46),
            }}
        >
            <Carousel
                direction={ctx.direction}
                speed={speed}
                child={
                    <div className="mr-1 flex flex-nowrap gap-1">
                        {items.map((item, idx) => (
                            <div
                                className="aspect-square"
                                key={idx}
                                style={{
                                    width: ctx.height,
                                }}
                            >
                                {item._type !== "mux.video" && (
                                    <Media src={item} size="small" />
                                )}

                                {item._type === "mux.video" && (
                                    <img
                                        src={getVideoThumbnail(item, 200)}
                                        className="h-full w-full object-cover"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                }
                childSize={(ctx.height + 4) * items.length}
            />
        </div>
    );
}

Button.Label = Label;
Button.Arrow = Arrow;
Button.Spacer = Spacer;
Button.Carousel = CarouselSpacer;

export default Button;
