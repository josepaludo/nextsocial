"use client"

import axios from "axios"
import { useRouter } from "next/navigation"


export function RemoveAndBlockButtons(
    {userId, groupId}: {userId: number, groupId: number}
) {

    const router = useRouter()

    function handleRemove() {
        console.log(userId)
        axios.post('/api/app/remove', {groupId, userId })
            .then(function (response) {
                const {success} = response.data
                console.log(success)
                router.refresh()
            })
    }

    function handleBlock() {
        console.log(userId)
        axios.post('/api/app/block', {groupId, userId })
            .then(function (response) {
                const {success} = response.data
                console.log(success)
                router.refresh()
            })
    }

    return <>
        <button
            onClick={handleRemove}
            className={buttonClass+" mx-1"}
        >
            Remove
        </button>
        <button
            onClick={handleBlock}
            className={buttonClass}
        >
            Block
        </button>
    </>
}

const buttonClass = "bg-gray-300 hover:bg-slate-700 hover:text-white py-0.5 px-3 rounded font-semibold"