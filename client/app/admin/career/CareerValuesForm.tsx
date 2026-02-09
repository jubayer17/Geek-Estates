'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CareerPageData, CareerValue } from './types';

export default function CareerValuesForm() {
  const [pageData, setPageData] = useState<Partial<CareerPageData>>({
    valuesBadge: '',
    valuesTitle: '',
    valuesDescription: '',
  });
  const [values, setValues] = useState<CareerValue[]>([]);
  const [newValue, setNewValue] = useState({ title: '', description: '', icon: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pageRes, valuesRes] = await Promise.all([
        fetch('http://localhost:5000/career/page'),
        fetch('http://localhost:5000/career/values'),
      ]);

      const page = await pageRes.json();
      const valuesList = await valuesRes.json();

      setPageData(page);
      setValues(Array.isArray(valuesList) ? valuesList : []);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch data');
      setIsLoading(false);
    }
  };

  const handlePageUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/career/page', {
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

  const handleAddValue = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/career/values', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newValue),
      });
      if (!res.ok) throw new Error();
      const created = await res.json();
      setValues([...values, created]);
      setNewValue({ title: '', description: '', icon: '' });
      toast.success('Value added');
    } catch (error) {
      toast.error('Failed to add value');
    }
  };

  const handleDeleteValue = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetch(`http://localhost:5000/career/values/${id}`, { method: 'DELETE' });
      setValues(values.filter(v => v.id !== id));
      toast.success('Value deleted');
    } catch (error) {
      toast.error('Failed to delete value');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Values Section Header</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePageUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Values Badge</Label>
                <Input
                  value={pageData.valuesBadge || ''}
                  onChange={(e) => setPageData({ ...pageData, valuesBadge: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Values Title</Label>
                <Input
                  value={pageData.valuesTitle || ''}
                  onChange={(e) => setPageData({ ...pageData, valuesTitle: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Values Description</Label>
              <Textarea
                value={pageData.valuesDescription || ''}
                onChange={(e) => setPageData({ ...pageData, valuesDescription: e.target.value })}
              />
            </div>
            <Button type="submit"><Save className="w-4 h-4 mr-2" /> Save Header</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New Value</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddValue} className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={newValue.title}
                  onChange={(e) => setNewValue({ ...newValue, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={newValue.description}
                  onChange={(e) => setNewValue({ ...newValue, description: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Icon (Lucide name)</Label>
                <Input
                  value={newValue.icon}
                  onChange={(e) => setNewValue({ ...newValue, icon: e.target.value })}
                  placeholder="e.g. Heart"
                  required
                />
              </div>
              <Button type="submit" variant="secondary"><Plus className="w-4 h-4 mr-2" /> Add Value</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Current Values</h3>
          {values.map(val => (
            <div key={val.id} className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm flex justify-between items-start">
              <div>
                <h4 className="font-medium flex items-center gap-2">
                  <Heart className="w-4 h-4" /> {val.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">{val.description}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleDeleteValue(val.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
