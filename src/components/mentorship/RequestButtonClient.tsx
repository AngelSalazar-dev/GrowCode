"use client"

import { useTransition } from "react"
import { createMentorshipRequest } from "@/actions/mentorship"
import { UserCheck, UserPlus } from "lucide-react"

interface RequestButtonClientProps {
  seniorId: string
  hasPendingRequest: boolean
}

export default function RequestButtonClient({ seniorId, hasPendingRequest }: RequestButtonClientProps) {
  const [isPending, startTransition] = useTransition()

  const handleRequest = () => {
    startTransition(async () => {
      try {
        await createMentorshipRequest(seniorId)
        alert("Solicitud enviada con éxito")
      } catch (error: any) {
        alert(error.message)
      }
    })
  }

  if (hasPendingRequest) {
    return (
      <button 
        disabled 
        className="flex items-center gap-2 bg-gray-100 text-gray-500 px-4 py-2 rounded-full cursor-not-allowed font-medium border border-gray-200"
      >
        <UserCheck className="w-4 h-4" />
        Solicitud Pendiente
      </button>
    )
  }

  return (
    <button
      onClick={handleRequest}
      disabled={isPending}
      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full transition-colors font-medium shadow-sm disabled:opacity-50"
    >
      <UserPlus className="w-4 h-4" />
      {isPending ? "Enviando..." : "Solicitar Mentoría"}
    </button>
  )
}
