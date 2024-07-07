import {
    ComponentIcon,
    FolderIcon,
    ComposeIcon,
    CogIcon,
    HomeIcon,
    DocumentIcon,
    PresentationIcon,
    TrolleyIcon,
} from "@sanity/icons";

const pages = (S) => [
    // S.listItem()
    //     .title("SEO Data")
    //     .child(
    //         S.document()
    //             .schemaType("seoData")
    //             .documentId("c6404ac3-1977-4b9f-b8df-711a76977e3d"),
    //     ),
    // S.listItem()
    //     .title("Company Info")
    //     .child(
    //         S.document()
    //             .schemaType("companyInfo")
    //             .documentId("db21493c-88d5-406b-84ed-327044af40fd"),
    //     ),
    S.listItem()
        .title("About Page")
        .icon(HomeIcon)
        .child(
            S.document()
                .schemaType("aboutPage")
                .documentId("fb8dd6a9-be0d-492f-b6dc-27e4a475619c"),
        ),
    S.listItem()
        .title("Portfolio Page")
        .icon(PresentationIcon)
        .child(
            S.document()
                .schemaType("portfolioPage")
                .documentId("df757241-8e2d-40ab-b547-b20e451d197d"),
        ),
    S.listItem()
        .title("Blog Page")
        .icon(ComposeIcon)
        .child(
            S.document()
                .schemaType("blogPage")
                .documentId("615281e5-e038-4f54-810b-ad6e3204d8f0"),
        ),
    // S.listItem()
    //     .title("Services Page")
    //     .child(
    //         S.document()
    //             .schemaType("servicesPage")
    //             .documentId("57d47dcc-1a44-4fa0-b7ca-3408460dd40e"),
    //     ),
];

const site = (S) => [
    S.listItem()
        .title("Site Settings")
        .icon(CogIcon)
        .child(
            S.document()
                .schemaType("companyInfo")
                .documentId("db21493c-88d5-406b-84ed-327044af40fd"),
        ),
    // S.listItem()
    //     .title("About Page")
    //     .icon(HomeIcon)
    //     .child(
    //         S.document()
    //             .schemaType("aboutPage")
    //             .documentId("fb8dd6a9-be0d-492f-b6dc-27e4a475619c"),
    //     ),
    S.listItem()
        .title("Page Settings")
        .icon(DocumentIcon)
        .child(S.list().title("Site Pages").items(pages(S))),
    S.listItem()
        .title("Portfolio Items")
        .icon(PresentationIcon)
        .child(S.documentTypeList("portfolioItem").title("Portfolio Items")),
    S.listItem()
        .title("Services")
        .icon(TrolleyIcon)
        .child(S.documentTypeList("service").title("Services")),
    S.listItem()
        .title("Blog Posts")
        .icon(ComposeIcon)
        .child(S.documentTypeList("blogPost").title("Blog Posts")),
];

const components = (S) => [
    S.listItem()
        .title("Team Members")
        .icon(ComponentIcon)
        .child(S.documentTypeList("teamMember").title("Team Members")),
    S.listItem()
        .title("Testimonials")
        .icon(ComponentIcon)
        .child(S.documentTypeList("testimonial").title("Testimonials")),
    S.listItem()
        .title("Fun Facts")
        .icon(ComponentIcon)
        .child(S.documentTypeList("funFact").title("Fun Facts")),
    S.listItem()
        .title("Mini Services")
        .icon(ComponentIcon)
        .child(S.documentTypeList("miniService").title("Mini Services")),
];

const groups = (S) => [
    S.listItem()
        .title("Media Groups")
        .icon(FolderIcon)
        .child(S.documentTypeList("mediaGroup").title("Media Groups")),
    S.listItem()
        .title("Mini Service Groups")
        .icon(FolderIcon)
        .child(
            S.documentTypeList("miniServiceGroup").title("Mini Service Groups"),
        ),
    S.listItem()
        .title("Portfolio Groups")
        .icon(FolderIcon)
        .child(
            S.documentTypeList("portfolioItemGroup").title("Portfolio Groups"),
        ),
];

const structure = (S) =>
    S.list()
        .title("Content")
        .items([
            ...site(S),
            S.divider(),
            ...components(S),
            S.divider(),
            ...groups(S),
        ]);

export default structure;
