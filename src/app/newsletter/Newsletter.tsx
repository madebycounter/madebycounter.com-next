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

        fetch("/api/newsletter", {
            method: "POST",
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((data) => {
                setTimeout(() => {
                    setSubmitting(false);
                    setModalOpen(true);
                }, 250);
            });
    }

    return (
        <>
            <Nav companyInfo={companyInfo} inverted />

            <NavSpacer />

            <Modal open={modalOpen} setOpen={setModalOpen}>
                <div className="w-full max-w-[500px] bg-white p-4">
                    <p className="mb-8 font-counter text-5xl leading-[0.9em] tracking-tighter">
                        You&apos;re on the list!
                    </p>

                    <p className="text-xl font-light">
                        Thanks for subscribing. Why not check out some of our
                        cool stuff while you&apos;re here?
                    </p>

                    <Button href="/" direction="right" className="mt-8">
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
                    Subscribe to our monthly newsletter!
                </h1>

                <Form onSubmit={onSubmit} className="flex flex-col gap-2">
                    <div className="flex justify-between gap-2">
                        <Form.Input
                            className="grow rounded-none border-2 border-black bg-white p-1 text-sm text-black"
                            placeholder="First Name"
                            name="fname"
                            size={1}
                            autoComplete="given-name"
                        />
                        <Form.Input
                            className="grow rounded-none border-2 border-black bg-white p-1 text-sm text-black"
                            placeholder="Last Name"
                            name="lname"
                            size={1}
                            autoComplete="family-name"
                        />
                    </div>

                    <Form.Input
                        className="grow rounded-none border-2 border-black bg-white p-1 text-sm text-black"
                        placeholder="Email*"
                        size={1}
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                    />

                    <div>
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
                                Subscribe
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
            </div>
        </>
    );
}
