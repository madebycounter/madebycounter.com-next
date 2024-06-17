import { MultiMedia, assetFragment } from "../assets";

export const mediaGroupFragment = `
    _id,
    _type,
    title,
    items[] {
        _key,
        ${assetFragment}
    },
`;

export interface MediaGroup {
    _id: string;
    _type: "mediaGroup";
    title: string;
    items: MultiMedia[];
}
