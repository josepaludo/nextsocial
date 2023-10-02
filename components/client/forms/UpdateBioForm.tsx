"use client"

import SubmitButtonEnd from "@/components/general/SubmitButtonEnd"
import TextArea from "@/components/general/TextArea"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"


export default function UpdateBioForm(
    {bio, id}: {bio: string|null, id: number}
) {

    const [showForm, setShowForm] = useState<boolean>(false)

    return <>
        <div className="flex justify-between items-baseline">
            <p className="p-5">
                { showForm ? "" :
                    bio ? bio : "Empty bio."
                }
            </p>
            <button
                onClick={() => setShowForm(oldState => !oldState)}
                className="bg-gray-200 rounded-lg py-2 px-4 hover:bg-slate-700 hover:text-white font-semibold"
            >
                { showForm ? "Hide" : "Update Bio" }
            </button>
        </div>
        { showForm &&
            <BioForm id={id} setShowForm={setShowForm} bio={bio} />
        }
    </>
}

function BioForm(
    {id, setShowForm, bio}: {id: number, setShowForm: Function, bio:string|null}
) {

    const router = useRouter()

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const bio = form.bio.value
        if (bio === "") return
        axios.post('/api/app/changebio', {bio, id})
            .then(function(response) {
                const {success} = response.data
                if (!success) return
                setShowForm(false)
                router.refresh()
            }).catch(function (error) {console.log(error)})
    }

    return <>
        <form onSubmit={handleSubmit}>
            <TextArea
                name="bio"
                defaultValue={bio ? bio : ""}
                className=" my-3 bg-slate-100 focus:bg-white "
            />
            <SubmitButtonEnd title="Submit" />
        </form>
    </>
}