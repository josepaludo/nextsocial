"use client"

import { TokenEnum } from "@/types"
import axios from "axios"
import { deleteCookie } from "cookies-next"


export default function Logout() {

    function handleClick() {
        deleteCookie(TokenEnum.accessToken)
        location.reload()
    }

    return (
        <button
            className="py-2 px-4 font-semibold bg-red-900 text-white hover:bg-red-600 rounded-lg"
            onClick={handleClick}
        >
            Logout
        </button>
    )
}