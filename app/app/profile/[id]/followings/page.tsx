import Users from "@/components/server/profile/Users"
import { getFollowings } from "@/serverfunctions"
import Link from "next/link"

export default async function FollowingsPage(
    {params}: {params: {id: string}}
) {

    const id = Number(params.id)
    const result = await getFollowings({id})
    if (!result) return <>Error</>
    const {name, followings} = result
    return <>
        <h1 className="text-3xl font-semibold pb-5 pt-10">
            Followings
            <Link href={"/app/profile/"+id} className="italic">
                {" - "+name}
            </Link>
        </h1>
        {
            followings.length === 0 ?
            <h1 className="text-lg">
                No followers.
            </h1>
        :
            <Users selectedUsers={followings} />
        }
    </>
}