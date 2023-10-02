import Users from "@/components/server/profile/Users"
import { prisma } from "@/prisma/db"
import { getGroupName } from "@/serverfunctions"
import Link from "next/link"


export default async function GroupAdminsPage(
    {params}: {params: {id: string}}
) {

    const users = await getAdmins(params.id)
    const groupName = await getGroupName(params.id)

    return <> 
        <h1 className="text-3xl font-semibold">
            { groupName ?
                <>
                    <Link href={"/app/group/"+params.id}>
                        {groupName+" "}
                    </Link>
                    admins
                </>
            :
                "Nameless group."
            }
        </h1>
        { users?.length === 0 ?
            <h1>
                This group is a mistery. How can it not have any admins?
            </h1>
        :
            <Users selectedUsers={users} />
        }
    </>
}

async function getAdmins(groupIdString: string) {
    const groupId = Number(groupIdString)
    if (isNaN(groupId)) return undefined
    return await prisma.user.findMany({
        where: { groupAdmins: {
            some: { groupId }
        }}
    })
}
