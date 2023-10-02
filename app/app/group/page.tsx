import Link from "next/link";

export default function GroupHome() {

    return (
        <>
            <h1 className="text-3xl font-semibold mb-3">
                <Link href={url+"browse"} className={linkClass}>
                    Browse
                </Link>
                {" "} your groups.
            </h1>
            <h1 className="text-3xl font-semibold my-3">
                <Link href={url+"find"} className={linkClass}>
                    Find
                </Link>
                {" "} new groups.
            </h1>
            <h1 className="text-3xl font-semibold my-3">
                <Link href={url+"create"} className={linkClass}>
                    Create
                </Link>
                {" "} a new group.
            </h1>
        </>
    )
}

const linkClass = "underline text-slate-700"
const url = '/app/group/'