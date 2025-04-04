import React from 'react';
import { motion } from 'framer-motion';

interface Logo {
  name: string;
  url: string;
  image: string;
}

const logos: Logo[] = [
  {
    name: 'Company 1',
    url: 'https://company1.com',
    image: 'https://placehold.co/300x150/0A192F/64FFDA/png?text=Logo+1'
  },
  {
    name: 'Company 2',
    url: 'https://company2.com',
    image: 'https://placehold.co/300x150/0A192F/64FFDA/png?text=Logo+2'
  },
  {
    name: 'Company 3',
    url: 'https://company3.com',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Zp7ZDfIY1tyo8v66343-_4_A7Rxjgihtsg&s'
  }
];

const ClientLogos: React.FC = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  // Double the logos array to create a seamless infinite scroll effect
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-20 bg-[#0A192F] overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-16">
          Trusted Partners
        </h2>

        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="flex gap-16"
            initial={{ x: 0 }}
            animate={{ 
              x: isHovered ? 0 : '-50%'
            }}
            transition={{
              duration: logos.length * 3,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'loop'
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <a
                key={`${logo.name}-${index}`}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-[300px] h-[150px] bg-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-white/10"
              >
                <img
                  src={logo.image}
                  alt={`${logo.name} logo`}
                  className="w-full h-full object-contain p-8"
                  loading="lazy"
                />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;