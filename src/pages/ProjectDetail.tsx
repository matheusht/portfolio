import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // This would normally fetch project data from your content system
  const project = {
    title: 'PROXNOX',
    subtitle: 'Proxmox Lab: Game of Active Directory',
    description: 'In this project, we\'ll be using deployment tools and scripts shared by m4yfly to standup and configure Game of Active Directory (GOAD) v3 in the environment set up in my original Proxmox Lab series.',
    objective: 'Create a comprehensive Active Directory lab environment for security testing and learning.',
    technicalStack: [
      'Proxmox VE 7.0',
      'Windows Server 2019',
      'PowerShell 7.0',
      'Ansible',
      'Git'
    ],
    implementation: [
      'Set up Proxmox VE host environment',
      'Deploy Windows Server VMs',
      'Configure Active Directory Domain Services',
      'Implement automation scripts',
      'Document testing scenarios'
    ],
    challenges: [
      'Resource optimization for multiple VMs',
      'Network segmentation setup',
      'Automation of deployment process'
    ],
    repository: 'https://github.com/example/proxmox-goad'
  };

  return (
    <div className="min-h-screen bg-[#0A192F] py-20">
      <div className="container mx-auto px-4">
        <Link
          to="/projects"
          className="inline-flex items-center text-accent hover:opacity-80 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>

        <article>
          <h1 className="text-4xl font-bold text-white mb-4">{project.title}</h1>
          <h2 className="text-2xl text-gray-300 mb-8">{project.subtitle}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <a
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-accent/20 text-accent rounded-lg hover:bg-accent/30 transition-colors"
            >
              <Github className="w-5 h-5" />
              View Repository
            </a>
          </div>

          <div className="space-y-12">
            <section>
              <h3 className="text-2xl font-bold text-white mb-4">Objective</h3>
              <p className="text-gray-300">{project.objective}</p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-white mb-4">Technical Stack</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.technicalStack.map((tech, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    {tech}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-white mb-4">Implementation Process</h3>
              <div className="space-y-4">
                {project.implementation.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 text-gray-300"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/20 text-accent">
                      {index + 1}
                    </span>
                    <p className="flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-white mb-4">Key Challenges</h3>
              <div className="space-y-4">
                {project.challenges.map((challenge, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white/5 rounded-lg text-gray-300"
                  >
                    {challenge}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ProjectDetail;