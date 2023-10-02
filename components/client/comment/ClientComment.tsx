"use client"

import { User } from "@prisma/client";
import Card from "@/components/general/Card";
import Link from "next/link";
import { CommentWithUserType } from "@/types";
import SplitedContent from "@/components/general/SplitedContent";
import ClientCommentBottomBar from "./ClientCommentBottomBar";
import CommentComments from "./CommentComments";
import { useState } from "react";
import ShowAndHideButton from "../ShowAndHideButton";
import AnswerCommentForm from "../forms/AnswerCommentForm";

type CommentType = {
    comment: CommentWithUserType
    currentUser: User|null
    className?: string
}

export default function ClientComment(
    {comment, className, currentUser}: CommentType
) {

    const [showComments, setShowComments] = useState(false)

    const {content, user, id, comments, likes} = comment
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

            <ClientCommentBottomBar
                commentId={id}
                commentsTotal={comments.length}
                likes={likes}
                userVote={userVote}
                setShowComments={setShowComments}
            />
        </Card>

        { showComments &&
            <>
                <ShowAndHideButton message="Answer" >
                    <AnswerCommentForm commentId={id} />
                </ShowAndHideButton>
                <CommentComments
                    currentUser={currentUser}
                    comments={comments}
                    className={className}
                />
            </>
        }
        
    </>
}