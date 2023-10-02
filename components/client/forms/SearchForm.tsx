"use client"

import Input from "@/components/general/Input";
import SubmitButtonEnd from "@/components/general/SubmitButtonEnd";
import { SearchParam, isSearchParam } from "@/types";
import { useRouter } from "next/navigation";
import {  FormEvent, useState } from "react";


export default function SearchForm(
    {searchParam}: {searchParam?: SearchParam}
) {

    const defaultParam = isSearchParam(searchParam) ?
        searchParam : SearchParam.postContent
    // @ts-ignore
    const [param, setParam] = useState<SearchParam>(defaultParam)
    const router = useRouter()


    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const query = form.query.value
        if (!query) return
        router.push(`/app/search/${param}/${query}`)
    }

    return (
        <form onSubmit={handleSubmit}>
            <ParamButtons param={param} setParam={setParam} />

            <Input placeholder="Search" name="query" />
            <SubmitButtonEnd title="Search" className=" my-3 " />
        </form>
    )
}

function ParamButton({buttonName, searchParam, param, setParam}: {
    buttonName: string,
    searchParam: SearchParam,
    param: SearchParam,
    setParam: Function,
}) {
    const backGround = param === searchParam ? " bg-slate-700 text-white " : "" 
    let border = " border-2 border-slate-700 "
    border += searchParam === SearchParam.userName ? 
        " rounded-s-lg border-s-2 " : " border-s-0 " 
    border += searchParam === SearchParam.groupDescription ? 
        " rounded-e-lg " : ""

    return (
        <button
            onClick={() => setParam(searchParam)}
            className={backGround + border + " text-xs sm:text-sm md:text-base overflow-hidden p-1 grow font-semibold text-slate-900 "}
            type="button"
        >
            {buttonName}
        </button>
    )
}

function ParamButtons({param, setParam}: {param: SearchParam, setParam: Function}) {

    const buttons = [
        { name: "User Name", param: SearchParam.userName },
        { name: "User Bio", param: SearchParam.userBio },
        { name: "Post Title", param: SearchParam.postTitle },
        { name: "Post Content", param: SearchParam.postContent },
        { name: "Group Name", param: SearchParam.groupName },
        { name: "Group Description", param: SearchParam.groupDescription },
    ]

    return <>
        <div className="flex my-3">
            { buttons.map((button, key) => (
                <ParamButton
                    key={key}
                    param={param}
                    setParam={setParam}
                    buttonName={button.name}
                    searchParam={button.param}
                />
            ))
            }

        </div>
    </> 
}