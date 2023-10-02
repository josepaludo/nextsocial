import { ChangeEventHandler } from "react"

type ShortInputType = {
    name: string
    placeholder?: string
    className?: string
    type?: string
    value?: string
    onChange?: ChangeEventHandler<HTMLInputElement>
}


export default function Input(
    {name, placeholder, className, type, value, onChange}: ShortInputType
) {

    return <>
        <input
            name={name}
            placeholder={placeholder}
            type={type ? type : "text"}
            value={value}
            onChange={onChange}
            className={"rounded-full py-2 px-4 bg-white focus:bg-slate-100 font-light outline-none w-full shadow " + className}
        />
    </>
}