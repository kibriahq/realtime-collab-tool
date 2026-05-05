"use client"

import { useEffect, useState } from "react"
import { FileText, Plus, Users } from "lucide-react"
import { createDoc, getMyDocs, getSharedDocs } from "@/api/doc"
import { useRouter } from "next/navigation"
import Navbar from "@/components/ui/Navbar"
import { Doc } from "@/lib/types/doc";
import DocList from "@/components/ui/DocList"
import { toast } from "sonner"

export default function Home() {
  const [docs, setDocs] = useState<Doc[]>([])
  const [shareDocs, setShareDocs] = useState<Doc[]>([])

  const router = useRouter();

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const docs = await getMyDocs();
        setDocs(docs);
      } catch (error: any) {
        toast.error(error?.response.data.msg)
      }
    }
    fetchDocs();
  }, [])

  useEffect(() => {
    const fetchSharedDocs = async () => {
      try {
        const docs = await getSharedDocs();
        setShareDocs(docs);
      } catch (error: any) {
        toast.error(error?.response.data.msg)
      }
    }
    fetchSharedDocs();
  }, [])

  const createNewDoc = async () => {
    try {
      const d = await createDoc();
      setDocs(prev => [...prev, d]);
      router.push(`/docs/${d.id}`);
      toast.success("Document created successfully");
    } catch (error: any) {
      toast.error(error?.response.data.msg)
    }
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">
      <Navbar />

      <div className="container mx-auto px-6 py-8">
        <section className="mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="w-full sm:w-auto">
              <h1 className="text-3xl font-bold text-slate-800">Welcome to Collab Tool!</h1>
              <p className="text-slate-600 py-2 pb-4 md:pb-0">Create Share and Collaborate on documents with your team</p>
            </div>
            <button
              onClick={createNewDoc}
              className="group w-full sm:w-fit flex items-center gap-3 bg-white text-indigo-600 px-5 py-3 rounded-2xl border border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              <div className="p-2 bg-indigo-600/20 rounded-xl">
                <Plus size={24} />
              </div>
              <span className="text-lg font-semibold">Create New</span>
            </button>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-8">
          <DocList
            docs={docs}
            title="My Documents"
            icon={<FileText size={20} className="text-indigo-600" />}
            iconBg="indigo"
          />

          <DocList
            docs={shareDocs}
            title="Shared Documents"
            icon={<Users size={20} className="text-amber-600" />}
            iconBg="amber"
          />

        </div>
      </div>
    </main>
  )
}