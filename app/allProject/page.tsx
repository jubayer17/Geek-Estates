import AllPropertiesBanner from "@/components/AllProject/AllProjectBanner";
import AllPropertyList from "@/components/AllProject/AllProjectShowGrid";
import AllPropertiesSearch from "@/components/AllProject/AllPropertiesSearch";


export default function AllPage() {
  return (
    <div className="min-h-lvh">
        <AllPropertiesBanner/>
        <AllPropertiesSearch/>
        <AllPropertyList/>
    </div>
  )
}
