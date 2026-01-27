import AllPropertiesBanner from "@/components/all-projects/AllProjectBanner";
import AllPropertiesSearch from "@/components/all-projects/AllPropertiesSearch";
import AllProjectShowGrid from "@/components/all-projects/AllProjectShowGrid";
import AllProjectsCTA from "@/components/all-projects/AllProjectsCTA";

export default function AllPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-gray-900 selection:bg-[#C5A059] selection:text-white">
      <AllPropertiesBanner />
      <AllPropertiesSearch />
      <AllProjectShowGrid />
      <AllProjectsCTA />
    </main>
  );
}
