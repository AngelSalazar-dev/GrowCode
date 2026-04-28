"use server"

import { auth } from "@/auth/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createPost(formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error("No autorizado")
  }

  const content = formData.get("content") as string
  const resourceUrl = formData.get("resourceUrl") as string

  if (!content || content.length < 10) {
    throw new Error("El contenido debe tener al menos 10 caracteres")
  }

  await prisma.post.create({
    data: {
      content,
      resourceUrl: resourceUrl || null,
      authorId: session.user.id
    }
  })

  revalidatePath("/feed")
  redirect("/feed")
}
