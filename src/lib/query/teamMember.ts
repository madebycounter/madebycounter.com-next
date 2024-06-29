import { query } from "@/lib/sanity";
import { TeamMember, TeamMemberSlug, teamMemberFragment } from "@/lib/types";

export async function useTeamMember(slug: TeamMemberSlug): Promise<TeamMember> {
    return await query(
        `*[_type == "teamMember" && slug.current == $slug][0] {
            ${teamMemberFragment}
        }`,
        { slug },
        ["teamMember"],
    );
}
