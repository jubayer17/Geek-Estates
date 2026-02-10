"use server"

import config from "@/app/config"
import { revalidatePath } from "next/cache"

export async function deleteContact(id: string) {
  await fetch(`${config.base_url}/contactInfo/${id}`, {
    method: "DELETE",
  })

  // revalidate this page after delete
  revalidatePath("/contact")
}
