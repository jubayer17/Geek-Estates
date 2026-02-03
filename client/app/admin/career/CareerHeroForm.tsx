'use client';

import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CareerPageData } from './types';

export default function CareerHeroForm() {
  const [pageData, setPageData] = useState<Partial<CareerPageData>>({
    heroTitle: '',
    heroSubtitle: '',
    heroImage: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const res = await fetch('http://localhost:4001/career/page');
      if (res.ok) {
        const data = await res.json();
        setPageData(data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch page content');
      setIsLoading(false);
    }
  };

  const handlePageUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4001/career/page', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageData),
      });
      if (!res.ok) throw new Error();
      toast.success('Page settings updated');
    } catch (error) {
      toast.error('Failed to update page settings');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero Configuration</CardTitle>
        <CardDescription>Update the main banner content of the career page.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePageUpdate} className="space-y-4">
          <div className="space-y-2">
            <Label>Hero Title</Label>
            <Input
              value={pageData.heroTitle || ''}
              onChange={(e) => setPageData({ ...pageData, heroTitle: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Hero Subtitle</Label>
            <Textarea
              value={pageData.heroSubtitle || ''}
              onChange={(e) => setPageData({ ...pageData, heroSubtitle: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Hero Image URL</Label>
            <Input
              value={pageData.heroImage || ''}
              onChange={(e) => setPageData({ ...pageData, heroImage: e.target.value })}
            />
          </div>
          <Button type="submit"><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  );
}
