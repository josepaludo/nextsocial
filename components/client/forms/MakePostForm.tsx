"use client"

import Input from "@/components/general/Input"
import Label from "@/components/general/Label"
import SubmitButtonEnd from "@/components/general/SubmitButtonEnd"
import TextArea from "@/components/general/TextArea"
import { MakePostRequestForm } from "@/types"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FormEvent } from "react"

type PostFormType = {
    groupId?: number,
    className?: string,
    rows?: number
}


export default function MakePostForm(
    {groupId, className, rows}: PostFormType
) {

    const router = useRouter()

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        const {title, content} = e.target as HTMLFormElement as any
        if (title.value === "" || content.value === "") {
            console.log("Can't post empty title or content post.")
            return
        } 
        const data: MakePostRequestForm = {
            title: title.value,
            content: content.value,
            groupId: groupId,
        }
        axios.post('/api/app/makepost', data)
            .then( function(response) {
                if (response.data.success) {
                    title.value = ""
                    content.value = ""
                    router.refresh()
                }
                console.log(response.data)
            }).catch( function (error) {
                console.log(error)
            })
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={className}
        >
            <Label htmlFor="title" title="Title" />
            <Input name="title" className=" mb-3 " />

            <Label htmlFor="content" title="Content" />
            <TextArea name="content" rows={rows ? rows : 10} />

            <SubmitButtonEnd title="Post" className="mt-3" />

        </form>
    )
}