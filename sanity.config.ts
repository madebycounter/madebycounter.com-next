import { codeInput } from "@sanity/code-input";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { media } from "sanity-plugin-media";
import { muxInput } from "sanity-plugin-mux-input";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import {
    aboutPageSchema,
    blogPostGallerySchema,
    blogPostSchema,
    companyInfoSchema,
    funFactSchema,
    mediaGroupSchema,
    miniServiceGroupSchema,
    miniServiceSchema,
    pageSeoDataSchema,
    portfolioItemSchema,
    richTextSchema,
    seoDataSchema,
    serviceSchema,
    servicesPageSchema,
    teamMemberSchema,
    testimonialSchema,
} from "@/lib/types";
import { portfolioItemGroupSchema } from "@/lib/types/groups/portfolioItemGroup";

import structure from "./sanity.structure";

export default defineConfig({
    name: "default",
    title: "madebycounter.com",

    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

    basePath: "/studio",

    plugins: [
        structureTool({
            name: "structure",
            structure,
        }),
        visionTool(),
        muxInput(),
        media(),
        codeInput(),
        presentationTool({
            previewUrl: {
                draftMode: {
                    enable: "/api/draft",
                },
            },
        }),
    ],

    schema: {
        types: [
            portfolioItemSchema,
            richTextSchema,
            companyInfoSchema,
            teamMemberSchema,
            aboutPageSchema,
            serviceSchema,
            testimonialSchema,
            funFactSchema,
            mediaGroupSchema,
            miniServiceSchema,
            miniServiceGroupSchema,
            portfolioItemGroupSchema,
            servicesPageSchema,
            seoDataSchema,
            pageSeoDataSchema,
            blogPostSchema,
            blogPostGallerySchema,
        ],
    },
});
