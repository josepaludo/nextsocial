"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function JoinGroupButton(
    {isMember, groupId}: {isMember: boolean, groupId: number}
) {

    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

    function JoinGroup() {
        if (loading) return
        setLoading(true)
        axios.post('/api/app/join', {id: groupId})
            .then(function (response) {
                const success = response.data
                setLoading(false)
                router.refresh()
            }) .catch(function (error) {console.log(error)})
    }

    function LeaveGroup() {
        if (loading) return
        setLoading(true)
        axios.post('/api/app/leave', {id: groupId})
            .then(function (response) {
                const success = response.data
                setLoading(false)
                router.refresh()
            }) .catch(function (error) {console.log(error)})
    }

    return <>
        <button
            onClick={isMember ? LeaveGroup : JoinGroup}
            className="py-2 px-4 bg-gray-300 rounded hover:bg-slate-700 hover:text-white font-semibold"
        >
            { isMember ?
                "Leave Group"
            :
                "Join Group"
            }
        </button>
    </>
}