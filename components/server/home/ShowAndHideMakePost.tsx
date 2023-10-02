import ShowAndHideButton from "@/components/client/ShowAndHideButton";
import MakePostForm from "@/components/client/forms/MakePostForm";


export default function ShowAndHideMakePost(
    {className, groupId}: {className?: string, groupId?: number}
) {
    console.log(groupId)
    return <>
        <div className={"px-2 py-3 border-2 border-slate-700 rounded-xl "+className}>
            <ShowAndHideButton
                message="Make a post!"
                height="h-72"
                mb={false}
            >
                <MakePostForm rows={4} groupId={groupId} />
            </ShowAndHideButton>
        </div>
    </>
}