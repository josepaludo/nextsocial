import ShareComment from "@/components/client/ShareComment";
import ThumbsComments from "@/components/client/ThumbsComments";
import CommentSVG from "@/components/general/svg/CommentIcon";
import { countVotes } from "@/serverfunctions";
import { LikeValue } from "@/types";
import Link from "next/link";

type CommentBottomBarType = {
    commentId: number
    postId: number
    commentsTotal: number
    likes: {
        value: string;
        userId: number;
    }[]
    userVote: string | undefined
}

type Likes = {
    value: LikeValue
    userId: number
}[]


export default function CommentBottomBar(
    {commentId, postId, commentsTotal, likes, userVote}: CommentBottomBarType
) {

    return (
        <div className="flex text-sm font-extralight items-center flex-wrap">
            <Link
                href={`/app/post/${postId}/${commentId}`}
                className="flex items-center"
            >
                <CommentSVG /> {commentsTotal}
            </Link>

            <ThumbsComments
                postId={postId}
                commentId={commentId}
                likesTotal={countVotes(likes as Likes)}
                className="flex ml-6 mr-8 items-center"
                userVote={userVote as LikeValue}
            />

            <ShareComment postId={postId} commentId={commentId} />
        </div>
    )
}