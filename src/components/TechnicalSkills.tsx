import React from 'react';
import { Shield, Code, FileCode, Network, Database } from 'lucide-react';

const TechnicalSkills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Core Tools',
      icon: Shield,
      skills: [
        { name: 'Elastic Stack', level: 85, description: 'SIEM Implementation & Management' },
        { name: 'Suricata', level: 80, description: 'IDS/IPS Configuration' },
        { name: 'Wireshark', level: 90, description: 'Network Analysis' },
        { name: 'Nmap', level: 85, description: 'Network Scanning' }
      ]
    },
    {
      title: 'Programming',
      icon: Code,
      skills: [
        { name: 'Python', level: 75, description: 'Pandas, Requests, Automation' },
        { name: 'Bash', level: 70, description: 'Shell Scripting' },
        { name: 'PowerShell', level: 65, description: 'Windows Automation' }
      ]
    },
    {
      title: 'Frameworks',
      icon: FileCode,
      skills: [
        { name: 'ISO 27001', level: 60, description: 'Security Standards' },
        { name: 'MITRE ATT&CK', level: 75, description: 'Threat Modeling' },
        { name: 'NIST', level: 65, description: 'Security Framework' }
      ]
    }
  ];

  const achievements = [
    {
      platform: 'TryHackMe',
      rank: 'SOC Level 1',
      completed: 45,
      progress: 85,
      icon: Network
    },
    {
      platform: 'Hack The Box',
      rank: 'Defensive Path',
      completed: 25,
      progress: 70,
      icon: Database
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white dark:bg-primary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Technical Skills</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="bg-gray-50 dark:bg-white/5 rounded-xl p-6 backdrop-blur-lg">
              <div className="flex items-center space-x-3 mb-6">
                <category.icon className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-semibold dark:text-white">{category.title}</h3>
              </div>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIdx) => (
                  <div key={skillIdx}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-accent">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all duration-500 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 block">
                      {skill.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8 dark:text-white">Platform Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-white/5 rounded-xl p-6 backdrop-blur-lg"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <achievement.icon className="w-6 h-6 text-accent" />
                  <h4 className="text-lg font-semibold dark:text-white">{achievement.platform}</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-300">{achievement.rank}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      Completed: {achievement.completed} modules
                    </span>
                    <span className="text-accent">{achievement.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-500 rounded-full"
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;