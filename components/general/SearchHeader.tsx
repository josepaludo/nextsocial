
export default function SearchHeader(
    {children}: {children: React.ReactNode}
) {

    return <>
        <h1 className="text-2xl">
            {children}
        </h1>
    </>
}