"use client"

import type React from "react"
import { Mail, Linkedin, Github } from "lucide-react"
import { TypeAnimation } from "react-type-animation"
import { CyberMenuBar } from "./CyberMenuBar"
import CVModal from "./cv-modal"

const Header: React.FC = () => {



  return (
    <header className="w-full py-6 bg-[#0A192F]">
      <nav className="container mx-auto px-4 flex items-center justify-end">
        <CyberMenuBar />
      </nav>

      <div className="container mx-auto px-4 mt-20 text-center">
        <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-[#64FFDA]/10 flex items-center justify-center overflow-hidden p-1">
          <img
            src="https://avatars.githubusercontent.com/u/96798246?v=4"
            alt="GitHub Profile"
            className="w-full h-full rounded-full object-cover border-2 border-[#64FFDA]"
          />
        </div>

        <h1 className="text-4xl font-bold mb-4 text-white">Matheus Theodoro</h1>
        <h2 className="text-xl text-white mb-6">Cybersecurity Enthusiast | SIEM & Threat Detection</h2>

        <div className="h-12 mb-8">
          <TypeAnimation
            sequence={[
              "Building defensive systems to detect cyber threats",
              2000,
              "Analyzing and correlating security events",
              2000,
              "Implementing automated threat response",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Number.POSITIVE_INFINITY}
            className="text-lg text-white-700"
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
          <CVModal cvUrl={'https://drive.google.com/file/d/1VgkWV_IsZuPXg-BaqqMe7WnAy959tWJd/view?usp=sharing'} cvFilename={`Matheus_Theodoro_CV.pdf`} />
        </div>
      </div>
    </header>
  )
}

export default Header

