"use client";

import clsx from "clsx";
import { useState } from "react";

import Button from "@/components/site/Button";
import Nav, { NavSpacer } from "@/components/site/Nav";
import Form from "@/components/util/Form";
import { FormData } from "@/components/util/Form";
import Modal from "@/components/util/Modal";
import Spinner from "@/components/util/Spinner";

import { AboutPage, CompanyInfo } from "@/lib/types";

export default function Page({
    companyInfo,
    aboutPage,
}: {
    companyInfo: CompanyInfo;
    aboutPage: AboutPage;
}) {
    const [submitting, setSubmitting] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    function onSubmit(values: FormData) {
        setSubmitting(true);

        fetch("/api/notify", {
            method: "POST",
            body: JSON.stringify({
                phone: values.phone,
            }),
        }).then(() => {
            setSubmitting(false);
            setModalOpen(true);
        });
    }

    return (
        <>
            <Nav companyInfo={companyInfo} inverted />

            <NavSpacer />

            <Modal open={modalOpen} setOpen={setModalOpen}>
                <div className="w-full max-w-[500px] bg-white p-4">
                    <p className="mb-8 font-counter text-5xl leading-[0.9em] tracking-tighter">
                        See you in the stream!
                    </p>

                    <p className="text-xl font-light">
                        You&apos;re signed up! Why not check out some of our
                        cool stuff while you&apos;re here?
                    </p>

                    <Button
                        href="https://youtube.com/@madebycounter?sub_confirmation=1"
                        direction="right"
                        className="mt-8"
                    >
                        <Button.Label className="bg-white pl-0 text-3xl text-black">
                            Cool Stuff
                        </Button.Label>
                        <Button.Arrow className="bg-white" />
                        <Button.Carousel
                            items={aboutPage.lukeService?.slideshow}
                        />
                    </Button>
                </div>
            </Modal>

            <div className="mx-auto max-w-screen-sm px-4">
                <h1 className="py-8 font-counter text-6xl leading-[0.9em] tracking-tighter">
                    Get notified when your favorite bands go live!
                </h1>

                <p>
                    Sign up to receive notifications at the start of each set
                    for the current (or next scheduled) /counter live stream.
                    Visit{" "}
                    <a className="text-sky-600" href="/live">
                        madebycounter.com/live
                    </a>{" "}
                    to see current and scheduled live streams.
                </p>

                <Form onSubmit={onSubmit} className="my-4 flex flex-col gap-2">
                    <div className="flex gap-2">
                        <Form.Input
                            className="grow rounded-none border-2 border-black bg-white p-1 text-sm text-black"
                            placeholder="Phone Number"
                            size={1}
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            required
                        />

                        <button
                            type="submit"
                            className="relative float-right rounded-none border-2 border-black bg-black px-2 py-1 text-sm text-white"
                        >
                            <span
                                className={clsx({
                                    "opacity-100": !submitting,
                                    "opacity-0": submitting,
                                })}
                            >
                                Sign Up
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
                                <Spinner className={"h-[1em] border-white"} />
                            </div>
                        </button>
                    </div>
                </Form>

                <p className="text-xs text-gray-400">
                    By providing your phone number you agree to receive
                    informational text messages from Counter LLC. Message
                    frequency will vary. Message and data rates may apply. Reply
                    STOP to cancel.
                </p>
            </div>
        </>
    );
}
