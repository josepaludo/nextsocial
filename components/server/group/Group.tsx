import Card from "@/components/general/Card";
import { GroupType } from "@/types";
import { Group, Post } from "@prisma/client";
import Link from "next/link";


export default function Group(
    {group}: {group: GroupType}
) {

    const {id, name, description, posts, groupMembers} = group

    return (
        <Card>
            <div className="flex justify-between">
                <Link
                    href={"/app/group/"+id}
                    className="font-semibold text-lg"
                >
                    {name}
                </Link>
                <div>
                    <span className="font-extralight text-sm">
                        <Link href={"/app/group/"+id}>
                            Posts
                        </Link>
                        : {posts.length}
                    </span>
                    <span className="font-extralight text-sm ms-2">
                        <Link href={"/app/group/"+id+"/members"}>
                            Members
                        </Link>
                        : {groupMembers.length}
                    </span>
                </div>
            </div>
            <p className="px-5 pt-5 pb-2 font-light">
                {description}
            </p>
        </Card>
    )
}