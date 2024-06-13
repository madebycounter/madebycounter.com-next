"use client";

import { useState } from "react";
import YALB, { MediaSlide } from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

import Media, { MediaPreview } from "@/components/util/Media";

import { MultiMedia } from "@/lib/types";

declare module "yet-another-react-lightbox" {
    export interface MediaSlide {
        type: "media-slide";
        data: MultiMedia;
    }

    interface SlideTypes {
        "media-slide": MediaSlide;
    }
}

function renderSlide(slide: MediaSlide) {
    return <Media src={slide.data} mode="contain" size="large" />;
}

function renderThumbnail(slide: MediaSlide) {
    return <MediaPreview src={slide.data} />;
}

export function mapToSlides(gallery: MultiMedia[]): MediaSlide[] {
    return gallery.map((item) => ({
        type: "media-slide",
        data: item,
    }));
}

export interface LightboxProps {
    open: boolean;
    setLightbox: (open: boolean, id?: string) => void;
    currentSlide?: string;
    slides: MediaSlide[];
}

export default function Lightbox({
    open,
    setLightbox,
    currentSlide,
    slides,
}: LightboxProps) {
    var index = 0;

    if (currentSlide) {
        index = slides.findIndex((item) => item.data._key === currentSlide);
    }

    return (
        <YALB
            className="Lightbox"
            open={open}
            close={() => setLightbox(false)}
            index={index}
            slides={slides}
            thumbnails={{
                border: 0,
            }}
            render={{
                slide: ({ slide }) => renderSlide(slide as MediaSlide),
                thumbnail: ({ slide }) => renderThumbnail(slide as MediaSlide),
            }}
            plugins={[Thumbnails, Counter]}
        />
    );
}

export function useLightboxState(): [
    boolean,
    string | undefined,
    (open: boolean, id?: string) => void,
] {
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState<string | undefined>(undefined);

    const setLightbox = (open: boolean, id?: string) => {
        if (id) setCurrent(id);
        setOpen(open);
    };

    return [open, current, setLightbox];
}
