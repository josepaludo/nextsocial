import GroupIcon from "@/components/general/svg/GroupIcon";
import HouseIcon from "@/components/general/svg/HouseIcon";
import PersonIcon from "@/components/general/svg/PersonIcon";
import SearchIcon from "@/components/general/svg/SearchIcon";
import Link from "next/link";


export function HomeButton() {

    return (
        <SideBarButton href="/app">
            <HouseIcon />
            <ButtonSpam content="Home" />
        </SideBarButton>
    )
}

export function ProfileButton() {

    return (
        <SideBarButton href="/app/profile">
            <PersonIcon />
            <ButtonSpam content="Profile" />
        </SideBarButton>
    )
}

// export function SearchButton () {

//     return (
//         <div className="group">
//             <SideBarButton href="/app">
//                 <SearchIcon />
//                 <ButtonSpam content="Search" />
//             </SideBarButton>
//             <div className="hidden group-hover:flex flex-col text-end px-3">Hidden</div>
//         </div>
//     )
// }

export function SideBarButton( {href, children, className}: {
    href: string, children: React.ReactNode, className?: string
}) {
    return (
        <Link
            href={href}
            className={"flex items-center py-2 px-4 hover:opacity-80 "+className} >
            {children}
        </Link>
    )
}

export function ButtonSpam(
    {content}: {content: string}
) {

    return (
        <span className="hidden md:block md:ml-1 font-semibold">
            {content}
        </span>
    )
}
