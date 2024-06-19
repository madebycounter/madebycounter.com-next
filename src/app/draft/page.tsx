import DraftModeTool from "@/components/util/DraftModeTool";

export default async function Page() {
    return (
        <div>
            <p className="flex h-screen w-full items-center justify-center text-3xl">
                Enabling draft mode...
            </p>
            <DraftModeTool enable={true} />;
        </div>
    );
}
