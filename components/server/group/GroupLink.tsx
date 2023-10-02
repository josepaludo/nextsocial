import Link from "next/link";

export default function GroupLink(
    { groupName, groupId }: { groupName: string,  groupId: number}
) {

    return (
        <Link
            href={"/app/group/"+groupId}
            className="ms-1 text-sm text-gray-500"
        >
            /{groupName}
        </Link>
    )
}