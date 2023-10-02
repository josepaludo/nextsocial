"use client"

import Link from "next/link";
import { useToken } from "@/hooks";
import { navBarHeight } from "@/app/style.classes";


export default function NavBar() {

    const token = useToken()

    return (
        <nav
            className="bg-slate-900 text-white p-3 absolute top-0 w-full"
            style={{height: navBarHeight}}
        >
            <div className="mx-auto max-w-4xl flex items-center justify-between">
                <Link
                    href= { token ? "/app" : "/" }
                    className="font-bold text-lg"
                >
                    Social
                </Link>

                { token ?
                    <Link
                        href="/app/profile"
                        className="font-light"
                    >
                        Profile
                    </Link>
                :
                    <div className="flex">
                        <Link
                            href="/login"
                            className="me-3 font-light"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="font-light"
                        >
                            Register
                        </Link>
                    </div>
                }
            </div>
        </nav>
    )
}
