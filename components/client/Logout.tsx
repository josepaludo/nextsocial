"use client"

import axios from "axios"


export default function Logout() {

    function handleClick() {
        axios.post('/api/app/logout')
            .then(function(response) {
                const {success} = response.data
                if (success) location.reload()
            }).catch(function (error) {console.log(error)})
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