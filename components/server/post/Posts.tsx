import { getPosts } from "@/serverfunctions";
import Post from "./Post";
import { PostWithUserLikesCommentsType } from "@/types";

type PostsType = {
    className?: string,
    selectedPosts?: PostWithUserLikesCommentsType[]
}

export default async function Posts(
    {className, selectedPosts}: PostsType 
) {

    const posts = selectedPosts ? selectedPosts : await getPosts()

    return (
        <div className={" " + className}>
            { posts.map((post, key) => (
                <Post post={post} key={key} />
            ))}
        </div>
    )
}
