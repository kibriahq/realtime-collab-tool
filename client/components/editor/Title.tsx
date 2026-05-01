import { ArrowBigLeftDash, Check, House, LayoutGrid, SquarePen, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function Title({ title }: { title: string }) {
    const [isEdit, setIsEdit] = useState(false);
    const [input, setInput] = useState(title);

    const handleSubmit = () => {
        console.log(input);
        setIsEdit(false);
    }

    return (
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-medium mb-2">
                {isEdit === false ? (
                    <span className="flex items-center gap-3">
                        {input}
                        <span onClick={() => setIsEdit(!isEdit)} className="inline text-slate-400 hover:text-slate-500 cursor-pointer"><SquarePen size={20} /></span>
                    </span>
                ) : (
                    <div className="flex items-center gap-2">
                        <input onChange={(e) => setInput(e.target.value)} type="text" value={input} className="border border-slate-400 rounded" />
                        <button onClick={handleSubmit} className="p-1 bg-green-700 hover:bg-green-800 text-white rounded cursor-pointer"><Check /></button>
                        <button onClick={() => setIsEdit(!isEdit)} className="p-1 bg-red-700 hover:bg-red-800 text-white rounded cursor-pointer"><X /></button>
                    </div>
                )
                }
            </h1 >
            <Link href={'/'}><ArrowBigLeftDash /></Link>
        </div>
    )
}

export default Title