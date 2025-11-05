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

interface AdminProjectManagementProps {
  userId: string;
}

const AdminProjectManagement: React.FC<AdminProjectManagementProps> = ({ userId }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [newProjectProjectUrl, setNewProjectProjectUrl] = useState('');
  const [newProjectGithubUrl, setNewProjectGithubUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, [userId]);

  const fetchProjects = async () => {
    setLoadingProjects(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('author_id', userId) // Fetch only projects by the current user
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error.message);
    } else {
      setProjects(data || []);
    }
    setLoadingProjects(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    } else {
      setSelectedImage(null);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    setUploadingImage(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('blog-images') // Reusing blog-images bucket for simplicity
      .upload(filePath, file);

    setUploadingImage(false);

    if (uploadError) {
      setFormError(uploadError.message);
      console.error('Error uploading image:', uploadError.message);
      return null;
    }

    const { data } = supabase.storage.from('blog-images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleCreateProject = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);

    if (!newProjectTitle || !newProjectDescription) {
      setFormError('Title and description cannot be empty.');
      return;
    }

    let imageUrl: string | null = null;
    if (selectedImage) {
      imageUrl = await uploadImage(selectedImage);
      if (!imageUrl) {
        return;
      }
    }

    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          title: newProjectTitle,
          description: newProjectDescription,
          project_url: newProjectProjectUrl,
          github_url: newProjectGithubUrl,
          image_url: imageUrl,
          author_id: userId,
          is_published: true, // Default to published
        },
      ])
      .select();

    if (error) {
      setFormError(error.message);
      console.error('Error creating project:', error.message);
    } else {
      setProjects([...projects, data[0]]);
      setNewProjectTitle('');
      setNewProjectDescription('');
      setNewProjectProjectUrl('');
      setNewProjectGithubUrl('');
      setSelectedImage(null);
      const fileInput = document.getElementById('projectImage') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }
    const projectToDelete = projects.find(p => p.id === projectId);
    if (projectToDelete?.image_url) {
      const filePath = projectToDelete.image_url.split('blog-images/')[1]; // Assuming same bucket
      if (filePath) {
        const { error: deleteImageError } = await supabase.storage.from('blog-images').remove([filePath]);
        if (deleteImageError) {
          console.error('Error deleting image from storage:', deleteImageError.message);
        }
      }
    }

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (error) {
      console.error('Error deleting project:', error.message);
    } else {
      setProjects(projects.filter((project) => project.id !== projectId));
    }
  };

  const handleEditProject = (projectId: string) => {
    console.log('Edit project:', projectId);
    alert('Edit functionality coming soon!');
  };

  if (loadingProjects) {
    return <div className="text-center text-slate-700">Loading projects...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="bg-white/30 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-5 text-slate-800">Create New Project</h3>
        <form onSubmit={handleCreateProject} className="space-y-5">
          <div>
            <label htmlFor="projectTitle" className="block text-slate-700 text-sm font-semibold mb-2">Title:</label>
            <input
              type="text"
              id="projectTitle"
              value={newProjectTitle}
              onChange={(e) => setNewProjectTitle(e.target.value)}
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#F4F754] focus:border-transparent transition-all duration-200"
              placeholder="Enter project title"
              required
            />
          </div>
          <div>
            <label htmlFor="projectDescription" className="block text-slate-700 text-sm font-semibold mb-2">Description:</label>
            <textarea
              id="projectDescription"
              value={newProjectDescription}
              onChange={(e) => setNewProjectDescription(e.target.value)}
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#F4F754] focus:border-transparent transition-all duration-200 h-32"
              placeholder="Enter project description"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="projectProjectUrl" className="block text-slate-700 text-sm font-semibold mb-2">Project URL (Live Demo):</label>
            <input
              type="url"
              id="projectProjectUrl"
              value={newProjectProjectUrl}
              onChange={(e) => setNewProjectProjectUrl(e.target.value)}
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#F4F754] focus:border-transparent transition-all duration-200"
              placeholder="https://your-project-live-demo.com"
            />
          </div>
          <div>
            <label htmlFor="projectGithubUrl" className="block text-slate-700 text-sm font-semibold mb-2">GitHub URL:</label>
            <input
              type="url"
              id="projectGithubUrl"
              value={newProjectGithubUrl}
              onChange={(e) => setNewProjectGithubUrl(e.target.value)}
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#F4F754] focus:border-transparent transition-all duration-200"
              placeholder="https://github.com/your-username/your-project"
            />
          </div>
          <div>
            <label htmlFor="projectImage" className="block text-slate-700 text-sm font-semibold mb-2">Featured Image:</label>
            <input
              type="file"
              id="projectImage"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#F4F754] file:text-slate-800 hover:file:bg-[#e0e34a] transition-colors duration-200"
            />
            {selectedImage && <p className="text-sm text-slate-600 mt-2">Selected: {selectedImage.name}</p>}
          </div>
          {formError && <p className="text-red-500 text-sm text-center">{formError}</p>}
          <button
            type="submit"
            disabled={uploadingImage}
            className="w-full bg-slate-800 hover:bg-slate-900 text-[#F4F754] font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploadingImage ? 'Uploading Image...' : 'Create Project'}
          </button>
        </form>
      </div>

      <div className="bg-white/30 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-5 text-slate-800">Your Projects</h3>
        {projects.length === 0 ? (
          <p className="text-slate-600">No projects found. Create your first project above!</p>
        ) : (
          <ul className="space-y-4">
            {projects.map((project) => (
              <li key={project.id} className="bg-white/50 p-4 rounded-lg shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-grow">
                  <h4 className="text-xl font-bold text-slate-800 mb-1">{project.title}</h4>
                  {project.image_url && <img src={project.image_url} alt={project.title} className="w-32 h-auto my-2 rounded-md shadow-sm" />}
                  <p className="text-slate-700 text-sm">{project.description.substring(0, 100)}...</p>
                  <p className="text-slate-500 text-xs mt-1">Published: {project.is_published ? 'Yes' : 'No'}</p>
                  {project.project_url && <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm block">Live Demo</a>}
                  {project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm block">GitHub</a>}
                </div>
                <div className="flex space-x-2 mt-3 sm:mt-0">
                  <button
                    onClick={() => handleEditProject(project.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-lg text-sm transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg text-sm transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminProjectManagement;