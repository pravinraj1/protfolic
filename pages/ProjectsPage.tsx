import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

interface Project {
  id: string;
  created_at: string;
  title: string;
  description: string;
  image_url?: string;
  project_url?: string;
  github_url?: string;
  author_id: string;
  is_published: boolean;
}

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
  <div
    className="flip-card animate-zoom-in"
    style={{ "--delay": `${index * 100}ms` } as React.CSSProperties}
  >
    <div className="flip-card-inner">
      <div className="flip-card-front bg-slate-300/30 backdrop-blur-md shadow-lg">
        {project.image_url && <img src={project.image_url} alt={project.title} className="w-full h-48 object-cover"/>}
        <div className="p-6 flex-grow flex flex-col justify-center">
          <h3 className="text-2xl font-bold">{project.title}</h3>
        </div>
      </div>
      <div className="flip-card-back">
        <p className="text-slate-800 mb-4 text-sm">{project.description}</p>
        <div className="flex space-x-4">
          {project.project_url && (
            <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="bg-[#F4F754] text-slate-900 font-semibold py-2 px-4 rounded-md hover:bg-yellow-300 transition-colors">
              Demo
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="bg-slate-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-slate-700 transition-colors">
              Code
            </a>
          )}
          {!project.project_url && !project.github_url && (
              <span className="text-slate-500 font-semibold py-2 px-4 rounded-md bg-gray-200/50">Coming Soon</span>
          )}
        </div>
      </div>
    </div>
  </div>
);

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true) // Only fetch published projects
        .order('created_at', { ascending: false }); // Order by creation date

      if (error) {
        console.error('Error fetching projects:', error.message);
        setError('Failed to load projects.');
      } else {
        setProjects(data || []);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p className="text-xl font-semibold">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">My Projects</h1>
        <p className="w-full md:w-2/3 mx-auto text-slate-700 text-lg">
          Here are some of the projects I've worked on. Each one was a unique challenge and a great learning experience.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length === 0 ? (
          <p className="text-center text-xl col-span-full">No published projects yet. Check back soon!</p>
        ) : (
          projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
