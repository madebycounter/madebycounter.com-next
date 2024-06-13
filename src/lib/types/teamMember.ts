import { SanityImage, assetFragment } from "@/lib/types/assets";

export type TeamMemberSlug =
    | "luke-a-makinson"
    | "william-gardner"
    | "henry-buck"
    | "counter-llc";

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
    slug
`;

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
