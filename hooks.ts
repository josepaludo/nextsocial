import { useEffect, useState } from "react"
import { JWTType } from "./types"
import { getCookie } from "cookies-next"
import jwt from "jsonwebtoken"


export function useToken() {
    const [token, setToken] = useState<null|JWTType>(null)
    useEffect(() => {
        const token = getCookie('accessToken') as string
        const decoded = jwt.decode(token) as JWTType
        setToken(decoded)
    }, [])
    return token
}
