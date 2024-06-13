import Media from "@/components/util/Media";

import { usePortfolioItem, useService } from "@/lib/sanity";

export default async function Page() {
    const data = await usePortfolioItem("nava-onti-music-videos");
    const service = await useService("real-estate");

    console.log(service);

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
