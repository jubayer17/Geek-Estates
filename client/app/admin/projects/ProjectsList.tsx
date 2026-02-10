'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Search, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Project } from './types';
import ProjectForm from './ProjectForm';

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:5000/projects');
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch projects');
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`http://localhost:5000/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setProjects(projects.filter(p => p.id !== id));
      toast.success('Project deleted');
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  const openModal = (project?: Project) => {
    setEditingProject(project || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleSuccess = () => {
    fetchProjects();
    closeModal();
  };

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-6 mt-6">
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
          <Input
            placeholder="Search projects..."
            className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => openModal()} className="bg-[#E7C873] text-black hover:bg-[#d4b560]">
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-[#E7C873]/50 transition-all"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button size="icon" variant="secondary" className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm" onClick={() => openModal(project)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                {project.featured && (
                  <div className="absolute top-2 left-2 bg-[#E7C873] text-black text-xs font-bold px-2 py-1 rounded">
                    FEATURED
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-white truncate pr-2">{project.title}</h3>
                  <span className="text-[#E7C873] font-medium whitespace-nowrap">{project.price}</span>
                </div>

                <div className="flex items-center gap-2 text-zinc-400 text-sm mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{project.location}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-zinc-800 pt-4 text-xs text-zinc-500">
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-bold text-white">{project.beds}</span>
                    <span>Beds</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 border-l border-zinc-800">
                    <span className="font-bold text-white">{project.baths}</span>
                    <span>Baths</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 border-l border-zinc-800">
                    <span className="font-bold text-white">{project.area}</span>
                    <span>Sqft</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProject ? 'Edit Project' : 'Create New Project'}</DialogTitle>
          </DialogHeader>
          <ProjectForm 
            project={editingProject} 
            onSuccess={handleSuccess} 
            onCancel={closeModal} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
