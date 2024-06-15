import { SanityImage, assetFragment } from "../assets";
import { RichText } from "../richText";

export const miniServiceFragment = `
    _id,
    _type,
    title,
    photo {
        ${assetFragment}
    },
    description,
    buttonText
`;

export interface MiniService {
    _id: string;
    _type: "miniService";
    title: string;
    photo: SanityImage;
    description: RichText;
    buttonText: string;
}
