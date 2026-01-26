import { notFound } from "next/navigation"
import careersData from "../../../public/data/career.json"
import JobDetails from "@/components/Career.tsx/JobDetails"

// Ensure dynamic rendering if desired, though Next.js might cache by default.
// export const dynamic = 'force-dynamic' 

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const job = careersData.find((j) => j.id.toString() === id)

  if (!job) {
    notFound()
  }

  return (
    <div className="bg-white min-h-screen">
      <JobDetails job={job} />
    </div>
  )
}
