'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Job } from './types';

export default function CareerJobsList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Job Modal State
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [jobForm, setJobForm] = useState<Partial<Job>>({
    title: '',
    description: '',
    salary: '',
    experience: '',
    location: '',
    deadline: '',
    longDescription: '',
    responsibilities: [],
    requirements: [],
  });
  const [responsibilitiesText, setResponsibilitiesText] = useState('');
  const [requirementsText, setRequirementsText] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch('http://localhost:4001/career/jobs');
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch jobs');
      setIsLoading(false);
    }
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingJob ? 'PATCH' : 'POST';
      const url = editingJob
        ? `http://localhost:4001/career/jobs/${editingJob.id}`
        : 'http://localhost:4001/career/jobs';

      const payload = {
        ...jobForm,
        responsibilities: responsibilitiesText.split('\n').filter(Boolean),
        requirements: requirementsText.split('\n').filter(Boolean),
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      toast.success(`Job ${editingJob ? 'updated' : 'created'}`);
      fetchJobs();
      setIsJobModalOpen(false);
      setEditingJob(null);
      setJobForm({
        title: '', description: '', salary: '', experience: '',
        location: '', deadline: '', longDescription: '',
        responsibilities: [], requirements: []
      });
      setResponsibilitiesText('');
      setRequirementsText('');
    } catch (error) {
      console.error(error);
      toast.error('Operation failed');
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetch(`http://localhost:4001/career/jobs/${id}`, { method: 'DELETE' });
      setJobs(jobs.filter(j => j.id !== id));
      toast.success('Job deleted');
    } catch (error) {
      toast.error('Failed to delete job');
    }
  };

  const openJobModal = (job?: Job) => {
    if (job) {
      setEditingJob(job);
      setJobForm(job);
      setResponsibilitiesText(job.responsibilities?.join('\n') || '');
      setRequirementsText(job.requirements?.join('\n') || '');
    } else {
      setEditingJob(null);
      setJobForm({
        title: '', description: '', salary: '', experience: '',
        location: '', deadline: '', longDescription: '',
        responsibilities: [], requirements: []
      });
      setResponsibilitiesText('');
      setRequirementsText('');
    }
    setIsJobModalOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Active Listings</h2>
        <Button onClick={() => openJobModal()} className="bg-[#E7C873] text-black hover:bg-[#d4b04d]">
          <Plus className="w-4 h-4 mr-2" /> Add Job
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {jobs.map(job => (
          <div key={job.id} className="p-6 border rounded-xl bg-zinc-900/50 border-zinc-800 hover:border-[#E7C873]/30 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-zinc-400 mb-4">
                  <span>{job.location}</span>
                  <span>•</span>
                  <span>{job.salary}</span>
                  <span>•</span>
                  <span>{job.experience}</span>
                </div>
                <p className="text-zinc-500 line-clamp-2 max-w-2xl">{job.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => openJobModal(job)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteJob(job.id)} className="text-red-500 hover:text-red-600 hover:bg-red-500/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {jobs.length === 0 && (
          <div className="text-center py-12 text-zinc-500 bg-zinc-900/30 rounded-xl border border-zinc-800 border-dashed">
            No active job listings found.
          </div>
        )}
      </div>

      <Dialog open={isJobModalOpen} onOpenChange={setIsJobModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-950 border-zinc-800">
          <DialogHeader>
            <DialogTitle>{editingJob ? 'Edit Job' : 'Create New Job'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleJobSubmit} className="space-y-6 mt-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input
                  value={jobForm.title}
                  onChange={e => setJobForm({ ...jobForm, title: e.target.value })}
                  required
                  placeholder="e.g. Senior Frontend Developer"
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={jobForm.location}
                  onChange={e => setJobForm({ ...jobForm, location: e.target.value })}
                  required
                  placeholder="e.g. Remote / New York"
                />
              </div>
              <div className="space-y-2">
                <Label>Salary Range</Label>
                <Input
                  value={jobForm.salary}
                  onChange={e => setJobForm({ ...jobForm, salary: e.target.value })}
                  required
                  placeholder="e.g. $120k - $160k"
                />
              </div>
              <div className="space-y-2">
                <Label>Experience</Label>
                <Input
                  value={jobForm.experience}
                  onChange={e => setJobForm({ ...jobForm, experience: e.target.value })}
                  required
                  placeholder="e.g. 3+ Years"
                />
              </div>
              <div className="space-y-2">
                <Label>Application Deadline</Label>
                <Input
                  value={jobForm.deadline}
                  onChange={e => setJobForm({ ...jobForm, deadline: e.target.value })}
                  required
                  placeholder="e.g. 2024-12-31"
                />
              </div>
              <div className="space-y-2">
                <Label>Job Type</Label>
                <Input
                  value={jobForm.jobType || ''}
                  onChange={e => setJobForm({ ...jobForm, jobType: e.target.value })}
                  placeholder="e.g. Full-time"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Short Description</Label>
              <Textarea
                value={jobForm.description}
                onChange={e => setJobForm({ ...jobForm, description: e.target.value })}
                required
                className="h-20"
                placeholder="Brief overview displayed on the card..."
              />
            </div>

            <div className="space-y-2">
              <Label>Long Description</Label>
              <Textarea
                value={jobForm.longDescription || ''}
                onChange={e => setJobForm({ ...jobForm, longDescription: e.target.value })}
                className="h-32"
                placeholder="Detailed role description..."
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Responsibilities (One per line)</Label>
                <Textarea
                  value={responsibilitiesText}
                  onChange={e => setResponsibilitiesText(e.target.value)}
                  className="h-48 font-mono text-sm"
                  placeholder="- Lead development teams&#10;- Architect solutions&#10;- Code reviews"
                />
              </div>
              <div className="space-y-2">
                <Label>Requirements (One per line)</Label>
                <Textarea
                  value={requirementsText}
                  onChange={e => setRequirementsText(e.target.value)}
                  className="h-48 font-mono text-sm"
                  placeholder="- 5+ years React&#10;- TypeScript expert&#10;- Node.js experience"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-zinc-800">
              <Button type="button" variant="outline" onClick={() => setIsJobModalOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-[#E7C873] text-black hover:bg-[#d4b04d]">
                {editingJob ? 'Update Job' : 'Create Job'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
