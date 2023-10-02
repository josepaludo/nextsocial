import { RemoveAndBlockButtons } from "@/components/client/AdminSettingsButtons";
import Card from "@/components/general/Card";
import { getPostsByUser } from "@/serverfunctions";
import Link from "next/link";

type UserCardType = {
    user: {
        id: number
        name: string
    }
    currentGroup: number|false|undefined
}


export default async function UserCard(
    {user, currentGroup}: UserCardType
) {

    const posts = await getPostsByUser(user.id)

    return (
        <Card className=" flex justify-between items-center bg-white ">
            <div className="flex items-center">
                <Link
                    href={"/app/profile/"+user.id}
                    className="text-2xl font-bold"
                >
                    {user.name}
                </Link>
                { currentGroup && <>
                    <RemoveAndBlockButtons
                        userId={user.id}
                        groupId={currentGroup}
                    />
                </>}
            </div>
            <p className="font-light">
                Posts: {posts.length}
            </p>
        </Card>
    )
}