import { getGroups } from "@/serverfunctions"
import Group from "./Group"
import { GroupType } from "@/types";


export default async function Groups(
    {selectedGroups}: {selectedGroups?: GroupType[]}
) {

    const groups = selectedGroups ? selectedGroups : await getGroups()

    return <>
        {
            groups.map((group, key) => (
                <Group key={key} group={group} />
            ))
        }
    </>
}