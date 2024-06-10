export interface MuxVideo {
    _id: string;
    _key: string;
    _type: "mux.video";
    asset: {
        _id: string;
        _type: "mux.videoAsset";
        _createdAt: string;
        _updatedAt: string;
        playbackId: string;
        filename: string;
        status: "preparing" | "ready" | "errored";
        uploadId: string;
        assetId: string;
        data: {
            aspect_ratio: string;
            encoding_tier: "smart" | "baseline";
            resolution_tier: string;
            mp4_support: string;
            ingest_type: string;
            max_stored_frame_rate: number;
            tracks: {
                id: string;
                type: string;
                duration: number;
                max_width: number;
                max_height: number;
                max_frame_rate: number;
            }[];
            status: "preparing" | "ready" | "errored";
            max_resolution_tier: string;
            passthrough: string;
            playback_ids: {
                id: string;
                policy: string;
            }[];
            id: string;
            duration: number;
            max_stored_resolution: string;
            upload_id: string;
        };
    };
}

export interface SanityImage {
    _id: string;
    _key: string;
    _type: "image";
    asset: {
        _id: string;
        _type: "sanity.imageAsset";
        _createdAt: string;
        _updatedAt: string;
        mimeType: string;
        path: string;
        uploadId: string;
        extension: string;
        sha1hash: string;
        assetId: string;
        url: string;
        originalFilename: string;
        metadata?: any;
    };
}

export type MultiMedia = SanityImage | MuxVideo;
export type RichText = any;

export interface PortfolioItem {
    _id: string;
    _type: "portfolioItem";
    title: string;
    date: string;
    description: RichText;
    thumbnail: SanityImage;
    heroMedia: MultiMedia[];
    heroEmbed: string;
    gallery: MultiMedia[];
    slug: { current: string };
    tags: string[];
    hidden: boolean;
}

export interface CompanyInfo {
    _id: string;
    _type: "companyInfo";
    name: string;
    logo: SanityImage;
}

export type TeamMemberSlug =
    | "luke-a-makinson"
    | "william-gardner"
    | "henry-buck"
    | "counter-llc";

export interface TeamMember {
    _id: string;
    _type: "teamMember";
    name: string;
    profile: SanityImage;
    actionShot: SanityImage;
    actionShotExtra: SanityImage;
    signature: SanityImage;
    slug: TeamMemberSlug;
}

export interface AboutPage {
    _id: string;
    _type: "aboutPage";
    lukeSlideshow1: MultiMedia[];
    lukeSlideshow2: MultiMedia[];
    henrySlideshow1: MultiMedia[];
    henrySlideshow2: MultiMedia[];
    williamSlideshow1: MultiMedia[];
    williamSlideshow2: MultiMedia[];
}
