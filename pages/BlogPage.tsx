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

const BlogCard: React.FC<{ post: BlogPost; index: number }> = ({ post, index }) => (
  <div
    className="flip-card animate-zoom-in"
    style={{ "--delay": `${index * 100}ms` } as React.CSSProperties}
  >
    <div className="flip-card-inner">
      <div className="flip-card-front bg-slate-300/30 backdrop-blur-md shadow-lg">
        {post.image_url && <img src={post.image_url} alt={post.title} className="w-full h-48 object-cover"/>}
        <div className="p-6 flex-grow flex flex-col justify-center">
          <h3 className="text-2xl font-bold">{post.title}</h3>
        </div>
      </div>
      <div className="flip-card-back">
        <p className="text-slate-800 mb-4 text-sm">{post.content.substring(0, 150)}...</p>
        <NavLink to={`/blog/${post.id}`} className="bg-[#F4F754] text-slate-900 font-semibold py-2 px-4 rounded-md hover:bg-yellow-300 transition-colors">
          Read More &rarr;
        </NavLink>
      </div>
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
          posts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))
        )}
      </div>
       {/* Removed "View All Posts" as all are displayed or will be paginated later */}
    </div>
  );
};

export default BlogPage;
