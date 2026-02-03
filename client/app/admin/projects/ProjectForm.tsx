'use client';

import { useState, useEffect } from 'react';
import { Upload, Save } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import { Project } from './types';

const DEFAULT_CATEGORIES = ['Residential', 'Commercial', 'Industrial', 'Land', 'Luxury'];
const DEFAULT_STATUSES = ['For Sale', 'For Rent', 'Sold', 'Pending', 'Under Construction'];

interface ProjectFormProps {
  project?: Project | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProjectForm({ project, onSuccess, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    location: '',
    date: '',
    price: '',
    beds: 0,
    baths: 0,
    area: 0,
    category: '',
    status: '',
    featured: false,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Dynamic Options State
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [statuses, setStatuses] = useState<string[]>(DEFAULT_STATUSES);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingStatus, setIsAddingStatus] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    if (project) {
      setFormData(project);
      setImagePreview(project.image);
      
      // Ensure existing category/status is in the list
      if (project.category && !categories.includes(project.category)) {
        setCategories(prev => [...prev, project.category!]);
      }
      if (project.status && !statuses.includes(project.status)) {
        setStatuses(prev => [...prev, project.status!]);
      }
    } else {
      setFormData({
        title: '', description: '', location: '', date: '', price: '',
        beds: 0, baths: 0, area: 0, category: '', status: '', featured: false
      });
      setImagePreview(null);
    }
  }, [project]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory.trim()]);
      setFormData({ ...formData, category: newCategory.trim() });
      setNewCategory('');
      setIsAddingCategory(false);
    }
  };

  const handleAddStatus = () => {
    if (newStatus.trim()) {
      setStatuses([...statuses, newStatus.trim()]);
      setFormData({ ...formData, status: newStatus.trim() });
      setNewStatus('');
      setIsAddingStatus(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const form = new FormData();
      Object.keys(formData).forEach(key => {
        const value = formData[key as keyof Project];
        if (value !== undefined && value !== null) {
          form.append(key, value.toString());
        }
      });
      if (selectedImage) {
        form.append('image', selectedImage);
      }

      const url = project
        ? `http://localhost:4001/projects/${project.id}`
        : 'http://localhost:4001/projects';

      const method = project ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        body: form,
      });

      if (!res.ok) throw new Error('Failed to save project');

      toast.success(`Project ${project ? 'updated' : 'created'} successfully`);
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error('Operation failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
      {/* Image Upload */}
      <div className="space-y-2">
        <Label>Project Image</Label>
        <div className="border-2 border-dashed border-zinc-800 rounded-lg p-8 text-center hover:border-[#E7C873]/50 transition-colors cursor-pointer relative group">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {imagePreview ? (
            <div className="relative h-48 w-full mx-auto">
              <Image src={imagePreview} alt="Preview" fill className="object-contain" />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-zinc-500">
              <Upload className="w-8 h-8" />
              <p>Click or drag to upload image</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="bg-zinc-900 border-zinc-800"
          />
        </div>
        <div className="space-y-2">
          <Label>Location</Label>
          <Input
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
            className="bg-zinc-900 border-zinc-800"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="bg-zinc-900 border-zinc-800 h-24"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Price</Label>
          <Input
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="bg-zinc-900 border-zinc-800"
          />
        </div>
        <div className="space-y-2">
          <Label>Date</Label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="bg-zinc-900 border-zinc-800"
          />
        </div>
        <div className="space-y-2">
          <Label>Featured</Label>
          <div className="flex items-center space-x-2 h-10">
            <Switch
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
            />
            <span className="text-sm text-zinc-400">{formData.featured ? 'Featured' : 'Standard'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Beds</Label>
          <Input
            type="number"
            value={formData.beds}
            onChange={(e) => setFormData({ ...formData, beds: parseInt(e.target.value) || 0 })}
            className="bg-zinc-900 border-zinc-800"
          />
        </div>
        <div className="space-y-2">
          <Label>Baths</Label>
          <Input
            type="number"
            value={formData.baths}
            onChange={(e) => setFormData({ ...formData, baths: parseInt(e.target.value) || 0 })}
            className="bg-zinc-900 border-zinc-800"
          />
        </div>
        <div className="space-y-2">
          <Label>Area (sqft)</Label>
          <Input
            type="number"
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: parseInt(e.target.value) || 0 })}
            className="bg-zinc-900 border-zinc-800"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Category</Label>
          <div className="flex gap-2">
            {!isAddingCategory ? (
              <Select
                value={formData.category}
                onValueChange={(value) => {
                  if (value === 'new') setIsAddingCategory(true);
                  else setFormData({ ...formData, category: value });
                }}
              >
                <SelectTrigger className="bg-zinc-900 border-zinc-800">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                  <SelectItem value="new" className="text-[#E7C873] font-medium">+ Add New</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="flex gap-2 w-full">
                <Input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="New Category"
                  className="bg-zinc-900 border-zinc-800"
                />
                <Button type="button" onClick={handleAddCategory} className="bg-[#E7C873] text-black">Add</Button>
                <Button type="button" variant="ghost" onClick={() => setIsAddingCategory(false)}>Cancel</Button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <div className="flex gap-2">
            {!isAddingStatus ? (
              <Select
                value={formData.status}
                onValueChange={(value) => {
                  if (value === 'new') setIsAddingStatus(true);
                  else setFormData({ ...formData, status: value });
                }}
              >
                <SelectTrigger className="bg-zinc-900 border-zinc-800">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                  <SelectItem value="new" className="text-[#E7C873] font-medium">+ Add New</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="flex gap-2 w-full">
                <Input
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  placeholder="New Status"
                  className="bg-zinc-900 border-zinc-800"
                />
                <Button type="button" onClick={handleAddStatus} className="bg-[#E7C873] text-black">Add</Button>
                <Button type="button" variant="ghost" onClick={() => setIsAddingStatus(false)}>Cancel</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t border-zinc-800">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" className="bg-[#E7C873] text-black hover:bg-[#d4b560]">
          <Save className="w-4 h-4 mr-2" />
          {project ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
}
