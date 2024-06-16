"use client";

import Button from "@/components/site/Button2";
import Carousel from "@/components/util/Carousel";

export default function Test() {
    return (
        <div className="m-auto my-32 max-w-screen-lg">
            <Button>
                <Button.Label className="bg-black text-white">Hey</Button.Label>
                <Button.Arrow className="bg-black" />
                <Button.Spacer className="grow">
                    <Carousel
                        className=""
                        child={
                            <div className="mr-1 flex h-full gap-1">
                                <div className="aspect-square bg-blue-400" />
                                <div className="aspect-square bg-red-700" />
                                <div className="aspect-square bg-green-700" />
                                <div className="aspect-square bg-yellow-500" />
                                <div className="aspect-square bg-blue-900" />
                                <div className="aspect-square bg-slate-700" />
                                <div className="aspect-square bg-orange-700" />
                            </div>
                        }
                        childSize={378}
                    />
                </Button.Spacer>
            </Button>
        </div>
    );
}
