
export default function DotDotDot() {

    return (

        <div className="flex w-fit">
            <Dot />
            <Dot />
            <Dot />
        </div>
    )
}

function Dot() {

    return (
        <div
            className="h-1.5 w-1.5 rounded-full border-2 border-slate-900 me-0.5"
        />
    )
}