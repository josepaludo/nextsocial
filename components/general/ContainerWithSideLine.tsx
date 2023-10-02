
export default function ContainerWithSideLine(
    {children, className}: {children: React.ReactNode, className?: string}
) {

    return (
        <div className={"flex "+className}>
            <SideLine />
            <div className="grow">
                {children}
            </div>
        </div>
    ) 
}

function SideLine() {
    return (
        <div className="me-0.5 px-0.5 sm:me-1 sm:px-1 md:me-2 md:px-2 hover:cursor-pointer">
            <div className="h-full w-0.5 bg-slate-600 rounded-full" />
        </div>
    )
}