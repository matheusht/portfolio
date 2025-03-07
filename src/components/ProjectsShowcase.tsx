import React from 'react';
import { Shield, Activity, FileSearch, ExternalLink, Terminal } from 'lucide-react';

const ProjectsShowcase: React.FC = () => {
  const projects = [
    {
      title: 'Enterprise SIEM Implementation',
      icon: Shield,
      description: 'Complete Elastic Stack deployment with custom detection rules and automated response playbooks',
      metrics: [
        'Custom correlation rules for APT detection',
        'Real-time threat intelligence integration',
        'Automated incident response workflows'
      ],
      tags: ['Elastic Stack', 'Kubernetes', 'Python Automation'],
      demoUrl: '#',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=1000'
    },
    {
      title: 'Network IDS/IPS System Lab',
      icon: Activity,
      description: 'Suricata-based intrusion detection system with custom rulesets for C2 traffic detection',
      metrics: [
        'Custom C2 detection signatures',
        'Network traffic baseline analysis',
        'Automated blocking responses'
      ],
      tags: ['Suricata', 'Network Security', 'Traffic Analysis'],
      demoUrl: '#',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1000'
    },
    {
      title: 'Phishing Campaign Analysis',
      icon: FileSearch,
      description: 'Comprehensive analysis of APT phishing tactics with comparison to TA505 techniques',
      metrics: [
        'IOC extraction and correlation',
        'MITRE ATT&CK mapping',
        'Automated analysis pipeline'
      ],
      tags: ['Threat Intel', 'OSINT', 'MITRE ATT&CK'],
      demoUrl: '#',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-[#0A192F]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Project Showcase</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <project.icon className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                </div>
                
                <p className="text-gray-300 mb-4">
                  {project.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  {project.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-300">
                      <Terminal className="w-4 h-4 mr-2 text-accent" />
                      {metric}
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <a
                  href={project.demoUrl}
                  className="inline-flex items-center text-accent hover:opacity-80 transition-opacity"
                >
                  View Demo
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;