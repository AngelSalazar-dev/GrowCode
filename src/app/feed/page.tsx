import { prisma } from "@/lib/prisma"
import PostCard from "@/components/feed/PostCard"
import { auth } from "@/auth/auth"
import { redirect } from "next/navigation"

import Link from "next/link"
import { Plus } from "lucide-react"

export default async function FeedPage() {
  const session = await auth()
  if (!session) redirect("/api/auth/signin")

  const posts = await prisma.post.findMany({
    include: {
      author: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Feed de Recursos</h1>
        <Link 
          href="/feed/new" 
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-bold transition-all shadow-md shadow-indigo-100"
        >
          <Plus className="w-4 h-4" />
          Compartir
        </Link>
      </div>

      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-500">Aún no hay recursos compartidos.</p>
          </div>
        )}
      </div>
    </div>
  )
}
