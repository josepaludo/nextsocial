import { Comment, Post, User } from "@prisma/client"


export type LoginRegisterRequestForm = {
    username: string
    email: string
    password: string
}
export type LoginRegisterResponseData = {
    success: boolean
}

export type JWTType = {
    name: string
    email: string
    expireDate: Date
}

export type MakePostRequestForm = {
    title: string
    content: string
    groupId?: number
}

export type AppendToPostType = {
    user: {
        name: string
        id: number
    },
    likes: { 
        postId: number
        userId: number
        value: LikeValue
    }[],
    comments: { 
        id: number 
        commentId: number | null
        likes: {
            value: LikeValue
            userId: number
        }[] 
    }[],
    group?: {
        name: string
    }
}

export type PostWithUserLikesCommentsType = Post & AppendToPostType

export type CommentWithUserType = Comment & {
    user: {
        name: string,
        id: number
    },
    comments: {
        id: number
    }[],
    likes: {
        value: string
        userId: number
    }[]
}

export type MakeCommentRequestForm = {
    postId: number
    content: string
}


export type CreateGroupResponseType = {
    groupId: undefined | number
    existingGroupId: undefined | number
}

export type GroupType = {
    posts: {
        id: number;
    }[];
    groupMembers: {
        userId: number;
    }[];
} & {
    id: number;
    name: string;
    description: string;
}

export type UserWithFollowersCountType = {
    followers: {
        followerId: number;
    }[];
    followings: {
        followerId: number;
    }[];
} & {
    id: number;
    name: string;
    email: string;
    password: string;
    bio: string | null;
}

export enum LikeValue {
    Null = "a",
    Up = "b",
    Down = "c",
}

export enum SearchParam {
    null = "a",
    userName = "user-name",
    userBio = "user-bio",
    postTitle = "post-title",
    postContent = "post-content",
    groupName = "group-name",
    groupDescription = "group-description",
} 

export function isSearchParam(param: any) {
    const params = Object.values(SearchParam)
    return params.includes(param)
}

export type AnswerCommentRequestForm = {
    commentId: number;
    content: string;
}

export type GetAnswersType = {
    success: boolean
    commentAnswers: CommentWithUserType[]
}

export enum TokenEnum {
    accessToken = "accessToken"
}