"use client"

import { FormEvent, useState } from "react"
import axios from "axios"
import { CreateGroupResponseType } from "@/types"
import { useRouter } from "next/navigation"
import Link from "next/link"
import SubmitButtonEnd from "@/components/general/SubmitButtonEnd"
import Input from "@/components/general/Input"
import TextArea from "@/components/general/TextArea"
import Label from "@/components/general/Label"


export default function CreateGroupForm() {

    const router = useRouter()
    const [oldGroupId, setOldGroupId] = useState<number|undefined>(undefined)
    const warningClass = oldGroupId ? "opacity-100" : "opacity-0"

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        if (!form.name || !form.description) return
        axios.post('/api/app/creategroup', {
            //@ts-ignore
            name: form.name.value,
            description: form.description.value
        }).then(function(response) {
            const { groupId, existingGroupId } = response.data as CreateGroupResponseType
            if (groupId) router.push('/app/group/'+groupId)
            setOldGroupId(existingGroupId)
        }).catch(function (error) {console.log(error)})
    }

    return <>
        <form
            onSubmit={handleSubmit}
            className="mt-10"
        >
            <Label htmlFor="name" title="Title" />
            <Input name="name" />

            <Label htmlFor="description" title="Description" />
            <TextArea name="description" />

            <SubmitButtonEnd title="Create" className="mt-3" />
        </form>
        <h1 className={"mt-16 p-3 rounded-xl bg-red-900 text-white font-semibold text-2xl text-center shadow-lg transition-opacity duration-500 "+warningClass}>
            A group with this name already exists: {" "}
            <Link
                href={"/app/group/"+oldGroupId}
                className="underline"
            >
                Group
            </Link>
        </h1>
    </>
    
}