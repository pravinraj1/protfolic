import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import ReactMarkdown from 'react-markdown';

interface BlogPost {
  id: string;
  created_at: string;
  title: string;
  content: string;
  author_id: string;
  is_published: boolean;
  image_url?: string; // This will be the main header image
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
        .eq('is_published', true)
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
    <article className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-800">{post.title}</h1>
        <p className="text-slate-600 text-md">
          Published on {new Date(post.created_at).toLocaleDateString()}
        </p>
      </div>

      {post.image_url && (
        <img 
          src={post.image_url} 
          alt={post.title} 
          className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-xl mb-12" 
        />
      )}

      <div className="bg-white/30 backdrop-blur-md rounded-lg shadow-lg p-6 md:p-10">
        <div className="prose-styles">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
};

export default BlogPostPage;
