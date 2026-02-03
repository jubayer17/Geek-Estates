'use client';

import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectsPageData } from './types';

export default function ProjectsCTAForm() {
  const [pageData, setPageData] = useState<Partial<ProjectsPageData>>({
    ctaBadge: '',
    ctaTitleRegular: '',
    ctaTitleItalic: '',
    ctaDescription: '',
    ctaButtonText: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const res = await fetch('http://localhost:4001/projects/page');
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
      const res = await fetch('http://localhost:4001/projects/page', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageData),
      });
      if (!res.ok) throw new Error('Failed to update page content');
      toast.success('CTA section updated successfully');
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
          <CardTitle className="text-white">CTA Section</CardTitle>
          <CardDescription>Customize the call-to-action section at the bottom of the page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Badge Text</Label>
            <Input
              value={pageData.ctaBadge || ''}
              onChange={(e) => setPageData({ ...pageData, ctaBadge: e.target.value })}
              className="bg-zinc-950 border-zinc-800 text-white"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Title (Regular)</Label>
              <Input
                value={pageData.ctaTitleRegular || ''}
                onChange={(e) => setPageData({ ...pageData, ctaTitleRegular: e.target.value })}
                className="bg-zinc-950 border-zinc-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Title (Italic)</Label>
              <Input
                value={pageData.ctaTitleItalic || ''}
                onChange={(e) => setPageData({ ...pageData, ctaTitleItalic: e.target.value })}
                className="bg-zinc-950 border-zinc-800 text-white"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-white">Description</Label>
            <Textarea
              value={pageData.ctaDescription || ''}
              onChange={(e) => setPageData({ ...pageData, ctaDescription: e.target.value })}
              className="bg-zinc-950 border-zinc-800 text-white h-24"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white">Button Text</Label>
            <Input
              value={pageData.ctaButtonText || ''}
              onChange={(e) => setPageData({ ...pageData, ctaButtonText: e.target.value })}
              className="bg-zinc-950 border-zinc-800 text-white"
            />
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
