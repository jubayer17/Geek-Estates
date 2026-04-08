'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AboutUsJourney } from './types';

export default function AboutJourneyForm() {
  const [items, setItems] = useState<AboutUsJourney[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AboutUsJourney | null>(null);
  const [formData, setFormData] = useState({ startYear: '', endYear: '', title: '', description: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:5000/aboutUsJourneyTimeline');
      if (res.ok) setItems(await res.json() || []);
      setIsLoading(false);
    } catch (error) {
      toast.error('Failed to fetch data');
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem
        ? `http://localhost:5000/aboutUsJourneyTimeline/${editingItem.id}`
        : 'http://localhost:5000/aboutUsJourneyTimeline';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();
      toast.success('Saved successfully');
      fetchData();
      setIsModalOpen(false);
      resetForm();
    } catch (e) {
      toast.error('Operation failed');
    }
  };

  const deleteJourney = async (id: string) => {
    if (!confirm('Confirm delete?')) return;
    await fetch(`http://localhost:5000/aboutUsJourneyTimeline/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const openModal = (item?: AboutUsJourney) => {
    if (item) {
      setEditingItem(item);
      setFormData({ startYear: item.startYear, endYear: item.endYear, title: item.title, description: item.description });
    } else {
      setEditingItem(null);
      resetForm();
    }
    setIsModalOpen(true);
  };

  const resetForm = () => setFormData({ startYear: '', endYear: '', title: '', description: '' });

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => openModal()} className="bg-[#E7C873] text-black hover:bg-[#d4b563]">
          <Plus className="w-4 h-4 mr-2" /> Add Journey
        </Button>
      </div>

      <div className="relative border-l border-zinc-800 ml-4 space-y-8 py-4">
        {items.map((item) => (
          <div key={item.id} className="relative pl-8">
            <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#E7C873]" />
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[#E7C873] font-bold">{item.startYear} - {item.endYear}</span>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" onClick={() => openModal(item)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600" onClick={() => deleteJourney(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-zinc-400">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader><DialogTitle>{editingItem ? 'Edit' : 'Add'}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Start Year</Label>
                <Input value={formData.startYear} onChange={e => setFormData({ ...formData, startYear: e.target.value })} className="bg-zinc-800 border-zinc-700" required />
              </div>
              <div className="grid gap-2">
                <Label>End Year</Label>
                <Input value={formData.endYear} onChange={e => setFormData({ ...formData, endYear: e.target.value })} className="bg-zinc-800 border-zinc-700" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="bg-zinc-800 border-zinc-700" required />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="bg-zinc-800 border-zinc-700" required />
            </div>
            <Button type="submit" className="w-full bg-[#E7C873] text-black hover:bg-[#d4b563]">Save</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
