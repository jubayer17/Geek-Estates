import { notFound } from "next/navigation"
import JobDetails from "@/components/career/JobDetails"

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  try {
    const res = await fetch(`https://geek-estates.onrender.com/career/jobs/${id}`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        notFound();
    }

    const job = await res.json();

    return (
        <div className="bg-white min-h-screen">
        <JobDetails job={job} />
        </div>
    )
  } catch (error) {
    notFound();
  }
}
