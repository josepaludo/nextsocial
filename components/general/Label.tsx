
type LabelType = {
    htmlFor: string
    title: string
    className?: string
}

export default function Label(
    {htmlFor, title, className}: LabelType
) {

    return <>
        <label
            htmlFor={htmlFor}
            className={"font-semibold text-lg text-slate-900 " + className}
        >
            {title}
        </label>
    </>
}