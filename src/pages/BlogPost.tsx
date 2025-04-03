import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Clock, Calendar, ArrowLeft } from 'lucide-react';
import TableOfContents from '../components/TableOfContents';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Example headings - in a real app, these would be generated from the MDX content
  const headings = [
    { id: 'introduction', text: 'Introduction', level: 2 },
    { id: 'setup', text: 'Setup', level: 2 },
    { id: 'prerequisites', text: 'Prerequisites', level: 3 },
    { id: 'installation', text: 'Installation', level: 3 },
    { id: 'configuration', text: 'Configuration', level: 2 },
    { id: 'usage', text: 'Usage', level: 2 },
    { id: 'conclusion', text: 'Conclusion', level: 2 }
  ];

  // This would normally fetch the post content from your MDX files
  const post = {
    title: 'Code',
    platform: 'HackTheBox',
    challenge: 'Code',
    author: 'matheusht',
    date: '2025-03-26',
    readTime: '9 min read',
    content: 'Coming soon...',
    tags: ['Web App', 'PHP', 'RCE']
  };

  return (
    <div className="min-h-screen bg-[#0A192F] py-20">
      <div className="container mx-auto px-4">
        <Link
          to="/blog"
          className="inline-flex items-center text-accent hover:opacity-80 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <article className="prose prose-invert max-w-none">
          <div className="mb-8">
            <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
              {post.platform}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-6 text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-accent/10 text-accent text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="text-gray-300">
            {post.content}
          </div>
        </article>

        <TableOfContents headings={headings} />
      </div>
    </div>
  );
};

export default BlogPost;