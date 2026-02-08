'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AboutWhoWeAre } from './types';

export default function AboutWhoWeAreForm() {
  const [items, setItems] = useState<AboutWhoWeAre[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AboutWhoWeAre | null>(null);
  const [formData, setFormData] = useState<{ title: string; description: string; order: string }>({
    title: '',
    description: '',
    order: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('http://localhost:5000/aboutWhoWeAre');
      if (res.ok) {
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch items');
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem
        ? `http://localhost:5000/aboutWhoWeAre/${editingItem.id}`
        : 'http://localhost:5000/aboutWhoWeAre';

      const payload = new FormData();
      if (imageFile) {
        payload.append('image', imageFile);
      }
      
      const dataObj = {
        title: formData.title,
        description: formData.description,
        order: parseInt(formData.order) || 0,
      };
      
      payload.append('data', JSON.stringify(dataObj));

      const res = await fetch(url, {
        method,
        body: payload,
      });

      if (!res.ok) throw new Error();

      toast.success(`Item ${editingItem ? 'updated' : 'created'}`);
      fetchItems();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error('Operation failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetch(`http://localhost:5000/aboutWhoWeAre/${id}`, { method: 'DELETE' });
      setItems(items.filter(i => i.id !== id));
      toast.success('Item deleted');
    } catch (error) {
      toast.error('Failed to delete item');
    }
  };

  const openModal = (item?: AboutWhoWeAre) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        description: item.description,
        order: item.order.toString(),
      });
    } else {
      setEditingItem(null);
      resetForm();
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', order: '' });
    setImageFile(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => openModal()} className="bg-[#E7C873] text-black hover:bg-[#d4b563]">
          <Plus className="w-4 h-4 mr-2" /> Add Item
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg space-y-3">
            {item.imageUrl && (
              <img src={`http://localhost:5000${item.imageUrl}`} alt={item.title} className="w-full h-40 object-cover rounded" />
            )}
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg text-[#E7C873]">{item.title}</h3>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => openModal(item)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(item.id)}>
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
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Item' : 'Add Item'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-zinc-800 border-zinc-700"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-zinc-800 border-zinc-700"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Order</Label>
              <Input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                className="bg-zinc-800 border-zinc-700"
              />
            </div>
            <div className="grid gap-2">
              <Label>Image (Optional)</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="bg-zinc-800 border-zinc-700"
              />
            </div>
            <Button type="submit" className="w-full bg-[#E7C873] text-black hover:bg-[#d4b563]">
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
