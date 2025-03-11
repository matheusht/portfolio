import React from 'react';
import { BookOpen, Clock, ArrowRight, Terminal, Shield, Code } from 'lucide-react';

const BlogPreview: React.FC = () => {
  const blogPosts = [
    {
      title: 'Building a Low-Cost SIEM for Threat Hunting',
      preview: 'A comprehensive guide to setting up an enterprise-grade SIEM using open-source tools...',
      readTime: '15 min read',
      date: '2024-04-01',
      icon: Shield,
      tags: ['SIEM', 'Elastic Stack', 'Threat Hunting']
    },
    {
      title: 'Automating Log Analysis with Python Pandas',
      preview: 'Learn how to build automated log analysis pipelines using Python and Pandas...',
      readTime: '12 min read',
      date: '2024-04-15',
      icon: Code,
      tags: ['Python', 'Automation', 'Log Analysis']
    },
    {
      title: 'Advanced Suricata Rule Writing for C2 Detection',
      preview: 'Deep dive into creating custom Suricata rules for detecting command and control traffic...',
      readTime: '20 min read',
      date: '2024-05-01',
      icon: Terminal,
      tags: ['IDS/IPS', 'Network Security', 'Threat Detection']
    }
  ];

  return (
    <section id='blog' className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold dark:text-white">Latest Blog Posts</h2>
          <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
            Coming Soon
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-white/5 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow backdrop-blur-lg"
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <post.icon className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-semibold dark:text-white line-clamp-2">
                    {post.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {post.preview}
                </p>

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
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  
                  <button className="flex items-center text-accent hover:opacity-80 transition-opacity">
                    Read more
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;