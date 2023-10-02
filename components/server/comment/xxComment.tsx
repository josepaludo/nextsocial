import { Comment, User } from "@prisma/client";
import Card from "@/components/general/Card";
import Link from "next/link";
import { CommentWithUserType } from "@/types";
import CommentBottomBar from "./xxCommentBottomBar";
import SplitedContent from "@/components/general/SplitedContent";
import CommentComments from "@/components/client/comment/CommentComments";

type CommentType = {
    comment: CommentWithUserType
    currentUser: User|null
    className?: string
}

export default async function Comment(
    {comment, className, currentUser}: CommentType
) {

    const {content, user, postId, id, comments, likes} = comment
    const userVote = likes.find(like => like.userId === currentUser?.id)?.value

    return <>
        <Card className={className}>
            <Link
                href={"/app/profile/"+user.id}
                className="font-light italic text-slate-800"
            >
                {user.name}
            </Link>

            <div className="p-5">
                <SplitedContent content={content} />
            </div>

            <CommentBottomBar
                postId={postId}
                commentId={id}
                commentsTotal={comments.length}
                likes={likes}
                userVote={userVote}
            />
        </Card>
        <CommentComments comments={comments} />
    </>
}
