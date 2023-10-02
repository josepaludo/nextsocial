import { cookies } from "next/headers";
import { AppendToPostType, GroupType, JWTType, LikeValue, MakePostRequestForm, PostWithUserLikesCommentsType } from "./types";
import { prisma } from "./prisma/db";
import jwt from "jsonwebtoken"


export function getToken() {
    const token = cookies().get("accessToken")?.value as string
    return jwt.decode(token)
}

export async function getUser() {
    try {
        const {email} = getToken() as JWTType
        const user = await prisma.user.findUnique(
            { where: {email} }
        )
        return user

    } catch {
        return null
    }
}

export async function getusers() {
    return await prisma.user.findMany({
        orderBy: {id: 'desc'},
    })
}

export async function makePost(
    {title, content, groupId }: MakePostRequestForm
) {
    const user = await getUser()
    if (!user) return undefined
    const userId = user.id
    const post = await prisma.post.create({
        data: { title, content, userId, groupId }
    })
    return post
}

export const includeOnPosts = {
    user: { select: {
        name: true,
        id: true
    }},
    comments: { select: {
        id: true,
        commentId: true,
        likes: { select: {
            value: true,
            userId: true
        }}
        
    }},
    likes: { select: {
        postId: true,
        userId: true,
        value: true
    }},
    group: { select: {
        name: true
    }}
}

export async function getPosts() {
    const posts = await prisma.post.findMany({
        orderBy: {id: 'desc'},
        include: includeOnPosts
    })
    return posts as PostWithUserLikesCommentsType[]
}

export async function getPostsByGroup(groupId: number) {
    const posts = await prisma.post.findMany({
        where: { groupId },
        orderBy: {id: 'desc'},
        include: includeOnPosts
    })
    return posts as PostWithUserLikesCommentsType[]
}

export async function getPostsByUser(userId: number) {
    const posts = await prisma.post.findMany({
        where: { userId },
        orderBy: {id: 'desc'},
        include: includeOnPosts
    })
    return posts as PostWithUserLikesCommentsType[]
}

export async function getPost(id: string|number) {
    const numberId: number = Number(id)
    if (Number.isNaN(numberId)) return null
    const post = await prisma.post.findUnique({
        where: { id: numberId },
        include: includeOnPosts
    })
    return post as PostWithUserLikesCommentsType|null
}

export async function makeComment(postId: number, content: string) {
    const post = await getPost(postId)
    if (!post) return undefined
    const user = await getUser()
    if (!user) return undefined
    const comment = await prisma.comment.create({
        data: {
            content: content,
            postId: post.id,
            userId: user.id,
        }
    })
    return comment
}

export async function getComments(postId: number){
    const comments = await prisma.comment.findMany({
        where: { postId: postId },
        orderBy: {id: 'desc'},
        include: { 
            user: {
                select: {
                    name: true,
                    id: true
                }
            },
            comments: {
                select: {
                    id: true
                }
            },
            likes: {
                select: {
                    value: true,
                    userId: true,
                }
            }
        }
    })
    return comments
}

export function countVotes(
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

export async function userVote(postId: number) {
    const user = await getUser()
    if (!user) return LikeValue.Null
    const like = await prisma.like.findUnique({
        where: {
            postId_userId : {
                postId: postId,
                userId: user.id 
            }
        }
    })
    return like ? like.value as LikeValue : LikeValue.Null
}

export async function getVotes(postId: number) {
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        },
        select: {
            likes: {
                select: {
                    userId: true,
                    value: true
                }
            }
        }
    })
    if (!post) return undefined
    const likes = post.likes as {value: LikeValue, userId: number}[]
    return likes
}

export async function votePost(
    postId: number, value: LikeValue, userId: number
) {
    const userLike = await prisma.like.findUnique({
        where: { postId_userId: { postId, userId } },
        select: { value: true }
    }) 
    let newValue = value
    if (userLike) {
        switch (value) {
            case LikeValue.Up:
                newValue = userLike.value === LikeValue.Up ?
                    LikeValue.Null : LikeValue.Up
                break
            case LikeValue.Down:
                newValue = userLike.value === LikeValue.Down ?
                    LikeValue.Null : LikeValue.Down
                break
        }
    }
    if (newValue === LikeValue.Null) {
        await prisma.like.delete({
            where: {
                postId_userId: { postId, userId }
            }
        })
        return LikeValue.Null

    }
    const like = await voteUpsert(postId, newValue, userId)
    return like
}

export async function voteUpsert(
    postId: number, value: LikeValue, userId: number
) {
    const like = await prisma.like.upsert({
        where: { postId_userId: { postId, userId } },
        update: {
            value: value
        },
        create: {
            postId: postId,
            userId: userId,
            value: value
        }
    })
    return like.value as LikeValue
}

