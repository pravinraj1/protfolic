import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

interface BlogPost {
  id: string;
  created_at: string;
  title: string;
  content: string;
  author_id: string;
  is_published: boolean;
  image_url?: string; // Added optional image_url
}

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        setError('Post ID is missing.');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .eq('is_published', true) // Ensure only published posts are viewable publicly
        .single();

      if (error) {
        console.error('Error fetching post:', error.message);
        setError('Failed to load post.');
      } else if (data) {
        setPost(data);
      } else {
        setError('Post not found or not published.');
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p className="text-xl font-semibold">Loading post...</p>
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

  if (!post) {
    return (
      <div className="py-12 text-center">
        <p className="text-xl font-semibold">Post not found.</p>
      </div>
    );
  }

  return (
    <div className="blog-post-container py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto bg-white/20 backdrop-blur-md rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">{post.title}</h1>
      <p className="text-gray-600 text-sm mb-6">Published on: {new Date(post.created_at).toLocaleDateString()}</p>
      {post.image_url && <img src={post.image_url} alt={post.title} className="w-full h-auto mb-6 rounded" />}
      <div className="prose lg:prose-xl text-gray-700 leading-relaxed">
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default BlogPostPage;