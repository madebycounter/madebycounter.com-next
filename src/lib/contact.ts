import axios from "axios";

export async function submitForm(fname: string, lname: string, email: string, message: string) {
    const recipients = (process.env.SENDGRID_RECIPIENTS || "").replaceAll(" ", "").split(",").map((email) => ({
        email
    }));

    return await axios.post(
        "https://api.sendgrid.com/v3/mail/send",
        {
            from: {
                email: "alerts@counter.llc",
            },
            personalizations: [
                {
                    to: recipients,
                    dynamic_template_data: {
                        name: fname + " " + lname,
                        email,
                        message,
                    },
                },
            ],
            template_id: process.env.SENDGRID_TEMPLATE_ID,
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
                "Content-Type": "application/json",
            },
        },
    );
}