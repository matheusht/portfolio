import { useState, useEffect } from 'react';
import Header from './components/Header';
import ProjectsShowcase from './components/ProjectsShowcase';
import TechnicalSkills from './components/TechnicalSkills';
import CertificationCarousel from './components/CertificationCarousel';
import BlogPreview from './components/BlogPreview';
import SecurityBadges from './components/SecurityBadges';
import { Analytics } from "@vercel/analytics/react"

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Update document class when dark mode changes
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200`}>
      <Header />
      <main>
        <ProjectsShowcase />
        <TechnicalSkills />
        <CertificationCarousel />
        {/* <BlogPreview /> */}
        <SecurityBadges />
      </main>
    </div>
  );
}

export default App;
