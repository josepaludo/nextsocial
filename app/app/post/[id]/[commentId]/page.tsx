import ClientComment from "@/components/client/comment/ClientComment"
import ContainerWithSideLine from "@/components/general/ContainerWithSideLine"
import Comments from "@/components/server/comment/Comments"
import LargePost from "@/components/server/post/LargePost"
import { prisma } from "@/prisma/db"
import { getUser } from "@/serverfunctions"
import { PostWithUserLikesCommentsType } from "@/types"


export default async function CommentPage(
    {params}: {params: {id: string, commentId: string}}
) {

    const {id, commentId} = params

    const post = await getPost(id)
    if (!post) return <>Post not found.</>
    const comment = await getComment(commentId)
    if (!comment) return <>Comment not found.</>
    const currentUser = await getUser()

    return <>
        <LargePost post={post} />

        <ContainerWithSideLine>
            {/* <Comment comment={comment} className="flex-grow" /> */}
            <ClientComment comment={comment} currentUser={currentUser} />
            <ContainerWithSideLine>
                <Comments comments={comment.comments} currentUser={currentUser} />
            </ContainerWithSideLine>
        </ContainerWithSideLine>
    </>

}

async function getPost(id: string|number) {
    const numberId: number = Number(id)
    if (Number.isNaN(numberId)) return null
    const post = await prisma.post.findUnique({
        where: { id: numberId },
        include: {
            user: { select: {
                id: true,
                name: true
            }},
            comments: { select: {
                id: true,
                commentId: true,
            }},
            likes: { select: {
                postId: true,
                userId: true,
                value: true
            }},
            group: { select: {
                name: true
            }}
        }
    })
    return post as PostWithUserLikesCommentsType
}

async function getComment(id: string|number) {
    const numberId: number = Number(id)
    if (Number.isNaN(numberId)) return null
    const comment = await prisma.comment.findUnique({
        where: { id: numberId},
        include: {
            user: { select: {
                id: true,
                name: true
            }},
            comments: { include: {
                user: { select: {
                    id: true,
                    name: true
                }},
                comments: { select: {
                    id: true,
                    commentId: true
                }}, 
                likes: { select: {
                    userId: true,
                    value: true
                }}
            }},
            likes: { select: {
                userId: true,
                value: true
            }}
        }
    })
    return comment
}
