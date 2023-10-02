"use client"

import axios from "axios";
import { ThumbsDown, ThumbsUp } from "./Thumbs";
import { useState } from "react";
import { LikeValue } from "@/types";

type ThumbsPostUpAndDownType = {
    className?: string
    commentId: number
    likesTotal: number
    userVote: LikeValue|undefined
}


export default function ThumbsComments(
    {className, commentId, likesTotal, userVote}: ThumbsPostUpAndDownType
) {

    const [likes, setLikes] = useState(likesTotal)
    const [like, setLike] = useState(userVote ? userVote : LikeValue.Null)

    function upVote() {
        switch (like) {
            case LikeValue.Up:
                setLike(LikeValue.Null)
                setLikes(oldLikes => oldLikes-1)
                break
            case LikeValue.Down:
                setLike(LikeValue.Up)
                setLikes(oldLikes => oldLikes+2)
                break
            case LikeValue.Null:
                setLike(LikeValue.Up)
                setLikes(oldLikes => oldLikes+1)
                break
        }
        voteUpOrDown(LikeValue.Up)
    }

    function downVote() {
        switch (like) {
            case LikeValue.Down:
                setLike(LikeValue.Null)
                setLikes(oldLikes => oldLikes+1)
                break
            case LikeValue.Up:
                setLike(LikeValue.Down)
                setLikes(oldLikes => oldLikes-2)
                break
            case LikeValue.Null:
                setLike(LikeValue.Down)
                setLikes(oldLikes => oldLikes-1)
                break
        }
        voteUpOrDown(LikeValue.Down)
    }

    function voteUpOrDown(likeValue: LikeValue) {
        axios.post('/api/app/votecomment', {commentId, likeValue})
            .then( function(response) {
                const count: number|undefined = response.data.voteCount
                if (!count) return
                // setLikes(count)
            }).catch( function(error) {console.log(error)})
    }

    return (
        <div className={className}>
            <ThumbsUp voteFunction={upVote} userVote={like} />
            <span className="mx-1 font-semibold">{likes}</span>
            <ThumbsDown voteFunction={downVote} userVote={like} />
        </div>
    )
}