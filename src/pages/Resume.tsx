import React from 'react';
import { Shield, Server, Network, Code, Terminal, ExternalLink } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  items: string[];
}

interface Certification {
  name: string;
  provider: string;
  logo: string;
  link: string;
}

const certifications: Certification[] = [
  {
    name: "Security+",
    provider: "CompTIA",
    logo: "https://www.comptia.org/images/default-source/memberbuttons/securityplus-badge.png",
    link: "https://www.comptia.org/certifications/security"
  },
  {
    name: "OSCP",
    provider: "Offensive Security",
    logo: "https://www.offensive-security.com/wp-content/uploads/2021/07/OSCP-badge.png",
    link: "https://www.offensive-security.com/pwk-oscp/"
  }
];

const skillCategories: SkillCategory[] = [
  {
    title: "Infrastructure",
    icon: Server,
    items: [
      "Cloud Providers (AWS | Azure)",
      "DevOps Tools (Terraform | Ansible  )",
      "Enterprise Services (Database | DNS | SMTP | Web)",
      "Hypervisors (VirtualBox | VMWare)",
      "Identity Providers (Active Directory)",
      "Single Sign-On Configuration (SAML | SCIM | OAuth | OpenID)"
    ]
  },
  {
    title: "Networking",
    icon: Network,
    items: [
      "IP Masking (Proxies | Tor | VPN)",
      "Network Engineering (Routing | Switching | VLANs)",
      "Protocol Analysis (Wireshark | Zeek)"
    ]
  },
  {
    title: "Operating Systems",
    icon: Terminal,
    items: [
      "Server Operating Systems (BSD | Linux | Windows)",
      "Desktop Operating Systems (Linux | Mac OS | Windows)"
    ]
  },
  {
    title: "Programming",
    icon: Code,
    items: [
      "Scripting Languages (Bash | PowerShell | Python )"
    ]
  },
  {
    title: "Security",
    icon: Shield,
    items: [
      "Endpoint Monitoring (Wazuh)",
      "Ethical Hacking",
      "Firewalls (pfSense)",
      "Incident Response and Remediation",
      "Intrusion Detection Systems (Suricata)",
      "Security Assessment Tools (Burp Suite | Kali Linux | Metasploit | Nmap | Nessus)",
      "SIEM (Wazuh | Elastic Stack)"
    ]
  }
];

const Resume: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A192F] pt-20">
      <div className="container mx-auto px-4">
        <section className="mb-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">About</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Extensive on-premise and cloud systems, networking, and automation experience. Embraces DevSecOps and agile mindsets. Well-versed in the penetration testing lifecycle, as well as pentesting tools and methodologies. Knowledgeable on defensive security concepts including SIEM, HIDS, NIDS, and threat hunting. Maintains a Proxmox home lab cluster to research and test a wide variety of topics.
          </p>
        </section>

        <section className="mb-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Experience</h2>
          <div className="text-gray-300">
            <h3 className="text-xl font-semibold mb-2">Security Engineer (DevSecOps)</h3>
            <p className="text-accent mb-1">Marketisa</p>
            <p className="text-sm">Sep 2023 – Present</p>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {certifications.map((cert, index) => (
              <a
                key={index}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center bg-white/5 rounded-lg p-4 border border-accent/20 hover:border-accent transition-colors"
              >
                <div className="flex-shrink-0 w-16 h-16 mr-4">
                  <img 
                    src={cert.logo}
                    alt={`${cert.name} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-white group-hover:text-accent transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-gray-400">{cert.provider}</p>
                </div>
                <ExternalLink className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
              </a>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Education</h2>
          <div className="text-gray-300">
            <h3 className="text-xl font-semibold mb-2">Technical School in System Analysis and Computing</h3>
            <p className="mb-1">Campo Mourão, Paraná</p>
            <p className="mb-1">Integrated High School with Technical Diploma in IT</p>
            <p className="text-sm">Expected Graduation: Dec 2025</p>
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-12 text-center">Technical Skills</h2>
          <div className="space-y-12">
            {skillCategories.map((category, index) => (
              <section key={index}>
                <h3 className="text-xl font-mono text-white mb-6 flex items-center">
                  <category.icon className="w-6 h-6 mr-3 text-accent" />
                  {category.title}
                </h3>
                <ul className="space-y-3 text-gray-300 font-mono">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;