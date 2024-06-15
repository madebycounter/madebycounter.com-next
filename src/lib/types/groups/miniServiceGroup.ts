import { MiniService, miniServiceFragment } from "../components/miniService";

export const miniServiceGroupFragment = `
    _id,
    _type,
    title,
    items[]->{
        ${miniServiceFragment}
    },
`;

export interface MiniServiceGroup {
    _id: string;
    _type: "miniServiceGroup";
    title: string;
    items: MiniService[];
}
