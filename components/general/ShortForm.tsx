import { FormEventHandler } from "react"

type NarrowFormType = {
    children: React.ReactNode
    onSubmit: FormEventHandler
    className?: string
}


export default function NarrowForm(
    {children, onSubmit, className}: NarrowFormType 
) {

    return <>
        <form
            className={"w-72 mx-auto "+className}
            onSubmit={onSubmit}
        >
            {children}
        </form>
    </>
}