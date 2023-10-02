import ShareComment from "@/components/client/ShareComment";
import ThumbsComments from "@/components/client/ThumbsComments";
import CommentSVG from "@/components/general/svg/CommentIcon";
import { LikeValue } from "@/types";
import { Dispatch, SetStateAction } from "react";

type CommentBottomBarType = {
    commentId: number
    commentsTotal: number
    likes: {
        value: string;
        userId: number;
    }[]
    userVote: string | undefined
    setShowComments: Dispatch<SetStateAction<boolean>>
}

type Likes = {
    value: LikeValue
    userId: number
}[]


export default function ClientCommentBottomBar({
    commentId, commentsTotal, likes, userVote, setShowComments
}: CommentBottomBarType) {

    return (
        <div className="flex text-sm font-extralight items-center flex-wrap">
            <button
                onClick={() => setShowComments(oldValue => !oldValue)}
                className="flex items-center"
            >
                <CommentSVG /> {commentsTotal}
            </button>

            <ThumbsComments
                commentId={commentId}
                likesTotal={countVotes(likes as Likes)}
                className="flex ml-6 mr-8 items-center"
                userVote={userVote as LikeValue}
            />

            <ShareComment commentId={commentId} />
        </div>
    )
}

function countVotes(
    likes: {
        userId?: number,
        postId?: number,
        value: LikeValue
    }[]
) {
    let count = 0
    likes.forEach(like => {
        switch (like.value) {
            case LikeValue.Up:
                count++
                break
            case LikeValue.Down:
                count--
        }
    })
    return count
}