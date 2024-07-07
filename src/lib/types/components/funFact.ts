import { defineType } from "sanity";

import { SanityImage, assetFragment } from "../objects/assets";
import { RichText } from "../objects/richText";
import { TeamMember, teamMemberFragment } from "./teamMember";

export const funFactSchema = defineType({
    name: "funFact",
    title: "Fun Fact",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "fact",
            title: "Fact",
            type: "richText",
        },
        {
            name: "teamMember",
            title: "Team Member",
            type: "reference",
            to: [{ type: "teamMember" }],
        },
        {
            name: "buttonText",
            title: "Button Text",
            type: "string",
            initialValue: "Learn More",
        },
        {
            name: "buttonImages",
            title: "Button Images",
            type: "array",
            of: [{ type: "image" }],
        },
    ],
    preview: {
        select: {
            title: "title",
            media: "teamMember.profile",
            fact: "fact",
        },
        prepare({ title, media, fact }) {
            const block = (fact || []).find(
                (block: any) => block._type === "block",
            );

            return {
                title: title,
                subtitle: block
                    ? block.children
                          .filter((child: any) => child._type === "span")
                          .map((span: any) => span.text)
                          .join("")
                    : "",
                media: media,
            };
        },
    },
});

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
