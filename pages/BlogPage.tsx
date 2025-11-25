import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { NavLink } from 'react-router-dom';

interface BlogPost {
  id: string;
  created_at: string;
  title: string;
  content: string;
  author_id: string;
  is_published: boolean;
  image_url?: string;
}

// Extended interface for UI display with mocked fields
interface DisplayPost extends BlogPost {
  authorName: string;
  authorAvatar: string;
  readTime: string;
  views: string;
  comments: number;
  category: string;
}

const MOCK_AUTHORS = [
  { name: 'Will Lockett', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Will' },
  { name: 'James Wilkins', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
  { name: 'Saurav Mandal', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Saurav' },
];

const BlogCard: React.FC<{ post: DisplayPost }> = ({ post }) => {
  // Format date to look like "Sep 15"
  const date = new Date(post.created_at);
  const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="flex flex-col md:flex-row gap-6 py-8 border-b border-gray-100 last:border-0 items-start">
      {/* Content Section */}
      <div className="flex-1 order-2 md:order-1">
        {/* Author Header */}
        <div className="flex items-center gap-2 mb-3">
          <img
            src={post.authorAvatar}
            alt={post.authorName}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm font-medium text-gray-900">{post.authorName}</span>
          {/* Optional: Add 'in Category' here if desired */}
        </div>

        {/* Title & Excerpt */}
        <NavLink to={`/blog/${post.id}`} className="group">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 leading-tight">
            {post.title}
          </h2>
          <p className="text-gray-500 text-base mb-4 line-clamp-2 md:line-clamp-3">
            {post.content}
          </p>
        </NavLink>

        {/* Footer Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-yellow-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{formattedDate}</span>
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {post.views}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {post.comments}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button className="hover:text-gray-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button className="hover:text-gray-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Thumbnail Section */}
      {post.image_url && (
        <div className="w-full md:w-48 h-32 md:h-32 flex-shrink-0 order-1 md:order-2">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      )}
    </div>
  );
};

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<DisplayPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error.message);
        setError('Failed to load blog posts.');
      } else {
        // Transform and mock data
        const transformedPosts: DisplayPost[] = (data || []).map((post, index) => ({
          ...post,
          authorName: MOCK_AUTHORS[index % MOCK_AUTHORS.length].name,
          authorAvatar: MOCK_AUTHORS[index % MOCK_AUTHORS.length].avatar,
          readTime: `${Math.floor(Math.random() * 10) + 3} min read`,
          views: `${(Math.random() * 20 + 1).toFixed(1)}K`,
          comments: Math.floor(Math.random() * 100),
          category: 'Technology',
        }));
        setPosts(transformedPosts);
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
    <div className="py-12 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        {/* Optional Search/Filter Header could go here */}

        <div className="flex flex-col">
          {posts.length === 0 ? (
            <p className="text-center text-xl text-gray-500 mt-10">No published blog posts yet.</p>
          ) : (
            posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
