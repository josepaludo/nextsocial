import ShowCommentForm from "@/components/client/ShowCommentForm"
import ContainerWithSideLine from "@/components/general/ContainerWithSideLine"
import Comments from "@/components/server/comment/Comments"
import LargePost from "@/components/server/post/LargePost"
import { getComments, getPost } from "@/serverfunctions"


export default async function PostPage(
    {params}: {params: {id: string}}
) {

    const post = await getPost(params.id)
    if (!post) return <>Post not found.</>
    const comments = await getComments(post.id)

    return (
        <>
            <LargePost post={post} />
            <ShowCommentForm postId={post.id} />
            <ContainerWithSideLine>
                <Comments comments={comments} />
            </ContainerWithSideLine>
        </>
    )
}

