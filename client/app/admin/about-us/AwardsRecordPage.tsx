"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import config from "@/app/config";
import AwardsRecordCard from "./AwardsRecordCard";


interface Award {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AwardsPageWrapper() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAwards() {
      try {
        const res = await fetch(`${config.base_url}/aboutUsAwardRecords`);
        if (!res.ok) throw new Error("Failed to fetch awards");
        const data: Award[] = await res.json();
        setAwards(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load awards");
      } finally {
        setLoading(false);
      }
    }

    fetchAwards();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading awards...</p>;
  }

  return <AwardsRecordCard initialData={awards} />;
}
