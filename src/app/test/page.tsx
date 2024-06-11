import Media from "@/components/media/Media";

import { usePortfolioItem } from "@/lib/sanity";

export default async function Page() {
    const data = await usePortfolioItem("nava-onti-music-videos");

    return (
        <div className="m-auto max-w-[500px]">
            {data.gallery.map((item, i) => (
                <div key={i}>
                    <Media src={item} />
                </div>
            ))}
        </div>
    );
}
