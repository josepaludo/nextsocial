import ProfilePage from "@/components/server/profile/Profile"
import { getUserWithFollowersCount } from "@/serverfunctions"


export default async function Profile(
    {params}: {params: {id: string}}
) {

    const id = Number(params.id)
    const user = await getUserWithFollowersCount({id})
    if (!user) return <>Error</>

    return (
        <ProfilePage user={user} />
    )
}