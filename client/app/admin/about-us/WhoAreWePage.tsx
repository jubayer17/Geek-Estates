"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import config from "@/app/config";
import WhoWeAreCard from "./WhoAreWe";

interface WhoWeAre {
  id: string;
  imageUrl: string;
  yearsOfExcellence: string;
  excellenceText: string;
  smallHeading: string;
  mainHeading: string;
  mainHeadingItalic: string;
  paragraphs: string[];
  ctaText: string;
  ctaUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function WhoWeArePage() {
  const [data, setData] = useState<WhoWeAre | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`${config.base_url}/aboutWhoWeAre`);
        if (!res.ok) throw new Error("Failed to fetch data");

        const json = await res.json();
        // Assuming API returns an array with 1 object
        setData(json[0]);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!data) return <p className="text-center mt-10">No data found</p>;

  return (
    <div className="p-6 space-y-6">
      <WhoWeAreCard data={data} />
    </div>
  );
}
