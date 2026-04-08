'use client';

import { useState, useEffect } from 'react';
import { Save, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectsPageData } from './types';

export default function ProjectsHeroForm() {
  const [pageData, setPageData] = useState<Partial<ProjectsPageData>>({
    heroBadge: '',
    heroTitle: '',
    heroDescription: '',
    statsCount1: '',
    statsLabel1: '',
    statsCount2: '',
    statsLabel2: '',
    heroImages: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const res = await fetch('http://localhost:5000/projects/page');
      if (res.ok) {
        const text = await res.text();
        if (text) {
          const data = JSON.parse(text);
          if (data) setPageData(data);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch page content');
      setIsLoading(false);
    }
  };

  const handlePageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/projects/page', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageData),
      });
      if (!res.ok) throw new Error('Failed to update page content');
      toast.success('Hero section updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update page content');
    }
  };

  if (isLoading) return <div className="text-white">Loading...</div>;

  return (
    <form onSubmit={handlePageSubmit} className="space-y-8">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">Hero Section</CardTitle>
          <CardDescription>Customize the main banner of the projects page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Badge Text</Label>
              <Input
                value={pageData.heroBadge || ''}
                onChange={(e) => setPageData({ ...pageData, heroBadge: e.target.value })}
                className="bg-zinc-950 border-zinc-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Title</Label>
              <Input
                value={pageData.heroTitle || ''}
                onChange={(e) => setPageData({ ...pageData, heroTitle: e.target.value })}
                className="bg-zinc-950 border-zinc-800 text-white"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-white">Description</Label>
            <Textarea
              value={pageData.heroDescription || ''}
              onChange={(e) => setPageData({ ...pageData, heroDescription: e.target.value })}
              className="bg-zinc-950 border-zinc-800 text-white h-24"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
            <div className="space-y-2">
              <Label className="text-white">Stat 1 Count</Label>
              <Input
                value={pageData.statsCount1 || ''}
                onChange={(e) => setPageData({ ...pageData, statsCount1: e.target.value })}
                className="bg-zinc-950 border-zinc-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Stat 1 Label</Label>
              <Input
                value={pageData.statsLabel1 || ''}
                onChange={(e) => setPageData({ ...pageData, statsLabel1: e.target.value })}
                className="bg-zinc-950 border-zinc-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Stat 2 Count</Label>
              <Input
                value={pageData.statsCount2 || ''}
                onChange={(e) => setPageData({ ...pageData, statsCount2: e.target.value })}
                className="bg-zinc-950 border-zinc-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Stat 2 Label</Label>
              <Input
                value={pageData.statsLabel2 || ''}
                onChange={(e) => setPageData({ ...pageData, statsLabel2: e.target.value })}
                className="bg-zinc-950 border-zinc-800 text-white"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-zinc-800">
            <Label className="text-white">Hero Images (URLs)</Label>
            {pageData.heroImages?.map((img, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={img}
                  onChange={(e) => {
                    const newImages = [...(pageData.heroImages || [])];
                    newImages[index] = e.target.value;
                    setPageData({ ...pageData, heroImages: newImages });
                  }}
                  className="bg-zinc-950 border-zinc-800 text-white"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => {
                    const newImages = (pageData.heroImages || []).filter((_, i) => i !== index);
                    setPageData({ ...pageData, heroImages: newImages });
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => setPageData({ ...pageData, heroImages: [...(pageData.heroImages || []), ''] })}
              className="border-dashed border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 w-full"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Image URL
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" className="bg-[#E7C873] text-black hover:bg-[#d4b560] min-w-[150px]">
          <Save className="w-4 h-4 mr-2" /> Save Changes
        </Button>
      </div>
    </form>
  );
}
