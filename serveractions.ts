"use server"

export async function handleCommentSubmit(formData: FormData, postId: number) {
    console.log(postId)
    console.log(formData.get('content'))
}
