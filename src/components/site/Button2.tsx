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
                className={clsx("flex w-full items-start", {
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
        <div className={className} ref={ctx.ref}>
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
                className={clsx("absolute aspect-[16/46]", className, {
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

Button.Label = Label;
Button.Arrow = Arrow;
Button.Spacer = Spacer;

export default Button;
