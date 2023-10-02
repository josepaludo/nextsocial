import Posts from "@/components/server/post/Posts";
import { getPostsByUser, getUser, userFollowsUser } from "@/serverfunctions";
import Card from "@/components/general/Card";
import UpdateBioForm from "@/components/client/forms/UpdateBioForm";
import FollowUserButton from "@/components/client/FollowUserButton";
import { UserWithFollowersCountType } from "@/types";
import Link from "next/link";
import LargeHeader from "@/components/general/LargeHeader";
import Logout from "@/components/client/Logout";


export default async function ProfilePage(
    {user, profile}: {user: UserWithFollowersCountType, profile?: boolean}
) {

    const posts = await getPostsByUser(user.id)
    const currentUser = await getUser()
    const follows = await userFollowsUser(
        {followerId: currentUser?.id, followingId: user.id }
    )
    const followers = user.followers.length
    const followings = user.followings.length

    const postsHeader = posts.length + " Post" + (posts.length !== 1 ? "s" : "")

    return (
        <>
            <Card>
                <div className="flex justify-between items-start">
                    <h1 className="text-3xl font-bold mb-3">
                        {user.name}
                    </h1>
                    { currentUser?.id === user.id ?
                        <Logout />
                    :
                        <FollowUserButton id={user.id} follows={follows} />
                    }
                </div>
                { profile ? 
                    <UpdateBioForm
                        bio={user.bio}
                        id={user.id}
                    />
                :
                    <p className="p-5">
                        {user.bio}
                    </p>
                }
                <h1 className="font-light">
                    <Link href={"/app/profile/"+user.id+"/followers"} >
                        Followers
                    </Link>
                    : {followers}
                </h1>
                <h1 className="font-light">
                    <Link href={"/app/profile/"+user.id+"/followings"} >
                        Followings
                    </Link>
                    : {followings}
                </h1>
            </Card>

            <LargeHeader content={postsHeader} />

            <Posts selectedPosts={posts} />
        </>
    )
}
