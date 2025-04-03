import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  slug: string;
  image: string;
}

const projects: Project[] = [
  {
    title: 'Proxmox Lab: Game of Active Directory',
    description: 'In this project, we\'ll be using deployment tools and scripts shared by m4yfly to standup and configure Game of Active Directory (GOAD) v3 in the environment set up in my original Proxmox Lab series.',
    slug: 'proxmox-goad',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1000'
  },
  {
    title: 'IT and Cybersecurity Learning Path',
    description: 'In this post, I suggest a path of free resources that newcomers to IT and cybersecurity can follow to build a solid set of foundational skills to secure their careers.',
    slug: 'it-cybersecurity-path',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=1000'
  },
  {
    title: 'Installing Proxmox on a Laptop and Building a Cybersecurity Lab',
    description: 'In this project, broken up into multiple modules, you will build a comprehensive cybersecurity home lab using Proxmox VE. Upon completion, you will have an environment where you can safely practice penetration testing against a variety of targets, as well as detection in your SIEM.',
    slug: 'proxmox-laptop-lab',
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=1000'
  },
  {
    title: 'Building a Security Lab in VirtualBox',
    description: 'In this project, broken up into multiple modules, you will build a comprehensive penetration testing lab using VirtualBox. Upon completion, you will have an environment where you can safely practice penetration testing against a variety of targets.',
    slug: 'virtualbox-security-lab',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000'
  }
];

const Projects: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A192F] py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 text-gray-400 mb-8">
          <Link to="/" className="hover:text-accent">HOME</Link>
          <span>/</span>
          <span>PROJECTS</span>
        </div>

        <h1 className="text-4xl font-mono text-white mb-12">Projects</h1>
        
        <div className="space-y-8">
          {projects.map((project, index) => (
            <Link
              key={index}
              to={`/projects/${project.slug}`}
              className="block group"
            >
              <article className="bg-[#0d1117] rounded-lg overflow-hidden border border-gray-800">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8">
                    <h2 className="text-2xl font-mono text-white mb-4 group-hover:text-[#00FF00] transition-colors">
                      {project.title}
                    </h2>
                    
                    <p className="text-gray-400 mb-6">
                      {project.description}
                    </p>

                    <div className="flex items-center text-[#00FF00] font-mono">
                      Read more
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>

                  <div className="relative h-64 md:h-auto">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;