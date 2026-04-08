'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Star } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CareerPageData, CareerPerk } from './types';

export default function CareerPerksForm() {
  const [pageData, setPageData] = useState<Partial<CareerPageData>>({
    perksBadge: '',
    perksTitle: '',
    perksDescription: '',
  });
  const [perks, setPerks] = useState<CareerPerk[]>([]);
  const [newPerk, setNewPerk] = useState({ title: '', description: '', icon: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pageRes, perksRes] = await Promise.all([
        fetch('http://localhost:5000/career/page'),
        fetch('http://localhost:5000/career/perks'),
      ]);

      const page = await pageRes.json();
      const perksList = await perksRes.json();

      setPageData(page);
      setPerks(Array.isArray(perksList) ? perksList : []);
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

  const handleAddPerk = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/career/perks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPerk),
      });
      if (!res.ok) throw new Error();
      const created = await res.json();
      setPerks([...perks, created]);
      setNewPerk({ title: '', description: '', icon: '' });
      toast.success('Perk added');
    } catch (error) {
      toast.error('Failed to add perk');
    }
  };

  const handleDeletePerk = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetch(`http://localhost:5000/career/perks/${id}`, { method: 'DELETE' });
      setPerks(perks.filter(p => p.id !== id));
      toast.success('Perk deleted');
    } catch (error) {
      toast.error('Failed to delete perk');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Perks Section Header</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePageUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Perks Badge</Label>
                <Input
                  value={pageData.perksBadge || ''}
                  onChange={(e) => setPageData({ ...pageData, perksBadge: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Perks Title</Label>
                <Input
                  value={pageData.perksTitle || ''}
                  onChange={(e) => setPageData({ ...pageData, perksTitle: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Perks Description</Label>
              <Textarea
                value={pageData.perksDescription || ''}
                onChange={(e) => setPageData({ ...pageData, perksDescription: e.target.value })}
              />
            </div>
            <Button type="submit"><Save className="w-4 h-4 mr-2" /> Save Header</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New Perk</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddPerk} className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={newPerk.title}
                  onChange={(e) => setNewPerk({ ...newPerk, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={newPerk.description}
                  onChange={(e) => setNewPerk({ ...newPerk, description: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Icon (Lucide name)</Label>
                <Input
                  value={newPerk.icon}
                  onChange={(e) => setNewPerk({ ...newPerk, icon: e.target.value })}
                  placeholder="e.g. Star"
                  required
                />
              </div>
              <Button type="submit" variant="secondary"><Plus className="w-4 h-4 mr-2" /> Add Perk</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Current Perks</h3>
          {perks.map(perk => (
            <div key={perk.id} className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm flex justify-between items-start">
              <div>
                <h4 className="font-medium flex items-center gap-2">
                  <Star className="w-4 h-4" /> {perk.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">{perk.description}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleDeletePerk(perk.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
