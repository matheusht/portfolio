import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

interface Post {
  title: string;
  platform: string;
  challenge: string;
  author: string;
  date: string;
  readTime: string;
  slug: string;
}

const posts: Post[] = [
  {
    title: 'Checker',
    platform: 'HACKTHEBOX',
    challenge: 'HackTheBox | Checker',
    author: 'matheusht',
    date: 'Feb 26, 2025',
    readTime: '18 min read',
    slug: 'htb-checker'
  },
  {
    title: 'Titanic',
    platform: 'HACKTHEBOX',
    challenge: 'HackTheBox | Titanic',
    author: 'matheusht',
    date: 'Feb 18, 2025',
    readTime: '12 min read',
    slug: 'htb-titanic'
  },
  {
    title: 'Cat',
    platform: 'HACKTHEBOX',
    challenge: 'HackTheBox | Cat',
    author: 'matheusht',
    date: 'Feb 8, 2025',
    readTime: '19 min read',
    slug: 'htb-cat'
  },
  {
    title: 'BigBang',
    platform: 'HACKTHEBOX',
    challenge: 'HackTheBox | BigBang',
    author: 'matheusht',
    date: 'Jan 31, 2025',
    readTime: '33 min read',
    slug: 'htb-bigbang'
  },
  {
    title: 'Backfire',
    platform: 'HACKTHEBOX',
    challenge: 'HackTheBox | Backfire',
    author: 'matheusht',
    date: 'Jan 25, 2025',
    readTime: '15 min read',
    slug: 'htb-backfire'
  },
  {
    title: 'Wazuh SIEM to Security Lab',
    platform: 'VIRTUALBOX',
    challenge: 'VirtualBox | Lab Setup',
    author: 'matheusht',
    date: 'Feb 5, 2025',
    readTime: '15 min read',
    slug: 'virtualbox-wazuh-setup'
  }
];

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A192F] py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 text-gray-400 mb-8">
          <Link to="/" className="hover:text-accent">HOME</Link>
          <span>/</span>
          <span>BLOG</span>
        </div>

        <h1 className="text-4xl font-mono text-white mb-12">Blog</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link
              key={index}
              to={`/blog/${post.slug}`}
              className="group relative bg-[#0d1117] rounded-lg overflow-hidden border border-gray-800"
            >
              <div className="absolute top-4 right-4 z-10">
                <div className="w-8 h-8 bg-[#0d1117] rounded-full border border-gray-800 flex items-center justify-center">
                  <span className="text-gray-400">🔒</span>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <span className="text-[#00FF00] text-sm font-mono">
                    {post.platform}
                  </span>
                </div>

                <h2 className="text-2xl font-mono text-white mb-2 group-hover:text-accent-hover transition-colors">
                  {post.title}
                </h2>
                
                <h3 className="text-gray-400 font-mono mb-4">
                  {post.challenge}
                </h3>

                <div className="flex items-center gap-4 text-sm text-gray-400 font-mono">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;