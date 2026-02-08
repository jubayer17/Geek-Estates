'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AboutUsCoreValue } from './types';

export default function AboutAchievementsForm() {
  const [items, setItems] = useState<AboutUsCoreValue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AboutUsCoreValue | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '', order: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:5000/aboutUsCoreValue');
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
        ? `http://localhost:5000/aboutUsCoreValue/${editingItem.id}`
        : 'http://localhost:5000/aboutUsCoreValue';

      const dataObj = {
        title: formData.title,
        description: formData.description,
        order: parseInt(formData.order) || 0,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataObj),
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

  const deleteVal = async (id: string) => {
    if (!confirm('Confirm delete?')) return;
    await fetch(`http://localhost:5000/aboutUsCoreValue/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const openModal = (item?: AboutUsCoreValue) => {
    if (item) {
      setEditingItem(item);
      setFormData({ title: item.title, description: item.description, order: item.order.toString() });
    } else {
      setEditingItem(null);
      resetForm();
    }
    setIsModalOpen(true);
  };

  const resetForm = () => setFormData({ title: '', description: '', order: '' });

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => openModal()} className="bg-[#E7C873] text-black hover:bg-[#d4b563]">
          <Plus className="w-4 h-4 mr-2" /> Add Value/Achievement
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg space-y-3">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg text-[#E7C873]">{item.title}</h3>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => openModal(item)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600" onClick={() => deleteVal(item.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-zinc-400">{item.description}</p>
            <div className="text-xs text-zinc-500">Order: {item.order}</div>
          </div>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader><DialogTitle>{editingItem ? 'Edit' : 'Add'}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="bg-zinc-800 border-zinc-700" required />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="bg-zinc-800 border-zinc-700" required />
            </div>
            <div className="grid gap-2">
              <Label>Order</Label>
              <Input type="number" value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} className="bg-zinc-800 border-zinc-700" />
            </div>
            <Button type="submit" className="w-full bg-[#E7C873] text-black hover:bg-[#d4b563]">Save</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
