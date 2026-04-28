import { Post, User } from "@prisma/client"
import { ExternalLink, Youtube } from "lucide-react"
import { getYouTubeId } from "@/lib/utils"

interface PostCardProps {
  post: Post & { author: User }
}

export default function PostCard({ post }: PostCardProps) {
  const youtubeId = post.resourceUrl ? getYouTubeId(post.resourceUrl) : null

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        {/* Info del Autor */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
            {post.author.name?.[0] || "U"}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{post.author.name}</p>
            <p className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleDateString("es-ES", { 
                day: "numeric", 
                month: "short" 
              })}
            </p>
          </div>
          <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
            post.author.role === "SENIOR" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
          }`}>
            {post.author.role}
          </span>
        </div>

        {/* Contenido del Post */}
        <p className="text-gray-800 mb-4 whitespace-pre-wrap leading-relaxed">
          {post.content}
        </p>

        {/* Resource Preview */}
        {post.resourceUrl && (
          <div className="mt-4 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
            {youtubeId ? (
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <a 
                href={post.resourceUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 hover:bg-gray-100 transition-colors group"
              >
                <div className="p-2 bg-white rounded-md border border-gray-200 text-gray-400 group-hover:text-indigo-600">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{post.resourceUrl}</p>
                  <p className="text-xs text-gray-500">Abrir recurso</p>
                </div>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
