"use server"

import { auth } from "@/auth/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

enum Role {
  JUNIOR = "JUNIOR",
  SENIOR = "SENIOR"
}

export async function updateUserRole(role: Role) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("No autorizado")
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { role }
  })

  revalidatePath("/")
  redirect("/feed")
}
