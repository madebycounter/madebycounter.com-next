export default function formatTitle(format?: string, title?: string) {
    format = format || "{title}";
    title = title || "Untitled Page";
    return format.replaceAll("{title}", title);
}
