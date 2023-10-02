
export default function Hr(
    {className}: {className?: string}
) {
    return (
        <hr className={" border-gray-300 "+className} />
    )
}