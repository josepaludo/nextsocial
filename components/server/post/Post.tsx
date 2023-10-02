import { PostWithUserLikesCommentsType } from "@/types";
import Link from "next/link";
import PostBottomBar from "./PostBottomBar";
import Card from "@/components/general/Card";
import { countVotes, userVote } from "@/serverfunctions";
import GroupLink from "../group/GroupLink";
import SplitedContent from "@/components/general/SplitedContent";
import DotDotDot from "@/components/general/DotDotDot";


export default async function Post(
    {post}: {post: PostWithUserLikesCommentsType }
) {

    const {title, content, id, user, comments, likes, group, groupId} = post

    let fullOrCroppedContent = <SplitedContent content={content} />
    if ( content.length > 80 ) {
        fullOrCroppedContent = <>
            <SplitedContent content={content.slice(0, 79)} />
            <Link href={"/app/post/"+id} className="text-2xl"> ...</Link>
        </>
    }  

    return (
        <Card>
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Link
                        href={"/app/post/"+id}
                        className="font-semibold text-xl"
                    >
                        {title}
                    </Link>
                    { groupId && group &&
                        <GroupLink
                            groupId={groupId}
                            groupName={group.name}
                        />
                    }

                </div>

                <Link
                    href={"/app/profile/"+user.id}
                    className="font-light italic text-slate-800"
                >
                    {user.name}
                </Link>
            </div>

            <div className="p-5" > 
                { content.length > 80 ?
                    <>
                        <SplitedContent content={content.slice(0, 79)} />
                        <Link
                            href={"/app/post/"+id}
                            className="hover:opacity-60"
                        >
                            <DotDotDot />
                        </Link>
                    </>

                :
                    <SplitedContent content={content} />
                }
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
