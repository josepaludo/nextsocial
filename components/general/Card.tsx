type CardType = {
    children: React.ReactNode,
    className?: string
}

export default function Card(
    {children, className}: CardType 
) {
    const classNames = className ? className : " bg-white "
    return (
        <div
            className={" shadow rounded-lg px-10 py-7 my-3 " + classNames}
        >
            {children}
        </div>
    )
}