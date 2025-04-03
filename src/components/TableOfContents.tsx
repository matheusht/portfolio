import React, { useState } from 'react';
import { Menu } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  headings: Heading[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed top-24 right-8 w-64 bg-[#0d1117] border border-gray-800 rounded-lg overflow-hidden">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-white font-mono text-sm">Table of Contents</h2>
        <Menu className={`w-4 h-4 text-[#64FFDA] transition-transform ${isOpen ? 'rotate-0' : 'rotate-180'}`} />
      </div>
      
      {isOpen && (
        <nav className="p-4 border-t border-gray-800">
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className={`
                    block text-sm font-mono
                    ${heading.level === 2 ? 'text-gray-300' : 'text-gray-500 pl-4'}
                    hover:text-[#64FFDA] transition-colors
                  `}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default TableOfContents;