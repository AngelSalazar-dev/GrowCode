import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import MentorRequestButton from "@/components/mentorship/MentorRequestButton"
import { ShieldCheck, User as UserIcon, Calendar } from "lucide-react"

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      posts: {
        include: { author: true },
        orderBy: { createdAt: "desc" }
      }
    }
  })

  if (!user) notFound()

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Header Perfil */}
      <div className="bg-white rounded-3xl p-8 border border-gray-200 mb-10 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-3xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
              <UserIcon className="w-12 h-12" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                {user.role === "SENIOR" && <ShieldCheck className="w-6 h-6 text-amber-500" />}
              </div>
              <div className="flex items-center gap-4 text-gray-500 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Se unió en {new Date(user.createdAt).getFullYear()}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  user.role === "SENIOR" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                }`}>
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <MentorRequestButton seniorId={user.id} seniorRole={user.role} />
          </div>
        </div>
      </div>

      {/* Posts del Usuario */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recursos compartidos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {user.posts.length > 0 ? (
          user.posts.map((post) => (
            // Reutilizamos el PostCard pasándole el autor
            <div key={post.id} className="h-full">
              {/* @ts-ignore */}
              <PostCard post={post} />
            </div>
          ))
        ) : (
          <div className="col-span-full py-10 text-center text-gray-400 italic">
            Este usuario aún no ha compartido recursos.
          </div>
        )}
      </div>
    </div>
  )
}

// Necesitamos importar PostCard
import PostCard from "@/components/feed/PostCard"
