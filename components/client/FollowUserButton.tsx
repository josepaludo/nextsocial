"use client"

import axios from "axios"
import { useRouter } from "next/navigation"


export default function FollowUserButton(
    {id, follows}: {id: number, follows: boolean}
) {

    const router = useRouter()

    function handleFollow() {
        axios.post('/api/app/follow', {id})
            .then(function (response) {
                const {success} = response.data
                console.log(success)
                if (success) router.refresh()
            }).catch(function (error) {console.log(error)})
    }

    function handleUnfollow() {
        axios.post('/api/app/unfollow', {id})
            .then(function (response) {
                const {success} = response.data
                console.log(success)
                if (success) router.refresh()
            }).catch(function (error) {console.log(error)})

    }


    return <>
        <button
            onClick={follows ? handleUnfollow : handleFollow }
            className="py-1 px-3 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-200 hover:text-black"
        >
            { follows ? "Unfollow" : "Follow" }
        </button>
    </>
}