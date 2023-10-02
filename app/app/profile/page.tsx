import ProfilePage from "@/components/server/profile/Profile"
import { getUser, getUserWithFollowersCount } from "@/serverfunctions"


export default async function Profile() {

    const currentUser = await getUser()
    if (!currentUser) return <>Error</>
    const user = await getUserWithFollowersCount({id: currentUser.id})
    if (!user) return <>Error</>


    return (
        <ProfilePage user={user} profile={true} />
    )
}