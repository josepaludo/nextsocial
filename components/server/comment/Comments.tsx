import { CommentWithUserType } from "@/types";
import { getUser } from "@/serverfunctions";
import ClientComment from "@/components/client/comment/ClientComment";
import { User } from "@prisma/client";


export default async function Comments(
    {comments, currentUser}: {comments: CommentWithUserType[], currentUser: User|null}
) {
    
    const user = currentUser ? currentUser : await getUser()

    return <>
        { comments.length > 0 ?
            comments.map((comment, key) => (
                <ClientComment
                    comment={comment}
                    key={key}
                    currentUser={user}
                />
            ))
        :
            <h1 className="m-10 text-lg font-light">
                No comments yet.
            </h1>
        }
    </>
    
}