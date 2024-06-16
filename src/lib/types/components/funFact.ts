import { SanityImage, assetFragment } from "../assets";
import { RichText } from "../richText";
import { TeamMember, teamMemberFragment } from "./teamMember";

export const funFactFragment = `
    _id,
    _type,
    title,
    fact,
    teamMember->{
        ${teamMemberFragment}
    },
    buttonText,
    buttonImages[] {
        ${assetFragment}
    }
`;

export interface FunFact {
    _id: string;
    _type: "funFact";
    title: string;
    fact: RichText;
    teamMember: TeamMember;
    buttonText: string;
    buttonImages: SanityImage[];
}
