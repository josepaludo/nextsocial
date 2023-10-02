"use client"

import { FormEvent, useState } from "react"
import { LoginRegisterRequestForm, LoginRegisterResponseData } from "@/types"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Status, Warning, useWarning } from "@/components/client/Warning"
import MediumButton from "@/components/general/MediumButton"
import NarrowForm from "@/components/general/ShortForm"
import Input from "@/components/general/Input"
import { useToken } from "@/hooks"


export default function LoginForm() {

    const router = useRouter()
    const [canSubmit, setCanSubmit] = useState(true)
    const {status: didLogin, setStatus: setDidLogin} = useWarning()

    const token = useToken()
    if (token) router.push('/app')

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        if (!canSubmit) return
        setCanSubmit(false)
        const {username, email, password} = e.target as HTMLFormElement
        if (
            username.value === ""||
            email.value === "" ||
            password.value === ""
        ) return
        const data: LoginRegisterRequestForm = {
            username: username.value,
            email: email.value,
            password: password.value
        };
        [username, email, password].forEach(field => field.value = "")
        axios.post('/api/login', data)
            .then( function(response) {
                const {success} = response.data as LoginRegisterResponseData
                if (!success) {
                    setDidLogin(Status.failure)
                    setCanSubmit(true)
                    return
                }
                setDidLogin(Status.success)
                setTimeout(() => location.reload(), 1000)
            }).catch( function(error) {
                console.log(error)
                setCanSubmit(true)
            })
    }

    return <>
        <NarrowForm
            className=" mt-10"
            onSubmit={handleSubmit}
        >
            <Input
                name="username"
                placeholder="Username"
            />
            <Input
                className=" my-3"
                name="email"
                placeholder="E-mail"
            />
            <Input
                name="password"
                type="password"
                placeholder="Password"
            />
            <MediumButton
                type="submit"
                content={canSubmit ? "Login" : "Loading"}
                className={" mt-3 "+ (canSubmit ? "" : " opacity-50 ")}
            />
        </NarrowForm>
        <Warning
            status={didLogin}
            failureMessage="Login failed. User doesn't exist or incorrect username, email or password."
            successMessage="Login succeeded. You will be redirected to the main page."
        />
    </>
}
