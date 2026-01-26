"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Career = {
  id: number;
  title: string;
  description: string;
  deadline: string;
};

export default function CareerForm({ job }: { job: Career }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((res) => setTimeout(res, 1500));

    setLoading(false);
 toast.success(`Application sent for ${job.title}!`, {
  description: "We'll get back to you shortly.",
  duration: 4000, 
});
    // Clear form
    setName("");
    setEmail("");
    setPhone("");
    setResume(null);
    setCoverLetter("");
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="0123456789"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="resume">Resume</Label>
        <Input
          id="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files?.[0] || null)}
          required
        />
      </div>

      <div>
        <Label htmlFor="coverLetter">Cover Letter</Label>
        <Textarea
          id="coverLetter"
          placeholder="Write a short cover letter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          rows={5}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-[#E7C873] hover:bg-[#d4b55f] text-[#1A1A1A] font-bold py-6 text-lg transition-all duration-300" 
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
