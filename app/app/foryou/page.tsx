import Error from "@/components/general/ErrorMessage";
import NewOrForyou from "@/components/server/home/NewOrForyou";
import ShowAndHideMakePost from "@/components/server/home/ShowAndHideMakePost";
import Posts from "@/components/server/post/Posts";
import { prisma } from "@/prisma/db";
import { getUser, includeOnPosts } from "@/serverfunctions";
import { PostWithUserLikesCommentsType } from "@/types";


export default async function ForYou() {

    const user = await getUser()
    if (!user) return <Error message="Not logged in." />
    const posts = await postsForYou(user.id)

    return (
        <>
            <ShowAndHideMakePost/>
            <NewOrForyou newIsActive={false} />
            <Posts selectedPosts={posts} />
        </>
    )
}

async function postsForYou(userId: number) {
    return await prisma.post.findMany({
        orderBy: { id: 'desc' },
        include: includeOnPosts,
        where: {
            OR: [
                { group: { groupMembers: { some: { userId: userId }}}},
                { user: { followers: { some: { followerId: userId }}}}
            ]
        }
    }) as PostWithUserLikesCommentsType[]
}
