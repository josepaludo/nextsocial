import Users from "@/components/server/profile/Users"
import { prisma } from "@/prisma/db"
import { getGroupName, getUser } from "@/serverfunctions"
import Link from "next/link"


export default async function GroupMembersPage(
    {params}: {params: {id: string}}
) {

    const users = await getMembers(params.id)
    const groupName = await getGroupName(params.id)
    const userIsAdmin = await isAdmin(params.id)

    return (
        <> 
            <h1 className="text-3xl font-semibold">
                { groupName ?
                    <>
                        <Link href={"/app/group/"+params.id}>
                            {groupName+" "}
                        </Link>
                        members
                    </>
                :
                    "Nameless group."
                }
            </h1>
            { users?.length === 0 ?
                <h1>
                    This group is a mistery. How can it not have any members?
                </h1>
            :
                <Users
                    selectedUsers={users}
                    currentGroup={userIsAdmin && Number(params.id)}
                />
            }
        </>
    )
}

async function getMembers(groupIdString: string) {
    const groupId = Number(groupIdString)
    if (isNaN(groupId)) return undefined
    return await prisma.user.findMany({
        where: { groupMembers: {
            some: { groupId }
        }}
    })
}

async function isAdmin(id: string) {
    const user = await getUser()
    if (!user) return false
    const isAdmin = await prisma.groupAdmin.findUnique({
        where: { groupId_userId: {
            groupId: Number(id),
            userId: user.id
        }}
    })
    return isAdmin ? true : false

}