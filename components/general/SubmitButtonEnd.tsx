
export default function SubmitButtonEnd(
    {title, className}: {title: string, className?: string}
) {

    return (
        <div className="flex justify-end">
            <button
                className={"rounded-full bg-slate-900 text-white py-2 font-semibold hover:bg-slate-300 hover:text-slate-900 w-40 "+className}
                type="submit"
            >
                {title}
            </button>
        </div>
    )
}