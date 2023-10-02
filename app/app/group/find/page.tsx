import Groups from "@/components/server/group/Groups";


export default function FindGroups() {

    return (
        <>
            <h1 className="font-semibold text-3xl">
                Find new groups.
            </h1>
            {/* filter by number of followers? */}
            <Groups />
        </>
    )
}