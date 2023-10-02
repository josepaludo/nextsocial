import { navBarHeight } from "@/app/style.classes";
import SideBar from "@/components/server/sidebar/SideBar";


export default function Layout(
    {children}: {children: React.ReactNode}
) {

    return (
        <div
            className='h-screen flex max-w-4xl mx-auto overflow-scroll '
            style={{paddingTop: navBarHeight, boxSizing: "border-box"}}
        >
            <SideBar className="h-full" />

            <div className='overflow-scroll flex-grow p-2 sm:p-5 md:p-10'>
                {children}
            </div>
        </div>
    )
}