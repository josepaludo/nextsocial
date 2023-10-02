import GroupLarge from "@/components/server/group/GroupLarge"
import ShowAndHideMakePost from "@/components/server/home/ShowAndHideMakePost"
import Posts from "@/components/server/post/Posts"
import { getGroupById, getPostsByGroup, getUser } from "@/serverfunctions"


export default async function GroupPage(
    {params}: {params: {id: string}}
) {

    const group = await getGroupById(params.id)
    if (!group) return <>Error</>

    const posts = await getPostsByGroup(group.id)
    const postsAmount = group.posts.length
    let isMember = false
    const user = await getUser()
    if (user) {
        isMember = group.groupMembers
            .map(user => user.userId)
            .includes(user.id)
    }

    return (
        <>
            <GroupLarge group={group} isMember={isMember} />
            {
                isMember && 
                <ShowAndHideMakePost groupId={group.id} />
            }
            <h1 className="text-3xl font-semibold my-5">
                {postsAmount}
                {" "}
                Post
                {postsAmount !== 1 ? "s" : ""}
            </h1>
            { posts.length === 0 ?
                <h1 className="my-5 text-lg">
                    No posts yet.
                </h1>
            :
                <Posts selectedPosts={posts} />
            }
        </>
    )
}