export async function getGroup(name: string) {
    const group = await prisma.group.findUnique({ 
        where: { name },
        include: {
            groupMembers: { select: {
                userId: true
            }},
            posts: { select: {
                id: true
            }}
        }
    })
    return group
}

export async function getGroupById(id: number|string) {
    const numberId = Number(id)
    if (isNaN(numberId)) return null
    const group = await prisma.group.findUnique({
        where: { id: numberId },
        include: { 
            posts: { select: { 
                id: true 
            }},
            groupMembers: { select: {
                userId: true
            }}
        }
    })
    return group
}

export async function getGroups() {
    const groups = await prisma.group.findMany({
        orderBy: {id: 'desc'},
        include: { 
            posts: { select: { 
                id: true 
            }},
            groupMembers: { select: {
                userId: true,
            }}
        }
    })
    return groups
}

export async function getGroupsByUserId(userId: number) {
    if (isNaN(userId)) return undefined
    const groups = await prisma.group.findMany({
        orderBy: {id: 'desc'},
        where: { 
            groupMembers: { some: { userId } }
        },
        include: { 
            posts: { select: { 
                id: true 
            }},
            groupMembers: { select: {
                userId: true
            }}
        }
    })
    return groups as GroupType[]
}
export async function getGroupName(groupIdString: string) {
    const groupId = Number(groupIdString)
    if (isNaN(groupId)) return undefined
    const group = await prisma.group.findUnique({
        where: { id: groupId }
    })
    return group?.name
}

export async function userFollowsUser(
    {followerId, followingId}: {followerId: number|undefined, followingId: number}
) {
    if (!followerId) return false
    const follows = await prisma.follower.findUnique({ where:
        { followerId_followingId: { followerId, followingId } }
    })
    return follows ? true : false
}

export async function getUserWithFollowersCount({id}: {id: number}) {
    const user = await prisma.user.findUnique({
        where: { id },
        include: {
            followers: { select: {
                followerId: true
            }},
            followings: { select: {
                followerId: true
            }}
        }
    })
    return user
}

export async function getFollowers({id}: {id: number}) {
    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            name: true,
            followers: { select: {
                follower: { select: {
                    id: true,
                    name: true,
                }}
            }}
        }
    })
    if (!user) return null
    const followers = user.followers.map(user => user.follower)
    const name = user.name
    return {name, followers}
}

export async function getFollowings({id}: {id: number}) {
    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            name: true,
            followings: { select: {
                following: { select: {
                    id: true,
                    name: true,
                }}
            }}
        }
    })
    if (!user) return null
    const followings = user.followings.map(user => user.following)
    const name = user.name
    return {name, followings}
}

export async function isMember(groupId: number, userId: number) {
    return await prisma.groupMember.findUnique({
        where: {groupId_userId: { groupId, userId } }
    })
}

export async function isAdmin(groupId: number, userId: number) {
    return await prisma.groupAdmin.findUnique({
        where: { groupId_userId : { groupId, userId } }
    })
}

export async function isBanned(groupId: number, userId: number) {
    return await prisma.groupBanned.findUnique({
        where: { groupId_userId : { groupId, userId } }
    })
}

export async function removeMember(groupId: number, userId: number) {
    return await prisma.groupMember.delete({
        where: { groupId_userId: { groupId, userId }}
    })
}

export async function removeAdmin(groupId: number, userId: number) {
    return await prisma.groupAdmin.delete({
        where: { groupId_userId: { groupId, userId }}
    })
}

export async function removeBanned(groupId: number, userId: number) {
    return await prisma.groupBanned.delete({
        where: { groupId_userId: { groupId, userId }}
    })
}

export async function addBanned(groupId: number, userId: number) {
    return await prisma.groupBanned.create({
        data: { groupId, userId }
    })
}

export async function addAdmin(groupId: number, userId: number) {
    return await prisma.groupAdmin.create(
        { data: { groupId, userId } }
    )   
}

export async function addMember(groupId: number, userId: number) {
    return await prisma.groupMember.create(
        { data: { groupId, userId } }
    )   
}

export async function removeMemberFromGroup(groupId: number, userId: number) {
    try {
        await removeMember(groupId, userId)
    } catch {
        return false
    }
    try { await removeAdmin(groupId, userId) } catch {}
    return true
}

export async function banMember(groupId: number, userId: number) {
    await removeMemberFromGroup(groupId, userId)
    try {
        await prisma.groupBanned.create({
            data: { groupId, userId }
        })
    } catch { 
        return false
    }
    return true
}

export async function getComment(id: number) {
    return prisma.comment.findUnique({
        where: { id },
        include: {
            likes: { select: {
                value: true,
                userId: true
            }},
            comments: { select: {
                id: true
            }},
            user: { select: {
                id: true,
                name: true
            }}
        }
    })
}