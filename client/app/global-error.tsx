"use client"

import { useEffect } from "react"
import { TriangleAlert } from "lucide-react"

const GlobalError = ({ error, reset }: { error: Error, reset: () => void }) => {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <section>
            <div className="relative min-h-screen w-full">
                <div className="grid min-h-screen px-8"><div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
                    <button className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12 max-w-[48px] h-12 max-h-[48px] rounded-lg text-sm bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none bg-gray-900" type="button">
                        <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                            <TriangleAlert className="h-6 w-6" />
                        </span>
                    </button>
                    <h1 className="block antialiased tracking-normal font-sans text-4xl font-semibold leading-tight text-blue-gray-900 mt-5 !leading-snug lg:text-5xl">
                        Oops...Error
                    </h1>
                    <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-gray-700 mt-4 mb-6 w-full md:max-w-full lg:mb-8 lg:max-w-3xl">
                        We're Experiencing Technical Difficulties
                    </p>
                    <div className="flex gap-2">
                        <button onClick={reset} className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-full px-4 md:w-[9rem]" type="button">
                            Refresh
                        </button>
                        {/* <Link href="/" className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-100 text-gray-900 shadow-md border border-gray-500 shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-full px-4 md:w-[9rem]" type="button">
                            Go to Home
                        </Link> */}

                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}

export default GlobalError