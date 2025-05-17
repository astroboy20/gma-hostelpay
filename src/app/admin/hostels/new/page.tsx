"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function NewHostelRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.push("/admin/hostels/new/edit")
  }, [router])

  return null
}
