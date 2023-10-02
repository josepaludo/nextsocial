import { getusers } from "@/serverfunctions";
import { User } from "@prisma/client";
import UserCard from "./User";


export default async function Users(
    {selectedUsers, currentGroup}: {
        selectedUsers?: {id: number, name: string}[],
        currentGroup?: number|false
    }
) {

    const users = selectedUsers ? selectedUsers : await getusers()

    return (
        <>
            { users.map((user, key) => (
                <UserCard
                    key={key}
                    user={user}
                    currentGroup={currentGroup}
                />
            ))}
        </>
    )
}