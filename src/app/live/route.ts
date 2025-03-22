import { redirect } from "next/navigation";

export async function GET(request: Request) {
    const channelId = "UCK5yOceo82j2hvDBn7CTylg";
    const apiKey = process.env.YOUTUBE_API_KEY;
    const baseUrl = "https://www.googleapis.com/youtube/v3/search";

    var resp = await fetch(
        `${baseUrl}?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`,
    );

    var dat = await resp.json();

    if (dat.items.length < 1) {
        redirect("https://www.youtube.com/@madebycounter/streams");
    } else {
        redirect(`https://www.youtube.com/watch?v=${dat.items[0].id.videoId}`);
    }

    // .then((res) => res.json())
    // .then((dat) => {
    //     if (dat.items.length < 1) {
    //         redirect("https://www.youtube.com/@madebycounter/streams");
    //     } else {
    //         redirect(
    //             `https://www.youtube.com/watch?v=${dat.items[0].id.videoId}`,
    //         );
    //     }
    // });
}
