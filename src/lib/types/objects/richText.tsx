import { defineType } from "sanity";

export const richTextSchema = defineType({
    name: "richText",
    title: "Rich Text",
    type: "array",
    of: [
        {
            type: "block",
            marks: {
                decorators: [
                    { title: "Strong", value: "strong" },
                    { title: "Emphasis", value: "em" },
                    {
                        title: "Sup",
                        value: "sup",
                        icon: () => (
                            <div>
                                x<sup>2</sup>
                            </div>
                        ),
                        component: ({ children }) => <sup>{children}</sup>,
                    },
                ],
            },
        },
    ],
});

export type RichText = any;
