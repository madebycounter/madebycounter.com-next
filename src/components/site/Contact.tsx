"use client";

import clsx from "clsx";
import { set } from "lodash";
import { useState } from "react";

import Action from "@/components/util/Action";
import Modal from "@/components/util/Modal";
import Spinner from "@/components/util/Spinner";

import Form, { FormData } from "../util/Form";

export interface ContactProps {
    className?: string;
    inverted?: boolean;
}

export default function Contact({ className, inverted = false }: ContactProps) {
    const [submitting, setSubmitting] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const themeStyles = clsx({
        "border-white bg-black text-white": !inverted,
        "border-black bg-white text-black": inverted,
    });

    function onSubmit(values: FormData) {
        setSubmitting(true);

        fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((data) => {
                setTimeout(() => {
                    setModalOpen(true);
                    setSubmitting(false);
                }, 250);
            });
    }

    return (
        <>
            <Modal open={modalOpen} setOpen={setModalOpen}>
                <div className="w-full max-w-[500px] bg-white p-4">
                    <p className="font-counter text-6xl leading-[0.9em] tracking-tighter">
                        Message Sent!
                    </p>

                    <p className="my-4 text-2xl font-light">
                        Thanks for reaching out! The team will be in touch soon.
                    </p>

                    <Action
                        onClick={() => setModalOpen(false)}
                        className="float-right bg-black px-4 py-1 text-white"
                    >
                        Close
                    </Action>
                </div>
            </Modal>

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
                        autoComplete="given-name"
                    />
                    <Form.Input
                        className={clsx(
                            "shrink grow basis-0 border-2 p-2",
                            themeStyles,
                        )}
                        name="lname"
                        placeholder="Last Name"
                        size={1}
                        autoComplete="family-name"
                    />
                </div>
                <Form.Input
                    className={clsx("border-2 p-2", themeStyles)}
                    name="email"
                    placeholder="Email*"
                    type="email"
                    required
                    autoComplete="email"
                />
                <Form.TextArea
                    className={clsx("min-h-[200px] border-2 p-2", themeStyles)}
                    name="message"
                    placeholder="Message"
                />

                <div>
                    <button
                        type="submit"
                        className={clsx("relative float-right px-4 py-1", {
                            "bg-white text-black": !inverted,
                            "bg-black text-white": inverted,
                        })}
                    >
                        <span
                            className={clsx({
                                "opacity-100": !submitting,
                                "opacity-0": submitting,
                            })}
                        >
                            Submit
                        </span>
                        <div
                            className={clsx(
                                "absolute left-0 top-[5px] h-full w-full",
                                {
                                    "opacity-0": !submitting,
                                    "opacity-100": submitting,
                                },
                            )}
                        >
                            <Spinner
                                className={clsx("h-[1em]", {
                                    "border-black": !inverted,
                                    "border-white": inverted,
                                })}
                            />
                        </div>
                    </button>
                </div>
            </Form>
        </>
    );
}
