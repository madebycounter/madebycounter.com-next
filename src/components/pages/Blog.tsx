import Nav from "@/components/site/Nav";

import { CompanyInfo } from "@/lib/types";

export default function Blog({ companyInfo }: { companyInfo: CompanyInfo }) {
    return (
        <div>
            <Nav companyInfo={companyInfo} active="blog" inverted />
        </div>
    );
}
