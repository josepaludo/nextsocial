type TextAreaType = {
    name: string
    defaultValue?: string
    rows?: number
    className?: string
}


export default function TextArea(
    {defaultValue, name, rows, className}: TextAreaType
) {

    return <>
        <textarea
            className={" py-3 px-5 rounded-2xl w-full resize-none outline-none focus:bg-slate-100 shadow "+className}
            rows={rows ? rows : 4}
            name={name}
            defaultValue={defaultValue}
        ></textarea>
    </>
}