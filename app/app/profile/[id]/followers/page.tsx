import Users from "@/components/server/profile/Users"
import { getFollowers } from "@/serverfunctions"
import Link from "next/link"


export default async function FollowersPage(
    {params}: {params: {id: string}}
) {

    const id = Number(params.id)
    const result = await getFollowers({id})
    if (!result) return <>Error</>
    const {name, followers} = result
    return <>
        <h1 className="text-3xl font-semibold pb-5 pt-10">
            Followers
            <Link href={"/app/profile/"+id} className="italic">
                {" - "+name}
            </Link>
        </h1>
        {
            followers.length === 0 ?
            <h1 className="text-lg">
                No followers.
            </h1>
        :
            <Users selectedUsers={followers} />
        }
    </>
}
