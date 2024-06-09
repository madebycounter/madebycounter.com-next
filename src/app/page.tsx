import IndexPage from "@/components/pages/AboutPage";
import Button from "@/components/site/Button";
import Slideshow from "@/components/util/Slideshow";

import { useCompanyInfo, usePortfolioItem, useTeamMember } from "@/lib/sanity";
import { MuxVideo, SanityImage } from "@/lib/sanity.types";

export default async function Home() {
    const portfolioItem = await usePortfolioItem("margaretfest-2023");
    const companyInfo = await useCompanyInfo();
    const henry = await useTeamMember("henry-buck");
    const luke = await useTeamMember("luke-a-makinson");
    const william = await useTeamMember("william-gardner");

    return (
        <div className="p-32">
            <Slideshow
                className="aspect-video"
                items={
                    portfolioItem.gallery.filter(
                        (item) => item._type === "mux.video",
                    ) as MuxVideo[]
                }
                imageSpeed={1000}
            />

            {/* <Slideshow
                className="aspect-video"
                items={
                    portfolioItem.gallery.filter(
                        (item) => item._type === "image",
                    ) as SanityImage[]
                }
                imageSpeed={1000}
                offset={500}
            /> */}
        </div>
        // <IndexPage
        //     portfolioItem={portfolioItem}
        //     companyInfo={companyInfo}
        //     henry={henry}
        //     luke={luke}
        //     william={william}
        // />
    );
}
