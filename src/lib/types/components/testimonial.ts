import { SanityImage, assetFragment } from "../assets";
import { RichText } from "../richText";

export const testimonialFragment = `
    _id,
    _type,
    name,
    jobTitle,
    quote,
    photo {
        ${assetFragment}
    },
    rating
`;

export interface Testimonial {
    _id: string;
    _type: "testimonial";
    name: string;
    jobTitle: string[];
    quote: RichText;
    photo: SanityImage;
    rating: 1 | 2 | 3 | 4 | 5;
}
