"use client";

import Button from "@/components/site/Button2";
import Carousel from "@/components/util/Carousel";

import { AboutPage } from "@/lib/types";

export default function Test({ aboutPage }: { aboutPage: AboutPage }) {
    return (
        <div className="m-auto my-32 max-w-screen-lg px-4">
            <Button direction="right">
                <Button.Label className="bg-black text-3xl text-white lg:text-5xl">
                    Learn More
                </Button.Label>
                <Button.Arrow className="bg-black" />
                <Button.Carousel items={aboutPage.lukeReferences[0].gallery} />
            </Button>
        </div>
    );
}
