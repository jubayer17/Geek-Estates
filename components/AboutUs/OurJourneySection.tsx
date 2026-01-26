
import Journey from "./Journey";
import { Hammer, Home, TrendingUp, Leaf } from "lucide-react";

const journeyData = [
  {
    year: "1995–2002",
    label: "The Beginning",
    title: "Company Established & Foundations Laid",
    description: "Artisan was founded in 1995 with a clear vision to redefine the housing sector by combining creativity, quality, and client-focused solutions.",
    icon: <Hammer className="w-6 h-6" />,
    side: "left"
  },
  {
    year: "2003",
    label: "First Milestone",
    title: "Delivering the First Major Project",
    description: "In 2003, Artisan successfully completed its very first housing project, establishing trust and craftsmanship in the industry.",
    icon: <Home className="w-6 h-6" />,
    side: "right"
  },
  {
    year: "2004–2015",
    label: "Expansion & Recognition",
    title: "Growth Across Residential & Commercial Sectors",
    description: "Artisan expanded into full-scale design, construction, and project management across residential and commercial developments.",
    icon: <TrendingUp className="w-6 h-6" />,
    side: "left"
  },
  {
    year: "2016–Present",
    label: "Innovation & Excellence",
    title: "Modern Era of Sustainable & Landmark Projects",
    description: "Embracing sustainability and innovation, Artisan continues delivering landmark projects with excellence and creativity.",
    icon: <Leaf className="w-6 h-6" />,
    side: "right"
  }
];

export default function OurJourneySection() {
  return <Journey data={journeyData} />;
}
