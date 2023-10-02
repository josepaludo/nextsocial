import { CommentWithUserType } from "@/types";
import { getUser } from "@/serverfunctions";
import ClientComment from "@/components/client/comment/ClientComment";


export default async function Comments(
    {comments}: {comments: CommentWithUserType[]}
) {
    
    const currentUser = await getUser()
    return <>
        { comments.length > 0 ?
            comments.map((comment, key) => (
                <ClientComment
                    comment={comment}
                    key={key}
                    currentUser={currentUser}
                />
            ))
        :
            <h1 className="m-10 text-lg font-light">
                No comments yet.
            </h1>
        }
    </>
    
}