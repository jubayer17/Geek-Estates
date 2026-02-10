'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Star } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { AboutUsTestimonial } from './types';

export default function AboutTestimonialsForm() {
  const [testimonials, setTestimonials] = useState<AboutUsTestimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Testimonial Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AboutUsTestimonial | null>(null);
  const [form, setForm] = useState({
    name: '', designation: '', message: '', rating: '5', company: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const testRes = await fetch('http://localhost:5000/aboutUsTestimonial');
      if (testRes.ok) setTestimonials(await testRes.json() || []);
      setIsLoading(false);
    } catch (error) {
      toast.error('Failed to fetch data');
      setIsLoading(false);
    }
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem
        ? `http://localhost:5000/aboutUsTestimonial/${editingItem.id}`
        : 'http://localhost:5000/aboutUsTestimonial';

      const dataObj = {
        ...form,
        rating: parseInt(form.rating) || 5
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataObj),
      });

      if (!res.ok) throw new Error();
      toast.success('Testimonial saved');
      fetchData();
      setIsModalOpen(false);
      resetForm();
    } catch (e) {
      toast.error('Failed to save testimonial');
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Confirm delete?')) return;
    await fetch(`http://localhost:5000/aboutUsTestimonial/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const openModal = (item?: AboutUsTestimonial) => {
    if (item) {
      setEditingItem(item);
      setForm({
        name: item.name,
        designation: item.designation,
        message: item.message,
        rating: item.rating.toString(),
        company: item.company
      });
    } else {
      setEditingItem(null);
      resetForm();
    }
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setForm({ name: '', designation: '', message: '', rating: '5', company: '' });
  };

  if (isLoading) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-8 text-white">
      {/* Testimonials Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Client Reviews</h2>
          <Button onClick={() => openModal()} className="bg-[#E7C873] text-black hover:bg-[#d4b04d]">
            <Plus className="w-4 h-4 mr-2" /> Add Review
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(item => (
            <Card key={item.id} className="bg-zinc-900 border-zinc-800 text-white flex flex-col">
              <CardContent className="pt-6 flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 overflow-hidden flex-shrink-0 flex items-center justify-center text-[#E7C873] font-bold">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-zinc-500 text-xs">{item.designation}, {item.company}</p>
                    <div className="flex items-center mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < item.rating ? 'text-[#E7C873] fill-[#E7C873]' : 'text-zinc-700'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-zinc-400 text-sm italic">"{item.message}"</p>
              </CardContent>
              <div className="px-6 pb-4 flex justify-end gap-2">
                <Button variant="ghost" size="icon" onClick={() => openModal(item)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => deleteTestimonial(item.id)} className="text-red-500">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl bg-zinc-950 border-zinc-800 text-white">
          <DialogHeader><DialogTitle>{editingItem ? 'Edit' : 'Add'} Review</DialogTitle></DialogHeader>
          <form onSubmit={handleTestimonialSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="bg-zinc-800 border-zinc-700" required />
              </div>
              <div className="space-y-2">
                <Label>Designation</Label>
                <Input value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} className="bg-zinc-800 border-zinc-700" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company</Label>
                <Input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="bg-zinc-800 border-zinc-700" required />
              </div>
              <div className="space-y-2">
                <Label>Rating (1-5)</Label>
                <Input type="number" min="1" max="5" value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} className="bg-zinc-800 border-zinc-700" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="bg-zinc-800 border-zinc-700" required />
            </div>

            <Button type="submit" className="w-full bg-[#E7C873] text-black hover:bg-[#d4b04d]">Save</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
