import { addPermission, userSearch } from "@/api/docPermission";
import { Check, Plus } from "lucide-react";
import { useState } from "react";

const AddUser = ({ docId }: { docId: string }) => {
    const [input, setInput] = useState("");
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [users, setUsers] = useState<any[]>([]);

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);

        if (!value) return setUsers([]);
        const users = await userSearch(value, docId);
        setUsers(users);
    }

    console.log(users);


    const handleAddUser = () => {
        setIsAddUserOpen(!isAddUserOpen);
    }

    const handleAddPermission = async (userId: string) => {
        setUsers((prev) => prev.map((user: any) => {
            if (user.id === userId) {
                return { ...user, isAdded: true };
            }
            return user;
        }));
        await addPermission(docId, userId);
    }

    return (
        <div className="relative group">
            <div onClick={handleAddUser} className="w-10 h-10 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center cursor-pointer border-dashed border-2 border-slate-400">
                <span className="text-slate-500 hover:text-slate-600 font-semibold text-xl">
                    <Plus />
                </span>
            </div>
            <div className={`absolute top-11 right-0 w-[250px] h-[300px] bg-slate-100 rounded-full z-40 border border-slate-300 p-2 ${isAddUserOpen ? 'flex' : 'hidden'}`}>
                <div className="flex flex-col items-center justify-start h-full">
                    <input value={input} onChange={handleSearch} type="text" className="border border-slate-200 rounded p-2 mt-2 w-full" placeholder="Search email..." />

                    <div className="flex flex-col items-center justify-center mt-4 gap-2 w-full px-4">
                        {/* user items */}
                        {users.length > 0 ? users.map((user: any) => (
                            <div className="flex items-center justify-between gap-2 w-full">
                                <div className="flex items-start flex-col">
                                    <p className="text-slate-500 font-semibold text-md">{user.name}</p>
                                    <p className="text-slate-500 font-body text-sm">{user.email}</p>
                                </div>
                                {user.isAdded ? (
                                    <button className="bg-slate-200 text-slate-500 p-1 rounded">
                                        <Check size={20} />
                                    </button>
                                ) : (
                                    <button onClick={() => handleAddPermission(user.id)} className="bg-purple-200 text-purple-500 hover:bg-purple-300 p-1 rounded">
                                        <Plus size={20} />
                                    </button>
                                )}
                            </div>
                        )) : (
                            <div className="flex items-center justify-center gap-2 w-full">
                                <p className="text-slate-500 font-semibold text-md">No user found</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUser