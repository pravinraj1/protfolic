import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // Import supabase client
import { NavLink } from 'react-router-dom'; // Use NavLink for routing

interface BlogPost {
  id: string; // Changed to string to match UUID
  created_at: string;
  title: string;
  content: string;
  author_id: string;
  is_published: boolean;
  image_url?: string; // Added optional image_url
}

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <div className="bg-white/20 backdrop-blur-md rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2 group">
    {post.image_url && <img src={post.image_url} alt={post.title} className="w-full h-48 object-cover"/>}
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
      {/* Displaying a truncated version of content as excerpt */}
      <p className="text-slate-700 mb-4">{post.content.substring(0, 150)}...</p>
      <NavLink to={`/blog/${post.id}`} className="text-[#F4F754] bg-slate-800 px-4 py-2 rounded font-semibold hover:bg-slate-900 transition-colors">
        Read More &rarr;
      </NavLink>
    </div>
  </div>
);

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_published', true) // Only fetch published posts
        .order('created_at', { ascending: false }); // Order by creation date

      if (error) {
        console.error('Error fetching blog posts:', error.message);
        setError('Failed to load blog posts.');
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p className="text-xl font-semibold">Loading blog posts...</p>
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
        <h1 className="text-4xl font-bold mb-4">From the Blog</h1>
        <p className="w-full md:w-2/3 mx-auto text-slate-700 text-lg">
          I enjoy writing about web development, design, and technology. Here are some of my latest articles.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length === 0 ? (
          <p className="text-center text-xl col-span-full">No published blog posts yet. Check back soon!</p>
        ) : (
          posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))
        )}
      </div>
       {/* Removed "View All Posts" as all are displayed or will be paginated later */}
    </div>
  );
};

export default BlogPage;