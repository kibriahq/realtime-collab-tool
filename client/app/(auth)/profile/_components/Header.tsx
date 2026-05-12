import LogoutBtn from './ui/LogoutBtn'
import EditBtn from './ui/EditBtn'
import type { Profile } from '@/types/user'
import Avatar from './ui/Avatar'

type Props = {
    profile: Profile,
    handleLogout: () => void,
    setIsEditing: (value: boolean) => void
}

const Header = ({ profile, handleLogout, setIsEditing }: Props) => {
    return (
        <>
            <div className={`bg-linear-to-r from-${profile.color}-500 to-${profile.color}-400 px-6 py-12`}>
            </div>

            <div className="bg-white shadow-sm flex justify-between items-center px-7">
                <div className="flex items-center gap-4 pb-5 pt-1">
                    <Avatar profile={profile} />
                    <div className="py-2">
                        <h2 className="text-2xl font-bold text-slate-700">{profile.name}</h2>
                        <p className="text-slate-500">{profile.email}</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <LogoutBtn onClick={handleLogout} />
                    <EditBtn onClick={() => setIsEditing(true)} />
                </div>
            </div>
        </>
    )
}

export default Header