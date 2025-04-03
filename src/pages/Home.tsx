import ProjectsShowcase from '../components/ProjectsShowcase';
import TechnicalSkills from '../components/TechnicalSkills';
import CertificationCarousel from '../components/CertificationCarousel';
import BlogPreview from '../components/BlogPreview';
import SecurityBadges from '../components/SecurityBadges';

export default function Home() {
  return (
    <>
      <ProjectsShowcase />
      <TechnicalSkills />
      <CertificationCarousel />
      <BlogPreview />
      <SecurityBadges />
    </>
  );
}