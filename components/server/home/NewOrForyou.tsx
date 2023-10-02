import Link from "next/link"

export default function NewOrForyou(
    {newIsActive}: {newIsActive: boolean}
) {

    return <>
        <div className="flex my-3">
            <HalfButton
                isNew={true}
                isActive={newIsActive}
            />
            <HalfButton
                isNew={false}
                isActive={!newIsActive}
            />
        </div>
    </>
}

function HalfButton(
    {isNew, isActive}: {isNew: boolean, isActive: boolean}
) {

    const isNewClass = isNew ? " rounded-l-xl " : " rounded-r-xl border-l-0 "
    const isActiveClass = isActive ? " bg-slate-700 text-white " : ""

    return <>
        <Link
            href={ isNew ? "/app" : "/app/foryou" }
            className={"py-4 grow border-2 border-slate-700 font-semibold text-xl text-center "+isNewClass+isActiveClass}
        >
            { isNew ? "New" : "For you" }
        </Link>
    </>
}
