

export default function GlowingBackGround(
    {children}: {children: React.ReactNode}
) {
    return <>
        <div
            className="px-4 py-1 rounded-xl bg-yellow-100 hover:bg-yellow-400 transition-colors duration-500"

        >
            {children}
        </div>
    </>
}