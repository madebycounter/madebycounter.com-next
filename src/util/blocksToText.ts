import { RichText } from "@/lib/types";

export default function blocksToText(blocks: RichText) {
    if (blocks === null || blocks === undefined) {
        return "";
    }

    return blocks
        .map((block: any) => {
            if (block._type !== "block" || !block.children) {
                return "";
            }

            return block.children.map((child: any) => child.text).join("");
        })
        .join("\n\n");
}
