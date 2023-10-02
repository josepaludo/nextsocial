import SharePost from "@/components/client/SharePost";
import ThumbsPostUpAndDown from "@/components/client/ThumbsPostUpAndDown";
import CommentSVG from "@/components/general/svg/CommentIcon";
import { LikeValue } from "@/types";
import Link from "next/link";

type PostBottomBarType = {
    commentsTotal: number
    likesTotal: number
    postId: number
    userVote: LikeValue | undefined
}

export default function PostBottomBar(
    {commentsTotal, likesTotal, postId, userVote}: PostBottomBarType
) {

    return (
        <div className="flex text-sm font-extralight items-center flex-wrap ">

            <Link href={"/app/post/"+postId} className="flex items-center">
                <CommentSVG /> {commentsTotal}
            </Link>

            <ThumbsPostUpAndDown
                postId={postId}
                likesTotal={likesTotal}
                className="flex ml-6 mr-8 items-center"
                userVote={userVote}
            />

            <SharePost postId={postId} />
        </div>
    )
}
