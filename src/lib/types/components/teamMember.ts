import { defineType } from "sanity";

import { SanityImage, assetFragment } from "../assets";

export const teamMemberSchema = defineType({
    title: "Team Member",
    name: "teamMember",
    type: "document",
    fields: [
        {
            title: "Name",
            name: "name",
            type: "string",
        },
        {
            title: "Profile",
            name: "profile",
            type: "image",
        },
        {
            title: "Action Shot",
            name: "actionShot",
            type: "image",
        },
        {
            title: "Action Shot Extra",
            name: "actionShotExtra",
            type: "image",
        },
        {
            title: "Fun Fact",
            name: "funFact",
            type: "image",
        },
        {
            title: "Signature",
            name: "signature",
            type: "image",
        },
        {
            title: "Slug",
            name: "slug",
            type: "slug",
            options: {
                source: "name",
            },
        },
    ],
});

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
    funFact: SanityImage;
    signature: SanityImage;
    slug: {
        current: TeamMemberSlug;
    };
}

export const teamMemberFragment = `
    _id,
    _type,
    name,
    profile {
        ${assetFragment}
    },
    actionShot {
        ${assetFragment}
    },
    actionShotExtra {
        ${assetFragment}
    },
    signature {
        ${assetFragment}
    },
    funFact {
        ${assetFragment}
    },
    slug
`;
