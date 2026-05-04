"use client"

import { useEffect, useState } from "react"
import { FileText, Plus, Users } from "lucide-react"
import { createDoc, getMyDocs, getSharedDocs } from "@/api/doc"
import { useRouter } from "next/navigation"
import Navbar from "@/components/ui/Navbar"
import { Doc } from "@/lib/types/doc";
import DocList from "@/components/ui/DocList"

export default function Home() {
  const [docs, setDocs] = useState<Doc[]>([])
  const [shareDocs, setShareDocs] = useState<Doc[]>([])

  const router = useRouter();

  useEffect(() => {
    const fetchDocs = async () => {
      const docs = await getMyDocs();
      setDocs(docs);
    }
    fetchDocs();
  }, [])

  useEffect(() => {
    const fetchSharedDocs = async () => {
      const docs = await getSharedDocs();
      setShareDocs(docs);
    }
    fetchSharedDocs();
  }, [])

  const createNewDoc = async () => {
    try {
      const d = await createDoc();
      setDocs(prev => [...prev, d]);
      router.push(`/docs/${d.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">
      <Navbar />

      <div className="container mx-auto px-6 py-8">
        <section className="mb-10">
          <button
            onClick={createNewDoc}
            className="group flex items-center gap-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="p-2 bg-white/20 rounded-xl">
              <Plus size={24} />
            </div>
            <span className="text-lg font-semibold">Create New Document</span>
          </button>
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