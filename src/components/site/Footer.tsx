import clsx from "clsx";

export interface FooterProps {
    className?: string;
    inverted?: boolean;
}

export default function Footer({
    className = "",
    inverted = false,
}: FooterProps) {
    return (
        <div
            className={clsx(className, "h-50 w-full", {
                "bg-black text-white": !inverted,
                "bg-white text-black": inverted,
            })}
        >
            <div className="flex items-center justify-between px-8 py-8">
                <div>
                    <p>Made by Counter LLC</p>
                    <p>Last updated idk when</p>
                </div>

                <div>
                    <p>Socials go here</p>
                </div>
            </div>
        </div>
    );
}
