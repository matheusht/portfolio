import React from 'react';
import { Award, BookOpen, CheckCircle, Clock } from 'lucide-react';

const CertificationCarousel: React.FC = () => {
  const certifications = [
    {
      name: 'CompTIA Security+',
      progress: 70,
      status: 'In Progress',
      focusAreas: ['Threat Detection', 'Cryptography'],
      objectives: [
        'Network Security',
        'Compliance and Operational Security',
        'Threats and Vulnerabilities',
        'Application, Data and Host Security',
        'Access Control and Identity Management',
        'Cryptography'
      ],
      expectedDate: '2025-05'
    },
    {
      name: 'AWS Cloud Practitioner',
      progress: 20,
      status: 'In Progress',
      focusAreas: ['Cloud Security', 'AWS Services'],
      objectives: [
        'Cloud Concepts',
        'Security and Compliance',
        'Technology',
        'Billing and Pricing'
      ],
      expectedDate: '2025-04'
    },
    {
      name: 'eJPT',
      progress: 0,
      status: 'Planned',
      focusAreas: ['Penetration Testing', 'Ethical Hacking '],
      objectives: [
        'Network Pentesting',
        'Infrastructure Pentesting',
        'Web Pentesting',
        'Ethical Hacking'
      ],
      expectedDate: '2025-08'
    }
  ];

  return (
    <section id="certifications" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Certifications</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-xl p-6 shadow-lg backdrop-blur-lg hover:shadow-xl transition-shadow group"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Award className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-semibold text-white">{cert.name}</h3>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-accent font-semibold">{cert.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full transition-all duration-500"
                    style={{ width: `${cert.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">
                  Expected: {cert.expectedDate}
                </span>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2 text-white">Current Focus:</h4>
                <div className="flex flex-wrap gap-2">
                  {cert.focusAreas.map((area, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="hidden group-hover:block">
                <h4 className="text-sm font-semibold mb-2 text-white">Exam Objectives:</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  {cert.objectives.map((objective, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationCarousel;