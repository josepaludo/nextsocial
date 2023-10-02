import { useState } from "react"


export enum Status { null, success, failure }
export type WarningType = {
    status: Status
    successMessage: string
    failureMessage: string
}

export function Warning(
    {status, successMessage, failureMessage }: WarningType
) {
    const opacity =
        status === Status.failure ?
        " opacity-1 bg-red-800"
    :
        status === Status.success ?
        " opacity-1 bg-green-800"
    :
        " opacity-0"

    return (
        <div className={"rounded-xl text-white text-center font-semibold text-xl p-5 mt-3 mx-auto w-96 transition-opacity duration-1000 " + opacity}>
            { status === Status.success ?
                successMessage
            :
                failureMessage
            }
        </div>
    )
}

export function useWarning() {
    const [status, setStatus] = useState<Status>(Status.null)
    return {status, setStatus}
}