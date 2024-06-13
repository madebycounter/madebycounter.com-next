import { MultiMedia, assetFragment } from "@/lib/types/assets";
import { RichText } from "@/lib/types/richText";
import { TeamMember, teamMemberFragment } from "@/lib/types/teamMember";

export const serviceFragment = `
    _id,
    _type,
    title,
    slideshow[] {
        _key,
        ${assetFragment}
    },
    videoEmbed,
    heroText,
    teamMember->{
        ${teamMemberFragment}
    },
    callToAction,
    offerings[],
    slug,
`;

export interface Service {
    _id: string;
    _type: "service";
    title: string;
    slideshow: MultiMedia[];
    videoEmbed: string;
    heroText: RichText;
    teamMember: TeamMember;
    callToAction: string;
    offerings: string[];
    slug: { current: string };
}
