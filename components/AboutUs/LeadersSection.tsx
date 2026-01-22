import Leaders from "./Leaders";
import leadersData from "../../public/data/leaders.json";

export default function LeadersSection() {
  return (
    <>
      {/* Previous sections */}
      <Leaders data={leadersData} />
    </>
  );
}
