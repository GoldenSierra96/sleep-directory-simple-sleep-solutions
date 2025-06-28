import { getSession } from "@auth0/nextjs-auth0"
import { prisma } from "./db"

export async function getCurrentUser() {
  const session = await getSession()

  if (!session?.user) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      badges: true,
    },
  })

  return user
}

export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Authentication required")
  }

  return user
}

export async function requireRole(role: "ADMIN" | "MODERATOR") {
  const user = await requireAuth()

  if (!user.roles.includes(role)) {
    throw new Error("Insufficient permissions")
  }

  return user
}
