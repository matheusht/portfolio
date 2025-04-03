import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, Shield, Terminal } from 'lucide-react';

const BlogPreview: React.FC = () => {
  const blogPosts = [
    {
      title: 'Code',
      platform: 'HackTheBox',
      challenge: 'Code',
      author: 'matheusht',
      date: '2025-03-26',
      readTime: '9 min read',
      slug: 'htb-code',
      icon: Shield,
      tags: ['Web App', 'PHP', 'RCE']
    },
    {
      title: 'TheFrizz',
      platform: 'HackTheBox',
      challenge: 'TheFrizz',
      author: 'matheusht',
      date: '2025-03-21',
      readTime: '19 min read',
      slug: 'htb-thefrizz',
      icon: Terminal,
      tags: ['Privilege Escalation', 'Linux', 'SUID']
    },
    {
      title: 'Dog',
      platform: 'HackTheBox',
      challenge: 'Dog',
      author: 'matheusht',
      date: '2025-03-10',
      readTime: '11 min read',
      slug: 'htb-dog',
      icon: Shield,
      tags: ['Container Escape', 'K8s', 'Docker']
    }
  ];

  return (
    <section id="blog" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-white">Latest Writeups</h2>
          <Link 
            to="/blog"
            className="flex items-center text-accent hover:opacity-80 transition-opacity"
          >
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Link
              key={index}
              to={`/blog/${post.slug}`}
              className="bg-white/5 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-105"
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                    {post.platform}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">
                  {post.title}
                </h3>
                
                <div className="text-sm text-gray-400 mb-4">
                  {post.platform} | {post.challenge}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;