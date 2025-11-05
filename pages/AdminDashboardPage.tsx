import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import AdminProjectManagement from '../components/AdminProjectManagement';

interface Post {
  id: string;
  created_at: string;
  title: string;
  content: string;
  author_id: string;
  is_published: boolean;
  image_url?: string; 
}

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [activeTab, setActiveTab] = useState<'blog' | 'projects'>('blog'); // New state for tabs

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/admin/login');
      } else {
        setUser(user);
        fetchPosts(user.id);
      }
      setLoading(false);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/admin/login');
      } else {
        setUser(session.user);
        fetchPosts(session.user.id);
      }
    });

    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, [navigate]);

  const fetchPosts = async (authorId: string) => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('author_id', authorId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error.message);
    } else {
      setPosts(data || []);
    }
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
      .from('blog-images')
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

  const handleCreatePost = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);

    if (!newPostTitle || !newPostContent) {
      setFormError('Title and content cannot be empty.');
      return;
    }

    if (!user) {
      setFormError('User not authenticated.');
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
      .from('posts')
      .insert([
        { title: newPostTitle, content: newPostContent, author_id: user.id, is_published: true, image_url: imageUrl },
      ])
      .select();

    if (error) {
      setFormError(error.message);
      console.error('Error creating post:', error.message);
    } else {
      setPosts([...posts, data[0]]);
      setNewPostTitle('');
      setNewPostContent('');
      setSelectedImage(null);
      const fileInput = document.getElementById('postImage') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }
    const postToDelete = posts.find(p => p.id === postId);
    if (postToDelete?.image_url) {
      const filePath = postToDelete.image_url.split('blog-images/')[1];
      if (filePath) {
        const { error: deleteImageError } = await supabase.storage.from('blog-images').remove([filePath]);
        if (deleteImageError) {
          console.error('Error deleting image from storage:', deleteImageError.message);
        }
      }
    }

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);

    if (error) {
      console.error('Error deleting post:', error.message);
    } else {
      setPosts(posts.filter((post) => post.id !== postId));
    }
  };

  const handleEditPost = (postId: string) => {
    console.log('Edit post:', postId);
    alert('Edit functionality coming soon!');
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-128px)] text-xl font-semibold">Loading admin dashboard...</div>;
  }

  if (!user) {
    return null; 
  }

  return (
    <div className="admin-dashboard-container p-8 bg-[#BFABD4] min-h-[calc(100vh-128px)]">
      <div className="max-w-4xl mx-auto bg-white/20 backdrop-blur-md p-8 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800">Welcome, {user.email}!</h2>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate('/admin/login');
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Logout
          </button>
        </div>

        <p className="text-slate-700 mb-10">Manage your content here.</p>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-300 mb-8">
          <button
            className={`py-2 px-4 text-lg font-medium ${activeTab === 'blog' ? 'border-b-2 border-[#F4F754] text-slate-800' : 'text-slate-600 hover:text-slate-800'}`}
            onClick={() => setActiveTab('blog')}
          >
            Blog Posts
          </button>
          <button
            className={`py-2 px-4 text-lg font-medium ${activeTab === 'projects' ? 'border-b-2 border-[#F4F754] text-slate-800' : 'text-slate-600 hover:text-slate-800'}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
        </div>

        {/* Conditional Rendering based on activeTab */}
        {activeTab === 'blog' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Create New Blog Post Section */}
            <div className="bg-white/30 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-5 text-slate-800">Create New Blog Post</h3>
              <form onSubmit={handleCreatePost} className="space-y-5">
                <div>
                  <label htmlFor="postTitle" className="block text-slate-700 text-sm font-semibold mb-2">Title:</label>
                  <input
                    type="text"
                    id="postTitle"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#F4F754] focus:border-transparent transition-all duration-200"
                    placeholder="Enter post title"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="postContent" className="block text-slate-700 text-sm font-semibold mb-2">Content:</label>
                  <textarea
                    id="postContent"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#F4F754] focus:border-transparent transition-all duration-200 h-32"
                    placeholder="Enter post content"
                    required
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="postImage" className="block text-slate-700 text-sm font-semibold mb-2">Featured Image:</label>
                  <input
                    type="file"
                    id="postImage"
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
                  {uploadingImage ? 'Uploading Image...' : 'Create Post'}
                </button>
              </form>
            </div>

            {/* Your Blog Posts Section */}
            <div className="bg-white/30 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-5 text-slate-800">Your Blog Posts</h3>
              {posts.length === 0 ? (
                <p className="text-slate-600">No posts found. Create your first post above!</p>
              ) : (
                <ul className="space-y-4">
                  {posts.map((post) => (
                    <li key={post.id} className="bg-white/50 p-4 rounded-lg shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex-grow">
                        <h4 className="text-xl font-bold text-slate-800 mb-1">{post.title}</h4>
                        {post.image_url && <img src={post.image_url} alt={post.title} className="w-32 h-auto my-2 rounded-md shadow-sm" />}
                        <p className="text-slate-700 text-sm">{post.content.substring(0, 100)}...</p>
                        <p className="text-slate-500 text-xs mt-1">Published: {post.is_published ? 'Yes' : 'No'}</p>
                      </div>
                      <div className="flex space-x-2 mt-3 sm:mt-0">
                        <button
                          onClick={() => handleEditPost(post.id)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-lg text-sm transition-colors duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
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
        )}

        {activeTab === 'projects' && user && (
          <AdminProjectManagement userId={user.id} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;