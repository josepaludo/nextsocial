import GroupIcon from "@/components/general/svg/GroupIcon";
import { ButtonSpam, SideBarButton } from "./SideBarButtons";
import Link from "next/link";
import { Break } from "./SideBar";


export default function GroupButton() {

    return (
        <div className="group">
            <SideBarButton href="/app/group">
                <GroupIcon />
                <ButtonSpam content="Groups" />
            </SideBarButton>
            <div className="hidden group-hover:flex flex-col text-end px-3">
                <Break />
                <Link href="/app/group/create">Create</Link>
                <Break />
                <Link href="/app/group/browse">Browse</Link>
                <Break />
                <Link href="/app/group/find">Find</Link>
                <Break />
            </div>
        </div>
    )
}