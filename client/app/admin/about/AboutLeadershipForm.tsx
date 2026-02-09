'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AboutUsLeadershipMember } from './types';

export default function AboutLeadershipForm() {
  const [members, setMembers] = useState<AboutUsLeadershipMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<AboutUsLeadershipMember | null>(null);
  const [memberForm, setMemberForm] = useState({
    name: '', designation: '', quote: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:5000/aboutUsLeadership');
      if (res.ok) setMembers(await res.json() || []);
      setIsLoading(false);
    } catch (error) {
      toast.error('Failed to fetch data');
      setIsLoading(false);
    }
  };

  const handleMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingMember ? 'PUT' : 'POST';
      const url = editingMember
        ? `http://localhost:5000/aboutUsLeadership/${editingMember.id}`
        : 'http://localhost:5000/aboutUsLeadership';

      const payload = new FormData();
      if (imageFile) payload.append('image', imageFile);
      payload.append('data', JSON.stringify(memberForm));

      const res = await fetch(url, {
        method,
        body: payload,
      });

      if (!res.ok) throw new Error();
      toast.success('Member saved');
      fetchData();
      setIsModalOpen(false);
      resetForm();
    } catch (e) {
      toast.error('Failed to save member');
    }
  };

  const deleteMember = async (id: string) => {
    if (!confirm('Confirm delete?')) return;
    await fetch(`http://localhost:5000/aboutUsLeadership/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const openModal = (member?: AboutUsLeadershipMember) => {
    if (member) {
      setEditingMember(member);
      setMemberForm({
        name: member.name,
        designation: member.designation,
        quote: member.quote || ''
      });
    } else {
      setEditingMember(null);
      resetForm();
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setMemberForm({ name: '', designation: '', quote: '' });
    setImageFile(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => openModal()} className="bg-[#E7C873] text-black hover:bg-[#d4b563]">
          <Plus className="w-4 h-4 mr-2" /> Add Member
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <div key={member.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg space-y-3">
            {member.imageUrl && (
              <img src={`http://localhost:5000${member.imageUrl}`} alt={member.name} className="w-full h-48 object-cover rounded-lg mb-2" />
            )}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-[#E7C873]">{member.name}</h3>
                <p className="text-zinc-400 text-sm">{member.designation}</p>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => openModal(member)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600" onClick={() => deleteMember(member.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {member.quote && <p className="text-sm text-zinc-500 italic">"{member.quote}"</p>}
          </div>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader><DialogTitle>{editingMember ? 'Edit Member' : 'Add Member'}</DialogTitle></DialogHeader>
          <form onSubmit={handleMemberSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input value={memberForm.name} onChange={e => setMemberForm({...memberForm, name: e.target.value})} className="bg-zinc-800 border-zinc-700" required />
            </div>
            <div className="grid gap-2">
              <Label>Designation</Label>
              <Input value={memberForm.designation} onChange={e => setMemberForm({...memberForm, designation: e.target.value})} className="bg-zinc-800 border-zinc-700" required />
            </div>
            <div className="grid gap-2">
              <Label>Quote (Optional)</Label>
              <Textarea value={memberForm.quote} onChange={e => setMemberForm({...memberForm, quote: e.target.value})} className="bg-zinc-800 border-zinc-700" />
            </div>
            <div className="grid gap-2">
              <Label>Image</Label>
              <Input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="bg-zinc-800 border-zinc-700" />
            </div>
            <Button type="submit" className="w-full bg-[#E7C873] text-black hover:bg-[#d4b563]">Save</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
