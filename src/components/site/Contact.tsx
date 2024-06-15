"use client";

import clsx from "clsx";

import Form, { FormData } from "../util/Form";

export interface ContactProps {
    className?: string;
    inverted?: boolean;
}

export default function Contact({ className, inverted = false }: ContactProps) {
    const themeStyles = clsx({
        "border-white bg-black text-white": !inverted,
        "border-black bg-white text-black": inverted,
    });

    function onSubmit(values: FormData) {
        console.log(values);
    }

    return (
        <Form
            className={clsx(className, "flex flex-col gap-2")}
            onSubmit={onSubmit}
        >
            <div className="flex justify-between gap-2">
                <Form.Input
                    className={clsx(
                        "shrink grow basis-0 border-2 p-2",
                        themeStyles,
                    )}
                    name="fname"
                    placeholder="First Name*"
                    size={1}
                    required
                />
                <Form.Input
                    className={clsx(
                        "shrink grow basis-0 border-2 p-2",
                        themeStyles,
                    )}
                    name="lname"
                    placeholder="Last Name"
                    size={1}
                />
            </div>
            <Form.Input
                className={clsx("border-2 p-2", themeStyles)}
                name="email"
                placeholder="Email*"
                type="email"
                required
            />
            <Form.TextArea
                className={clsx("min-h-[200px] border-2 p-2", themeStyles)}
                name="message"
                placeholder="Message"
            />

            <div>
                <button
                    type="submit"
                    className={clsx("float-right px-4 py-1", {
                        "bg-white text-black": !inverted,
                        "bg-black text-white": inverted,
                    })}
                >
                    Submit
                </button>
            </div>
        </Form>
    );
}
