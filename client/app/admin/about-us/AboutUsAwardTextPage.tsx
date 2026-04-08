"use client";

import { useEffect, useState } from "react";
import config from "@/app/config";
import { toast } from "sonner";
import AboutUsAwardText from "./AboutUsAwardText";

interface Feature {
  id: string;
  title: string;
  extraTitle: string;
  subtitle: string;
  upText: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AboutUsAwardTextPage() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatures() {
      try {
        const res = await fetch(`${config.base_url}/aboutUsAwardTextSection`);
        if (!res.ok) throw new Error("Failed to fetch features");

        let data: Feature[] | Feature = await res.json();

        // Normalize to array
        if (!Array.isArray(data)) {
          data = [data];
        }

        setFeatures(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load features");
      } finally {
        setLoading(false);
      }
    }

    fetchFeatures();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="space-y-4 max-w-4xl mx-auto mt-6">
      {features.map((feature) => (
        <AboutUsAwardText key={feature.id} initialData={feature} />
      ))}
    </div>
  );
}
