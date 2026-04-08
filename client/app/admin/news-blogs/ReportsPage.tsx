"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash, Plus, Check } from "lucide-react";
import { toast } from "sonner"; // ShadCN toast
import config from "@/app/config";

interface Report {
  id: string;
  category: string;
  title: string;
  description: string;
  publishDate: string;
  downloadUrl: string | null;
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReports = async () => {
    const res = await fetch(`${config.base_url}/reports`);
    const data = await res.json();
    setReports(data);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // -------------------- Add/Edit Report State --------------------
  const [editingReport, setEditingReport] = useState<Report | null>(null);
  const [adding, setAdding] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    publishDate: "",
    downloadUrl: "",
  });

  // Open edit popover
  const handleEditClick = (report: Report) => {
    setEditingReport(report);
    setFormData({
      category: report.category,
      title: report.title,
      description: report.description,
      publishDate: report.publishDate.slice(0, 10), // yyyy-mm-dd
      downloadUrl: report.downloadUrl || "",
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this report?")) return;
    const res = await fetch(`${config.base_url}/reports/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Deleted successfully!");
      fetchReports();
    } else {
      toast.error("Delete failed!");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const method = editingReport ? "PUT" : "POST";
      const url = editingReport
        ? `${config.base_url}/reports/${editingReport.id}`
        : `${config.base_url}/reports`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save report");

      toast.success(editingReport ? "Updated!" : "Added!");
      setEditingReport(null);
      setAdding(false);
      fetchReports();
    } catch (err) {
      console.error(err);
      toast.error("Operation failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      {/* Add Report Button */}
      <div className="flex justify-end">
        <Popover open={adding} onOpenChange={setAdding}>
          <PopoverTrigger asChild>
            <Button  size="sm" className="flex border-2 items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Report
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 space-y-3">
            <Input
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
            <Input
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <Textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-[100px]"
            />
            <Input
              type="date"
              value={formData.publishDate}
              onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
            />
            <Input
              placeholder="Download URL (optional)"
              value={formData.downloadUrl}
              onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
            />
            <Button
              className="w-full flex items-center justify-center gap-2"
              onClick={handleSubmit}
              disabled={loading}
            >
              <Check className="w-4 h-4" />
              {loading ? "Saving..." : "Save"}
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      {/* Reports Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Publish Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.category}</TableCell>
              <TableCell>{report.title}</TableCell>
              <TableCell>{report.publishDate.slice(0, 10)}</TableCell>
              <TableCell>{report.description}</TableCell>
              <TableCell className="flex gap-2">
                <Popover open={editingReport?.id === report.id} onOpenChange={(open) => {
                  if (!open) setEditingReport(null);
                }}>
                  <PopoverTrigger asChild>
                    <Button
                      size="sm"
                      className="flex border-2 items-center gap-1"
                      onClick={() => handleEditClick(report)}
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-96 space-y-3">
                    <Input
                      placeholder="Category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                    <Input
                      placeholder="Title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <Textarea
                      placeholder="Description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="min-h-[100px]"
                    />
                    <Input
                      type="date"
                      value={formData.publishDate}
                      onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                    />
                    <Input
                      placeholder="Download URL (optional)"
                      value={formData.downloadUrl}
                      onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
                    />
                    <Button
                      className="w-full flex items-center justify-center gap-2"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      <Check className="w-4 h-4" />
                      {loading ? "Saving..." : "Save"}
                    </Button>
                  </PopoverContent>
                </Popover>

                <Button
                  size="sm"
                  variant="destructive"
                  className="flex items-center gap-1"
                  onClick={() => handleDelete(report.id)}
                >
                  <Trash className="w-4 h-4" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
