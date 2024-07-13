export async function submitForm(formGuid: string, data: any, pageUri: string) {
    var baseUrl =
        "https://api.hsforms.com/submissions/v3/integration/secure/submit";
    var url = `${baseUrl}/${process.env.HUBSPOT_PORTAL_ID}/${formGuid}`;

    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
            fields: data,
            context: {
                pageUri: pageUri,
            },
        }),
    });
}
