
export default function Error(
    {message}: {message: string}
) {
    return <>
        <h1 className="my-5 font-light">
            Error: {message}
        </h1>
    </>
}