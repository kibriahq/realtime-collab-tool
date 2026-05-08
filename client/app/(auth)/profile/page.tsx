"use client"

import { useEffect, useState } from "react"
import { User, Mail, Save, Loader2, Palette } from "lucide-react"
import Navbar from "@/components/ui/Navbar"
import { SubmitHandler, useForm } from "react-hook-form"
import { getProfile, updateProfile } from "@/api/user"
import { toast } from "sonner"
import { useStoreActions } from "easy-peasy"

type Profile = {
  name: string
  email: string
  color: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({ name: "", email: "", color: "" })
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, watch, reset, setError, formState: { errors } } = useForm<Profile>({ defaultValues: profile });

  const color = watch("color");

  const { setUser } = useStoreActions((state: any) => state.auth);

  useEffect(() => {
    setProfile((prev) => ({
      ...prev,
      color
    }));
  }, [color]);



  useEffect(() => {

    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile({
          name: data.name || "",
          email: data.email || "",
          color: data.color || "amber"
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    reset(profile);
  }, [profile]);

  const submitProfile: SubmitHandler<Profile> = async (data) => {
    setIsSaving(true);

    try {
      await updateProfile(data);
      setProfile(data);
      toast.success("Profile updated successfully!")
      setIsEditing(false)
      setUser(data);
    } catch (error: any) {
      // toast.error("Failed to update profile")

      Object.entries(error.response.data.errors || {}).forEach(([path, { msg }]) => {

        setError(path as keyof Profile, {
          type: "server",
          message: msg
        })
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">
      <Navbar />

      <div className="flex items-center gap-2 hidden">
        {/* Amber */}
        <div className="bg-linear-to-r from-amber-500 to-amber-400 w-20 h-20">
          <div className="bg-amber-200 text-amber-500">
            <span className="text-amber-500 font-semibold text-4xl">J</span>
          </div>
        </div>

        {/* Blue */}
        <div className="bg-linear-to-r from-blue-500 to-blue-400 w-20 h-20">
          <div className="bg-blue-200 text-blue-500">
            <span className="text-blue-500 font-semibold text-4xl">J</span>
          </div>
        </div>

        {/* Green */}
        <div className="bg-linear-to-r from-green-500 to-green-400 w-20 h-20">
          <div className="bg-green-200 text-green-500">
            <span className="text-green-500 font-semibold text-4xl">J</span>
          </div>
        </div>

        {/* Red */}
        <div className="bg-linear-to-r from-red-500 to-red-400 w-20 h-20">
          <div className="bg-red-200 text-red-500">
            <span className="text-red-500 font-semibold text-4xl">J</span>
          </div>
        </div>

        {/* Purple */}
        <div className="bg-linear-to-r from-purple-500 to-purple-400 w-20 h-20">
          <div className="bg-purple-200 text-purple-500">
            <span className="text-purple-500 font-semibold text-4xl">J</span>
          </div>
        </div>

        {/* Pink */}
        <div className="bg-linear-to-r from-pink-500 to-pink-400 w-20 h-20">
          <div className="bg-pink-200 text-pink-500">
            <span className="text-pink-500 font-semibold text-4xl">J</span>
          </div>
        </div>

        {/* Orange */}
        <div className="bg-linear-to-r from-orange-500 to-orange-400 w-20 h-20">
          <div className="bg-orange-200 text-orange-500">
            <span className="text-orange-500 font-semibold text-4xl">J</span>
          </div>
        </div>

        {/* Yellow */}
        <div className="bg-linear-to-r from-yellow-500 to-yellow-400 w-20 h-20">
          <div className="bg-yellow-200 text-yellow-500">
            <span className="text-yellow-500 font-semibold text-4xl">J</span>
          </div>
        </div>

        {/* Cyan */}
        <div className="bg-linear-to-r from-cyan-500 to-cyan-400 w-20 h-20">
          <div className="bg-cyan-200 text-cyan-500">
            <span className="text-cyan-500 font-semibold text-4xl">J</span>
          </div>
        </div>

        {/* Indigo */}
        <div className="bg-linear-to-r from-indigo-500 to-indigo-400 w-20 h-20">
          <div className="bg-indigo-200 text-indigo-500">
            <span className="text-indigo-500 font-semibold text-4xl">J</span>
          </div>
        </div>

        {/* Violet */}
        <div className="bg-linear-to-r from-violet-500 to-violet-400 w-20 h-20">
          <div className="bg-violet-200 text-violet-500">
            <span className="text-violet-500 font-semibold text-4xl">J</span>
          </div>
        </div>

        {/* Pink */}
        <div className="bg-linear-to-r from-pink-500 to-pink-400 w-20 h-20">
          <div className="bg-pink-200 text-pink-500">
            <span className="text-pink-500 font-semibold text-4xl">J</span>
          </div>
        </div>

        {/* Purple */}
        <div className="bg-linear-to-r from-purple-500 to-purple-400 w-20 h-20">
          <div className="bg-purple-200 text-purple-500">
            <span className="text-purple-500 font-semibold text-4xl">J</span>
          </div>
        </div>


        {/* Rose */}
        <div className="bg-linear-to-r from-rose-500 to-rose-400 w-20 h-20">
          <div className="bg-rose-200 text-rose-500">
            <span className="text-rose-500 font-semibold text-4xl">J</span>
          </div>
        </div>

      </div>

      <div className="container mx-auto px-6 py-8 max-w-3xl">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

          <div className={`bg-linear-to-r from-${profile.color}-500 to-${profile.color}-400 px-6 py-12`}>
          </div>
          <div className="bg-white shadow-sm flex justify-between items-center px-7">
            <div className="flex items-center gap-4 pb-5 pt-1">
              <div className="w-20 h-15 relative">
                <div className={`absolute bottom-0 w-20 h-20 rounded-full bg-${profile.color}-200 flex items-center justify-center cursor-pointer`}>
                  <span className={`text-${profile.color}-500 font-semibold text-4xl`}>{profile.name.charAt(0)}</span>
                </div>
              </div>
              <div className="py-2">
                <h2 className="text-2xl font-bold text-slate-700">{profile.name}</h2>
                <p className="text-slate-500">{profile.email}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center justify-center gap-2 bg-white text-slate-500 border border-slate-400 px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all text-sm"
              >
                {/* <User size={18} /> */}
                Change Password
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-900/90 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all text-sm"
              >
                {/* <User size={18} /> */}
                Edit Profile
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(submitProfile)}>
            <div className="p-6 space-y-6">

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    Name
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      {...register("name", { required: "Name is required" })}
                      disabled={!isEditing}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all disabled:text-slate-500"
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      disabled={!isEditing}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all disabled:text-slate-500"
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Color
                </label>
                <div className="relative">
                  <Palette size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    {...register("color", { required: "Color is required" })}
                    disabled={!isEditing}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all disabled:text-slate-500"
                  >
                    <option value="amber">Amber</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="red">Red</option>
                    <option value="purple">Purple</option>
                    <option value="pink">Pink</option>
                    <option value="orange">Orange</option>
                    <option value="yellow">Yellow</option>
                    <option value="cyan">Cyan</option>
                    <option value="indigo">Indigo</option>
                    <option value="violet">Violet</option>
                    <option value="fuchsia">Fuchsia</option>
                    <option value="rose">Rose</option>
                    <option value="lime">Lime</option>
                    <option value="emerald">Emerald</option>
                    <option value="teal">Teal</option>
                    <option value="sky">Sky</option>
                    <option value="slate">Slate</option>
                    <option value="gray">Gray</option>
                    <option value="zinc">Zinc</option>
                    <option value="neutral">Neutral</option>
                    <option value="stone">Stone</option>
                  </select>
                  {errors.color && <p className="text-red-500">{errors.color.message}</p>}
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              {isEditing && (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-xl hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-slate-600 to-slate-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-50"
                  >
                    {isSaving ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Save size={18} />
                    )}
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </form>

        </div>
      </div>
    </main >
  )
}