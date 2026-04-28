import { createPost } from "@/actions/posts"
import { auth } from "@/auth/auth"
import { redirect } from "next/navigation"
import { Send, Link as LinkIcon } from "lucide-react"

export default async function NewPostPage() {
  const session = await auth()
  if (!session) redirect("/api/auth/signin")

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Compartir Recurso</h1>
      
      <form action={createPost} className="space-y-6 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ¿Qué quieres compartir?
          </label>
          <textarea
            name="content"
            required
            rows={4}
            className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none"
            placeholder="Describe el recurso, por qué es útil o qué aprendiste..."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-gray-400" />
            URL del Recurso (opcional)
          </label>
          <input
            type="url"
            name="resourceUrl"
            className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="https://youtube.com/... o https://blog.com/..."
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-100"
        >
          <Send className="w-5 h-5" />
          Publicar ahora
        </button>
      </form>
    </div>
  )
}
