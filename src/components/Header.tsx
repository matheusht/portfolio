import React from 'react';
import { Shield, Terminal,ExternalLink, Mail, Linkedin, Github } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { CyberMenuBar } from './CyberMenuBar';
import ScrollLink from './ScrollLink';


const Header: React.FC = () => {
  return (
    <header className="w-full py-6">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-[#64FFDA]" />
          <span className="text-xl font-bold">CyberPortfolio</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <CyberMenuBar />
          
          <button
            className="p-2 rounded-lg bg-gray-100 dark:bg-[#0A192F] transition-colors"
          >
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 mt-20 text-center">
        <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-[#0A192F] dark:bg-[#64FFDA]/10 flex items-center justify-center overflow-hidden p-1">
          <img 
            src="https://avatars.githubusercontent.com/u/96798246?v=4" 
            alt="GitHub Profile"
            className="w-full h-full rounded-full object-cover border-2 border-[#64FFDA]"
          />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">
          Matheus Theodoro
        </h1>
        <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          Blue Team Enthusiast | SIEM & Threat Detection {/*Specialist*/}
        </h2>
        
        <div className="h-12 mb-8">
          <TypeAnimation
            sequence={[
              'Building defensive systems to detect cyber threats',
              2000,
              'Analyzing and correlating security events',
              2000,
              'Implementing automated threat response',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-lg text-gray-700 dark:text-gray-300"
          />
        </div>

        <div className="flex justify-center space-x-6 mb-8">
          <a
            href="mailto:dev.matheustheodoro@gmail.com"
            className="flex items-center space-x-2 text-[#64FFDA] hover:opacity-80 transition-opacity"
          >
            <Mail className="w-5 h-5" />
            <span>Email</span>
          </a>
          
          <a
            href="https://linkedin.com/in/matheustheodoro1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-[#64FFDA] hover:opacity-80 transition-opacity"
          >
            <Linkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </a>
          
          <a
            href="https://github.com/matheusht"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-[#64FFDA] hover:opacity-80 transition-opacity"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
        </div>

        <div className="flex justify-center space-x-4">
          <ScrollLink
            to="cv"
            className="px-6 py-3 bg-[#64FFDA] text-[#0A192F] rounded-lg hover:opacity-90 transition-opacity flex items-center space-x-2"
          >
            <span>Review My CV</span>
            <ExternalLink className="w-4 h-4" />
          </ScrollLink>
        </div>
      </div>
    </header>
  );
};

export default Header;