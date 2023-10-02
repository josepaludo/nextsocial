import SearchIcon from "@/components/general/svg/SearchIcon";
import { ButtonSpam, SideBarButton } from "./SideBarButtons";
import Link from "next/link";
import { Break } from "./SideBar";
import { SearchParam } from "@/types";


export default function SearchButton() {
    return (
        <div className="group">
            <SideBarButton href={url+SearchParam.postContent}>
                <SearchIcon />
                <ButtonSpam content="Search" />
            </SideBarButton>
            <div className="hidden group-hover:flex flex-col text-end px-3">

                <Break />
                <h1 className="font-semibold">User</h1>
                <Link
                    href={url+SearchParam.userName}
                    className="font-light"
                >
                    Name
                </Link>
                <Break thin={true} />
                <Link
                    href={url+SearchParam.userBio}
                    className="font-light"
                >
                    Bio
                </Link>

                <Break />
                <h1 className="font-semibold">Post</h1>
                <Link
                    href={url+SearchParam.postTitle}
                    className="font-light"
                >
                    Title
                </Link>
                <Break thin={true} />
                <Link
                    href={url+SearchParam.postContent}
                    className="font-light"
                >
                    Content
                </Link>

                <Break />
                <h1 className="font-semibold">Group</h1>
                <Link
                    href={url+SearchParam.groupName}
                    className="font-light">
                    Name
                </Link>
                <Break thin={true} />
                <Link
                    href={url+SearchParam.groupDescription}
                    className="font-light"
                >
                    Description
                </Link>
                <Break />
            </div>
        </div>
    )
}

const url = '/app/search/'