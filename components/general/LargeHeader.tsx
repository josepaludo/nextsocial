
export default function LargeHeader(
    {content, className}: {content: string, className?: string}
) {

    return <>
        <h1 className={"text-3xl font-semibold " + className}>
            {content}
        </h1>
    </>
}