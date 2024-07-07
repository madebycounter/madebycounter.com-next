export default function formatTitle(format: string, title: string) {
    return format.replaceAll("{title}", title);
}
