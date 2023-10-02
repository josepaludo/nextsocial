import { getUser } from "@/serverfunctions";
import { HomeButton, ProfileButton} from "./SideBarButtons";
import Link from "next/link";
import GroupButton from "./GroupButton";
import SearchButton from "./SearchButton";


export default async function SideBar(
    {className}: {className?: string}
) {
    const user = await getUser()
    if (user) console.log(user.name, "a", user.email)

    return (
        <div
            className={'h-full flex flex-col justify-between items-center bg-slate-700 text-gray-100 border-x border-slate-900 w-16 md:w-40 '+className}
            // style={{maxWidth: "140px"}}
        >
            <div className="border-b border-slate-900 py-3 w-full overflow-scroll">
                <HomeButton />
                <Break />
                <ProfileButton />
                <Break />
                <GroupButton />
                <Break />
                <SearchButton />
                <Break />
            </div>

            <Link
                href={ user ? "/app/profile/"+user.id : "/login"}
                className="font-semibold text-center w-full p-3 overflow-scroll border-t border-slate-900"
            >
                { user ? user.name : "Login" }
            </Link>
        </div>
    )
}

export function Break({thin}: {thin?:boolean}) {
    const className = thin ? "my-0.5" : "my-1"
    return <hr className={"border-0 "+className} />
}