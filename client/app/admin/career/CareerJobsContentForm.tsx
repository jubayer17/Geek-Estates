'use client';

import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CareerPageData } from './types';

export default function CareerJobsContentForm() {
  const [pageData, setPageData] = useState<Partial<CareerPageData>>({
    jobsBadge: '',
    jobsTitle: '',
    jobsDescription: '',
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
      toast.success('Jobs section header updated');
    } catch (error) {
      toast.error('Failed to update page settings');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Jobs Section Header</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePageUpdate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Jobs Badge</Label>
              <Input
                value={pageData.jobsBadge || ''}
                onChange={(e) => setPageData({ ...pageData, jobsBadge: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Jobs Title</Label>
              <Input
                value={pageData.jobsTitle || ''}
                onChange={(e) => setPageData({ ...pageData, jobsTitle: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Jobs Description</Label>
            <Textarea
              value={pageData.jobsDescription || ''}
              onChange={(e) => setPageData({ ...pageData, jobsDescription: e.target.value })}
            />
          </div>
          <Button type="submit"><Save className="w-4 h-4 mr-2" /> Save Header</Button>
        </form>
      </CardContent>
    </Card>
  );
}
