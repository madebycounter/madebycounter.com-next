export default interface MediaSize {
    img: number;
    video: "low" | "medium" | "high" | "stream";
}

export const Small: MediaSize = {
    img: 480,
    video: "low",
};

export const Medium: MediaSize = {
    img: 1028,
    video: "low",
};

export const Large: MediaSize = {
    img: 1920,
    video: "high",
};
