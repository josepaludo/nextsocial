
export default function SplitedContent(
    {content}: {content: string}
) {
    return <>
        {content.split("\n").map((section, key) => (
            <p key={key}>{section}</p>
        ))}
    </>
}