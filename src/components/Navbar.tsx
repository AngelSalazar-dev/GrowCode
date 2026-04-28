import Link from "next/link"
import { auth, signOut } from "@/auth/auth"
import { LayoutDashboard, Users, User, LogOut, Rocket } from "lucide-react"

export default async function Navbar() {
  const session = await auth()

  return (
    <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
          <Rocket className="w-6 h-6" />
          <span>GrowCode</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/feed" className="text-gray-600 hover:text-indigo-600 flex items-center gap-1 text-sm font-medium transition-colors">
            <LayoutDashboard className="w-4 h-4" />
            Feed
          </Link>
          <Link href="/mentors" className="text-gray-600 hover:text-indigo-600 flex items-center gap-1 text-sm font-medium transition-colors">
            <Users className="w-4 h-4" />
            Mentores
          </Link>

          {session?.user ? (
            <div className="flex items-center gap-4">
              <Link href={`/profile/${session.user.id}`} className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 hover:ring-2 hover:ring-indigo-200 transition-all">
                <User className="w-4 h-4" />
              </Link>
              <form action={async () => {
                "use server"
                await signOut()
              }}>
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <LogOut className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            <Link href="/api/auth/signin" className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
