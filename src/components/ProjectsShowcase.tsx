import React from 'react';
import { Shield, Activity, FileSearch, ExternalLink, Terminal, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectsShowcase: React.FC = () => {
  const projects = [
    {
      title: 'Synkro (Enterprise SIEM Implementation)',
      icon: Shield,
      description: 'Elastic Stack deployment on Kubernetes cluster with automated threat detection systems',
      metrics: [
        'Custom correlation rules aligned with MITRE ATT&CK',
        'Real-time threat intelligence integration',
        'Automated incident response playbooks',
        'Centralized logging for multi-cloud environments'
      ],
      tags: ['Elastic Stack', 'Kubernetes', 'Threat Hunting', 'NIST Framework'],
      demoUrl: '/projects/synkro',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=1000'
    },
    {
      title: 'Cybersecurity  Lab',
      icon: Activity,
      description: 'Hybrid SOC environment with offensive/defensive security operations',
      metrics: [
        'Network segmentation strategies with pfSense',
        'Active Directory privilege escalation simulations',
        'Suricata IDS rule development',
        'Vulnerability exploitation documentation'
      ],
      tags: ['Kali Linux', 'OWASP Top 10', 'pfSense', 'Windows AD'],
      demoUrl: '/projects/security-lab',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1000'
    },
    {
      title: 'Malware Analysis Lab',
      icon: FileSearch,
      description: 'Advanced malware research environment with reverse engineering capabilities',
      metrics: [
        'Static/Dynamic analysis workflows',
        'MITRE ATT&CK technique mapping',
        'Sandboxed analysis environment',
        'IOC extraction and correlation'
      ],
      tags: ['REMnux', 'FlareVM', 'Digital Forensics', 'YARA Rules'],
      demoUrl: '/projects/malware-analysis-lab',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-white">Projects</h2>
          <Link 
            to="/projects"
            className="flex items-center text-accent hover:opacity-80 transition-opacity"
          >
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
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
                  View Technical Details
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