"use client";

import { useEffect, useState } from "react";
import StatsPage from "./AchivementCard"; 
import config from "@/app/config";

export default function AchievementPage() {
  const [initialData, setInitialData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${config.base_url}/aboutUsAchievements`);
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        setInitialData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!initialData.length) return <p>No stats found</p>;

  return <StatsPage initialData={initialData} />;
}
