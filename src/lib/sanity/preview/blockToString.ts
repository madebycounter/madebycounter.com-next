export default function blockToString(blocks: any) {
    const block = (blocks || []).find((block: any) => block._type === "block");
    return block
        ? block.children
              .filter((child: any) => child._type === "span")
              .map((span: any) => span.text)
              .join("")
        : "";
}
