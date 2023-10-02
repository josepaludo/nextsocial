import NewOrForyou from "@/components/server/home/NewOrForyou";
import ShowAndHideMakePost from "@/components/server/home/ShowAndHideMakePost";
import Posts from "@/components/server/post/Posts";


export default function App() {

    return (
        <>
            <ShowAndHideMakePost />
            <NewOrForyou newIsActive={true} />
            <Posts />
        </>
    )
}
