import Groups from "@/components/server/group/Groups"
import { prisma } from "@/prisma/db"
import { getGroupsByUserId, getUser } from "@/serverfunctions"
import { redirect } from "next/navigation"


export default async function BrowseGroups() {

    const user = await getUser()
    if (!user) redirect('/login')
    const groups = await getGroupsByUserId(user.id)

    return(
        <>
            <h1 className="text-3xl font-semibold">
                Browse your groups.
            </h1>
            <Groups selectedGroups={groups} />
        </>
    )
}