"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import config from "@/app/config";
import AboutUsTextCard from "./AboutUsText";

interface AboutUs {
  id: string;
  page: string;
  title: string;
  subtitle: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AboutUsTextPage() {
  const [data, setData] = useState<AboutUs | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${config.base_url}/about-us-text`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch About Us data");

        const json = await res.json();
        setData(json); 
        console.log(data)// assuming the API returns a single object
      } catch (err) {
        console.error(err);
        toast.error("Failed to load About Us data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!data) return <p className="text-center mt-10 text-red-500">No data found</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#E7C873]">About Us</h1>
      <AboutUsTextCard data={data} />
    </div>
  );
}
