'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AboutUsText, AboutUsBannerImage } from './types';

export default function AboutGeneralForm() {
  const [textData, setTextData] = useState<Partial<AboutUsText>>({
    title: '',
    subtitle: '',
  });
  const [images, setImages] = useState<AboutUsBannerImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newImageText, setNewImageText] = useState('');
  const [newImageType, setNewImageType] = useState('main'); // Default type

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [textRes, imgRes] = await Promise.all([
        fetch('http://localhost:5000/about-us-text'),
        fetch('http://localhost:5000/about-us-banner-image')
      ]);

      if (textRes.ok) {
        const text = await textRes.json();
        setTextData(text || { title: '', subtitle: '' });
      }

      if (imgRes.ok) {
        const imgs = await imgRes.json();
        setImages(imgs || []);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/about-us-text', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(textData),
      });
      if (!res.ok) throw new Error();
      toast.success('Text updated successfully');
    } catch (error) {
      toast.error('Failed to update text');
    }
  };

  const handleImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage) {
      toast.error('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('image', newImage);
    formData.append('text', newImageText);
    formData.append('type', newImageType);

    try {
      const res = await fetch('http://localhost:5000/about-us-banner-image', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error();
      toast.success('Image uploaded successfully');
      setNewImage(null);
      setNewImageText('');
      fetchData(); // Refresh list
    } catch (error) {
      toast.error('Failed to upload image');
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      const res = await fetch(`http://localhost:5000/about-us-banner-image/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error();
      toast.success('Image deleted');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete image');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-[#E7C873]">Main Content</CardTitle>
          <CardDescription>Update the main heading and subheading.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTextUpdate} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={textData.title || ''}
                onChange={(e) => setTextData({ ...textData, title: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Textarea
                id="subtitle"
                value={textData.subtitle || ''}
                onChange={(e) => setTextData({ ...textData, subtitle: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <Button type="submit" className="bg-[#E7C873] text-black hover:bg-[#d4b563]">
              <Save className="w-4 h-4 mr-2" /> Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-[#E7C873]">Banner Images</CardTitle>
          <CardDescription>Manage banner images for the page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleImageUpload} className="space-y-4 border-b border-zinc-800 pb-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label>Image File</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewImage(e.target.files?.[0] || null)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label>Caption / Text (Optional)</Label>
                <Input
                  value={newImageText}
                  onChange={(e) => setNewImageText(e.target.value)}
                  placeholder="Image caption"
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label>Type</Label>
                <select
                  value={newImageType}
                  onChange={(e) => setNewImageType(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white"
                >
                  <option value="main">Main Banner</option>
                  <option value="secondary">Secondary Banner</option>
                </select>
              </div>
            </div>
            <Button type="submit" className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-700">
              <Plus className="w-4 h-4 mr-2" /> Upload Image
            </Button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img) => (
              <div key={img.id} className="relative group border border-zinc-800 rounded-lg overflow-hidden">
                <img src={`http://localhost:5000${img.url}`} alt={img.text} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDeleteImage(img.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                {img.text && (
                  <div className="p-2 bg-zinc-900 text-sm text-zinc-400">
                    {img.text} <span className="text-xs opacity-50 ml-2">({img.type})</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
