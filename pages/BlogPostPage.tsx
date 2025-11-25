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
  image_url?: string;
}

interface DisplayPostDetail extends BlogPost {
  authorName: string;
  authorAvatar: string;
  readTime: string;
  claps: string;
  comments: number;
}

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<DisplayPostDetail | null>(null);
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
        // Mock data for UI
        const mockedPost: DisplayPostDetail = {
          ...data,
          authorName: 'ZIRU', // Mocked as per image
          authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ziru',
          readTime: '7 min read',
          claps: '3.5K',
          comments: 148,
        };
        setPost(mockedPost);
      } else {
        setError('Post not found or not published.');
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500">
        <p className="text-xl font-semibold">{error}</p>
      </div>
    );
  }

  if (!post) return null;

  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="bg-white min-h-screen pt-12 pb-24">
      <div className="max-w-[680px] mx-auto px-4 sm:px-6">

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
          {post.title}
        </h1>

        {/* Author Block */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img
              src={post.authorAvatar}
              alt={post.authorName}
              className="w-11 h-11 rounded-full border border-gray-100"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">{post.authorName}</span>
                <button className="text-green-600 text-sm font-medium hover:text-green-700">Follow</button>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{post.readTime}</span>
                <span>·</span>
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>

          {/* Social Links (Optional for desktop, maybe hidden on small mobile) */}
          <div className="flex items-center gap-4 text-gray-500">
            {/* Icons can go here if needed */}
          </div>
        </div>

        {/* Top Action Bar */}
        <div className="flex items-center justify-between border-y border-gray-100 py-3 mb-8">
          <div className="flex items-center gap-6 text-gray-500">
            <button className="flex items-center gap-2 hover:text-gray-900 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 11v 8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
              </svg>
              <span className="text-sm font-medium">{post.claps}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-gray-900 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span className="text-sm font-medium">{post.comments}</span>
            </button>
          </div>
          <div className="flex items-center gap-5 text-gray-500">
            <button className="hover:text-gray-900"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg></button>
            <button className="hover:text-gray-900"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg></button>
            <button className="hover:text-gray-900"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg></button>
          </div>
        </div>

        {/* Featured Image */}
        {post.image_url && (
          <figure className="mb-10 -mx-4 sm:mx-0">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-auto object-cover sm:rounded-lg"
            />
            <figcaption className="text-center text-sm text-gray-500 mt-3">
              Photo by <a href="#" className="underline">Unsplash</a>
            </figcaption>
          </figure>
        )}

        {/* Content */}
        <div className="prose prose-lg prose-slate max-w-none 
          prose-headings:font-bold prose-headings:text-gray-900 
          prose-p:text-gray-800 prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-lg prose-strong:text-gray-900">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* Bottom Tags / Footer */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <div className="flex flex-wrap gap-2 mb-8">
            {['Programming', 'Web Development', 'Productivity', 'Coding'].map(tag => (
              <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 11v 8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" /></svg>
                <span className="font-medium">{post.claps}</span>
              </button>
              <div className="h-4 w-px bg-gray-300"></div>
              <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                {post.comments} comments
              </button>
            </div>
            <div className="flex gap-2">
              {/* More actions */}
            </div>
          </div>
        </div>

      </div>
    </article>
  );
};

export default BlogPostPage;
