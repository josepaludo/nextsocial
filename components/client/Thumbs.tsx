import { ThumbsDownSVG, ThumbsUpSVG } from "@/components/general/svg/ThumbsIcons"
import { LikeValue } from "@/types"
import { MouseEventHandler } from "react"

type ThumbsType = {
    className?: string
    voteFunction: MouseEventHandler
    userVote: LikeValue|undefined
}


export function ThumbsUp(
    {className, voteFunction, userVote}: ThumbsType
) {
    return (
        <>
            <button onClick={voteFunction} >
                <ThumbsUpSVG
                    className={className}
                    userVoted={userVote === LikeValue.Up}
                />
            </button>
        </>
    )
}

export function ThumbsDown(
    {className, voteFunction, userVote}: ThumbsType
) {
    return (
        <>
            <button onClick={voteFunction} >
                <ThumbsDownSVG
                    className={className}
                    userVoted={userVote === LikeValue.Down}
                />
            </button>
        </>
    )
}