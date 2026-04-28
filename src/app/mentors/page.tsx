import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { ShieldCheck, User } from "lucide-react"

export default async function MentorsPage() {
  const seniors = await prisma.user.findMany({
    where: { role: "SENIOR" },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Nuestros Mentores</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {seniors.map((mentor) => (
          <Link 
            key={mentor.id} 
            href={`/profile/${mentor.id}`}
            className="flex items-center gap-4 p-6 bg-white border border-gray-200 rounded-2xl hover:border-indigo-600 transition-all group"
          >
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <User className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {mentor.name}
                </h3>
                <ShieldCheck className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-sm text-gray-500">Mentor Senior</p>
            </div>
          </Link>
        ))}

        {seniors.length === 0 && (
          <div className="col-span-full text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-500">Todavía no hay mentores registrados.</p>
          </div>
        )}
      </div>
    </div>
  )
}
