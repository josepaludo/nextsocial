import CreateGroupForm from "@/components/client/forms/CreateGroupForm";
import Hr from "@/components/general/Hr";


export default function CreateGroup() {

    return (
        <>
            <h1 className="text-3xl font-semibold">
                Create a new group.
            </h1>
            <CreateGroupForm />
        </>
    )
}