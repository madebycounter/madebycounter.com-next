import { client } from "@/lib/sanity";

import { SanityImage, assetFragment } from "../assets";

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
    slug: TeamMemberSlug;
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

export async function useTeamMember(slug: TeamMemberSlug): Promise<TeamMember> {
    return await client.fetch(
        `*[_type == "teamMember" && slug.current == $slug][0] {
            ${teamMemberFragment}
        }`,
        { slug },
    );
}
