import ClientComment from "@/components/client/comment/ClientComment"
import ContainerWithSideLine from "@/components/general/ContainerWithSideLine"
import Error from "@/components/general/ErrorMessage"
import LargePost from "@/components/server/post/LargePost"
import { getComment, getPost, getUser } from "@/serverfunctions"
import { CommentWithUserType } from "@/types"
import { User } from "@prisma/client"


export default async function CommentPage(
    {params}: {params: { id: string }}
) {

    const numId = Number(params.id)
    if (isNaN(numId)) return <Error message="Invalid id." /> 
    const comment = await getComment(numId)
    if (!comment) return <Error message="Comment not found." /> 
    const user = await getUser()

    return <>
        <ParentTree comment={comment} currentUser={user}>
            <ClientComment
                comment={comment}
                currentUser={user}
                className="hover:bg-yellow-100 bg-yellow-50 transition-colors duration-500 "
            />
        </ParentTree>
    </>
}

async function ParentTree(
    {children, comment, currentUser}: ParentTreeType
) {

    if (comment.postId) {
        const post = await getPost(comment.postId)
        if (!post) return <Error message="Root post not found." />
        return <>
            <LargePost post={post} />
            <ContainerWithSideLine>
                {children}
            </ContainerWithSideLine>
        </>
    }

    if (comment.commentId) {
        const parentComment = await getComment(comment.commentId)
        if (!parentComment) return <Error message="Parent post not found." />
        return <>
            <ParentTree comment={parentComment} currentUser={currentUser}>
                <ClientComment comment={parentComment} currentUser={currentUser} />
                <ContainerWithSideLine>
                    {children}
                </ContainerWithSideLine>
            </ParentTree>
        </>
    }

    return <>
        <ContainerWithSideLine>
            {children}
        </ContainerWithSideLine>
    </>
}

type ParentTreeType = {
    children: React.ReactNode
    comment: CommentWithUserType
    currentUser: User|null
}