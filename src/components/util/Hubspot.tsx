"use client";

export default function Hubspot() {
    console.log(location.pathname, location.pathname.startsWith("/studio"));

    return (
        !location.pathname.startsWith("/studio") && (
            <script
                type="text/javascript"
                id="hs-script-loader"
                async
                defer
                src={process.env.NEXT_PUBLIC_HUBSPOT_SCRIPT_URL}
            ></script>
        )
    );
}