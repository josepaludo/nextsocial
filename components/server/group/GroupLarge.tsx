import JoinGroupButton from "@/components/client/JoinGroupButton";
import Card from "@/components/general/Card";
import { getUser, isBanned } from "@/serverfunctions";
import { GroupType } from "@/types";
import Link from "next/link";


export default async function GroupLarge(
    {group, isMember}: {group: GroupType, isMember: boolean}
) {

    const {description, name, posts, groupMembers, id} = group
    const user = await getUser()
    let blocked = false
    if (user) {
        blocked = await isBanned(id, user.id) ? true : false
    }

    return (
        <Card>
            <div className="flex justify-between items-start">
                <h1 className="text-2xl font-semibold">
                    {name}
                </h1>
                { !blocked &&
                    <JoinGroupButton isMember={isMember} groupId={id} />
                }
            </div>
            <p className="p-5">
                {description}
            </p>
            
            <div className="flex justify-between items-center">
                <span className="font-light">
                    <Link
                        href={`/app/group/${group.id}/members`}
                    >
                        Members
                    </Link>
                    : {groupMembers.length}
                </span>
                <Link
                    href={`/app/group/${group.id}/admins`}
                    className="font-light"
                >
                    Admins
                </Link>
            </div>
        </Card>
    )
}

