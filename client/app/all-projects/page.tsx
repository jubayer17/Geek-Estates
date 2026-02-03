import AllPropertiesBanner from "@/components/all-projects/AllProjectBanner";
import AllPropertiesSearch from "@/components/all-projects/AllPropertiesSearch";
import AllProjectShowGrid from "@/components/all-projects/AllProjectShowGrid";
import AllProjectsCTA from "@/components/all-projects/AllProjectsCTA";

async function getPageData() {
  try {
    const res = await fetch('http://localhost:4001/projects/page', {
      cache: 'no-store', // Disable cache for real-time updates
    });
    if (!res.ok) return undefined;
    return res.json();
  } catch (error) {
    console.error('Failed to fetch projects page data:', error);
    return undefined;
  }
}

export default async function AllPage() {
  const pageData = await getPageData();

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-gray-900 selection:bg-[#C5A059] selection:text-white">
      <AllPropertiesBanner data={pageData} />
      <AllPropertiesSearch />
      <AllProjectShowGrid />
      <AllProjectsCTA data={pageData} />
    </main>
  );
}
