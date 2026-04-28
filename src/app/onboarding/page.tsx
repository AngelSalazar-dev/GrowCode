import { auth } from "@/auth/auth"
import { redirect } from "next/navigation"
import { updateUserRole } from "@/actions/user"
import { Role } from "@prisma/client"
import { GraduationCap, Briefcase } from "lucide-react"

export default async function OnboardingPage() {
  const session = await auth()

  if (!session) redirect("/api/auth/signin")
  
  // Si ya tiene un rol que no sea el por defecto (si hubiera uno), 
  // pero aquí asumimos que el onboarding es obligatorio si es la primera vez.

  return (
    <div className="max-w-2xl mx-auto py-20 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Bienvenido a GrowCode</h1>
        <p className="text-gray-600">Para comenzar, dinos cuál es tu perfil actual. Esto nos ayudará a personalizar tu experiencia.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form action={async () => {
          "use server"
          await updateUserRole(Role.JUNIOR)
        }}>
          <button className="w-full p-8 bg-white border-2 border-gray-100 rounded-2xl text-left hover:border-indigo-600 transition-all group">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600">Soy Junior</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Busco aprender, recibir mentoría y encontrar recursos para acelerar mi aprendizaje.</p>
          </button>
        </form>

        <form action={async () => {
          "use server"
          await updateUserRole(Role.SENIOR)
        }}>
          <button className="w-full p-8 bg-white border-2 border-gray-100 rounded-2xl text-left hover:border-amber-600 transition-all group">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-amber-600">Soy Senior</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Quiero compartir mi experiencia, mentorear a otros y contribuir a la comunidad.</p>
          </button>
        </form>
      </div>
    </div>
  )
}
