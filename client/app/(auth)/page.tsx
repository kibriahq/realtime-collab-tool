"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { FileText, Plus, Users, Clock, User, LogOut } from "lucide-react"
import { createDoc, getMyDocs } from "@/api/doc"
import { useRouter } from "next/navigation"

interface Doc {
  id: string
  title: string
  updated_at: string
}

interface EditRequest {
  id: string
  fromUser: string
  docTitle: string
  docId: string
  requestedAt: string
}

const mockDocs: Doc[] = [
  { id: "1", title: "Project Proposal", updatedAt: "2024-01-15" },
  { id: "2", title: "Meeting Notes", updatedAt: "2024-01-14" },
  { id: "3", title: "Research Draft", updatedAt: "2024-01-12" },
]

const mockRequests: EditRequest[] = [
  { id: "1", fromUser: "Alice", docTitle: "Q1 Report", docId: "4", requestedAt: "2024-01-15" },
  { id: "2", fromUser: "Bob", docTitle: "Budget Plan", docId: "5", requestedAt: "2024-01-14" },
]

export default function Home() {
  const [docs, setDocs] = useState<Doc[]>([])
  const [requests, setRequests] = useState<EditRequest[]>(mockRequests)

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
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Collab Tool
          </h1>
          <nav className="flex items-center gap-4">
            <Link
              href="/profile"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-700"
            >
              <User size={18} />
              <span className="hidden sm:inline">Profile</span>
            </Link>
          </nav>
        </div>
      </header>

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
                  <div className="text-sm text-slate-400 mt-1">Last updated: {doc.updated_at}</div>
                </Link>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-800">
              <div className="p-2 bg-amber-100 rounded-xl">
                <Users size={20} className="text-amber-600" />
              </div>
              Edit Requests
            </h2>
            <div className="grid gap-3">
              {requests.length === 0 ? (
                <p className="text-slate-400 py-8 text-center">No pending requests</p>
              ) : (
                requests.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200"
                  >
                    <div className="flex items-center gap-2 text-sm text-amber-700 mb-1">
                      <Clock size={14} />
                      <span className="font-medium">{req.fromUser}</span>
                      <span className="text-amber-600">requested to edit</span>
                      <span className="font-semibold">&quot;{req.docTitle}&quot;</span>
                    </div>
                    <div className="text-xs text-amber-500">Requested: {req.requestedAt}</div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}