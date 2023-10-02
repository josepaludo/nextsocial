import Link from "next/link";
import PostBottomBar from "./PostBottomBar";
import { LikeValue, PostWithUserLikesCommentsType } from "@/types";
import { countVotes, getUser, userVote } from "@/serverfunctions";
import Card from "@/components/general/Card";
import GroupLink from "../group/GroupLink";
import SplitedContent from "@/components/general/SplitedContent";


export default async function LargePost(
    {post}: {post: PostWithUserLikesCommentsType }
) {

    const {id, title, content, user, comments, likes, group, groupId} = post

    return (
        <Card>
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <h1 className="text-2xl font-semibold">
                        {title}
                    </h1>
                    { group && groupId &&
                        <GroupLink
                            groupId={groupId}
                            groupName={group.name}
                        />
                    }
                </div>

                <Link
                    href={"/app/profile/"+user.id}
                    className="font-light italic"
                >
                    {user.name}
                </Link>

            </div>

            <div className="px-5 py-7">
                <SplitedContent content={content} />
            </div>

            <PostBottomBar
                commentsTotal={comments.length}
                postId={id}
                likesTotal={countVotes(likes)}
                userVote={await userVote(id)}
            />
        </Card>
    )
}
