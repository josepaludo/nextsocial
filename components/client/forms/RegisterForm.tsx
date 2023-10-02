"use client"

import { LoginRegisterRequestForm, LoginRegisterResponseData } from "@/types"
import axios from "axios"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useRef, useState } from "react"
import { Status, Warning, useWarning } from "@/components/client/Warning"
import MediumButton from "@/components/general/MediumButton"
import Input from "@/components/general/Input"
import NarrowForm from "@/components/general/ShortForm"


export default function RegisterForm() {

    const router = useRouter()
    const [canSubmit, setCanSubmit] = useState(true)
    const {status: didRegister, setStatus: setDidRegister} = useWarning() 

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        if (!canSubmit) return
        setCanSubmit(false)
        const {username, email, password1, password2} = e.target as HTMLFormElement
        if (
            username.value === "" ||
            email.value === "" ||
            password1.value === "" ||
            password2.value === ""
        ) return;
        [username, email, password1, password2].forEach(field => field.value = "")
        const data: LoginRegisterRequestForm = {
            username: username.value,
            email: email.value,
            password: password1.value,
        }
        axios.post('/api/register', data).then(function(response) {
            const {success} = response.data as LoginRegisterResponseData
            if (!success) {
                setDidRegister(Status.failure)
                setCanSubmit(true)
                return
            }
            setDidRegister(Status.success)
            setTimeout(() => router.push('/login'), 2000) 
        }).catch(function(error) {
            console.log(error)
            setCanSubmit(true)
        })
    }

    return <>
        <NarrowForm
            className=" mt-10 "
            onSubmit={handleSubmit}
        >
            <Input
                name="username"
                placeholder="Username"
            />
            <RegisterEmailInput className=" mt-3 " />
            <RegisterPasswordsInput />

            <MediumButton
                type="submit"
                content="Register"
                className=" mt-3 "
            />
        </NarrowForm>

        <Warning
            status={didRegister}
            successMessage="Register successful. You will be redirected to login page."
            failureMessage="Register failed. Email already used."
        />
    </>
}

type PasswordWarnings = {isValid: boolean, message: string}[]

function RegisterPasswordsInput() {

    const [pass1, setPass1] = useState("")
    const [pass2, setPass2] = useState("")

    const hasUpperCase = /[A-Z]/.test(pass1)
    const hasLowerCase = /[a-z]/.test(pass1)
    const hasNumber = /[\d]/.test(pass1)
    const hasSymbol = /[^a-zA-Z0-9]/;
    const has8Chars = /.{8,}/.test(pass1)

    const passwordWarnings: PasswordWarnings =[
        {
            isValid: /[A-Z]/.test(pass1),
            message: "Password must contain a uppercase letter."
        },
        {
            isValid: /[a-z]/.test(pass1),
            message: "Password must contain a lowercase letter."
        },
        {
            isValid: /[\d]/.test(pass1),
            message: "Password must contain a number."
        },
        {
            isValid: /[^a-zA-Z0-9]/.test(pass1),
            message: "Password must contain a symbol."
        },
        {
            isValid: /.{8,}/.test(pass1),
            message: "Password must be at least 8 chars long."
        }
    ]

    return <>
        <Input
            name="password1"
            placeholder="Password"
            type="password"
            className="mt-3"
            value={pass1}
            onChange={(e) => setPass1(e.target.value)}
        />
        { passwordWarnings.map((warning, key) => (
            <IncorrectInputWarning
                key={key}
                value={pass1}
                isValid={warning.isValid}
                message={warning.message}
            />
        ))
        }
        <Input
            name="password2"
            placeholder="Repeat password"
            type="password"
            className=" mt-3"
            value={pass2}
            onChange={(e) => setPass2(e.target.value)}
        />
        <IncorrectInputWarning
            value={pass1}
            isValid={pass1 === pass2}
            message={"Passwords don't match."}
        />
    </>
}

function RegisterEmailInput(
    {className}: {className?: string}
) {

    const [email, setEmail] = useState("")
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/
    const isValid = regex.test(email)

    function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value)
    }

    return <>
        <Input
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={handleEmailChange}
            className={className}
        />
        <IncorrectInputWarning
            value={email}
            isValid={isValid}
            message={"Invalid e-mail address."}
        />
    </>
}

function IncorrectInputWarning(
    {isValid, message, value}: {isValid: boolean, message: string, value: string}
) {

    const hide = isValid || value === ""
    if (hide) return

    return (
        <div
            className="bg-red-800 border-2 border-red-600 text-white py-1 px-2 max-w-full rounded-lg mt-3 transition-opacity duration-150 text-xs font-semibold "
        >
            {message}
        </div>
    )
}
