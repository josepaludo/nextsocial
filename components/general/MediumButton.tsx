
type MediumButtonType = {
    type: "button" | "submit" | "reset" | undefined
    content: string
    className?: string
}

export default function MediumButton(
    {type, content, className}: MediumButtonType
) {

    return <>
        <button
            type={type}
            className={"rounded-full py-2 px-4 bg-slate-950 hover:bg-slate-300 hover:text-black text-white font-semibold w-full " + className}
        >
            {content}
        </button>
    </>
}