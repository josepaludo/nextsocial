import Link from "next/link";

type ButtonLinkType = {
    href: string,
    title: string,
    className?: string
}

export default function ButtonLink(
    {href, title, className}: ButtonLinkType
) {
    return (
        <Link
            className={"block w-fit h-fit rounded-full py-2 px-4 font-semibold text-white bg-slate-700 hover:bg-slate-400 hover:text-slate-900 "+className}
            href={href}
        >
            {title}
        </Link>
    )
}