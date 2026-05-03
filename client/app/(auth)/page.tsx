"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { FileText, Plus, Users, FileWarning } from "lucide-react"
import { createDoc, getMyDocs } from "@/api/doc"
import { useRouter } from "next/navigation"
import Navbar from "@/components/ui/Navbar"
import { timeFormater } from "@/utils/timeFormater"

type Doc = {
  id: string
  name: string
  updated_at: string
}

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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />

      <div className="container mx-auto px-6 py-8">
        <section className="mb-10">
          <button
            onClick={createNewDoc}
            className="group flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="p-2 bg-white/20 rounded-xl">
              <Plus size={24} />
            </div>
            <span className="text-lg font-semibold">Create New Document</span>
          </button>
        </section>

        <div className="grid lg:grid-cols-2 gap-8">
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-800">
              <div className="p-2 bg-indigo-100 rounded-xl">
                <FileText size={20} className="text-indigo-600" />
              </div>
              My Documents
            </h2>
            <div className="grid gap-3">
              {docs.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/docs/${doc.id}`}
                  className="group p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all duration-200"
                >
                  <div className="font-semibold text-slate-700 group-hover:text-indigo-700">
                    {doc.name}
                  </div>
                  <div className="text-sm text-slate-400 mt-1">Last updated: {timeFormater(doc.updated_at)}</div>
                </Link>
              ))}

              {docs.length === 0 && (
                <p className="text-slate-400 py-8 text-center">No documents found</p>
              )}
            </div>
          </section>

          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-800">
              <div className="p-2 bg-amber-100 rounded-xl">
                <Users size={20} className="text-amber-600" />
              </div>
              Shared Documents
            </h2>
            <div className="grid gap-3">
              <div
                className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200"
              >
                <div className="flex items-center gap-2 text-sm text-amber-700 mb-1">
                  <FileWarning size={14} />
                  <span className="font-medium">Notice:</span>
                  <span className="text-amber-600">Still working on the features!</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}