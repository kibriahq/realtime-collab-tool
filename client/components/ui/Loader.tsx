import React from 'react'

const Loader = () => {
    return (
        <div className="h-screen max-w-screen flex items-center justify-center">
            <div role="status"
                className="border-24 border-solid border-t-[#FF3D00] border-r-[#FF3D00] border-b-slate-900 border-l-slate-900 relative animate-spin h-10 w-10 rounded-[100px]">
                <div
                    className="absolute w-3 h-3 bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[125%]">
                </div>
                <span className="sr-only">Loading…</span>
            </div>
        </div>
    )
}

export default Loader