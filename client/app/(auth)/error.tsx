"use client"

import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";
import RefreshBtn from "@/components/ui/errors/RefreshBtn";
import GoHomeBtn from "@/components/ui/errors/GoHomeBtn";
import ErrorIcon from "@/components/ui/errors/ErrorIcon";
import ErrorTitle from "@/components/ui/errors/ErrorTitle";
import ErrorMsg from "@/components/ui/errors/ErrorMsg";

const Error = ({ error, reset }: { error: Error, reset: () => void }) => {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <section>
            <div className="relative min-h-screen w-full">
                <div className="grid min-h-screen px-8">
                    <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
                        <ErrorIcon>
                            <TriangleAlert className="h-6 w-6" />
                        </ErrorIcon>
                        <ErrorTitle title="Oops...Error" />
                        <ErrorMsg msg={error.message} />
                        <div className="flex gap-2">
                            <RefreshBtn onClick={reset} />
                            <GoHomeBtn />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Error