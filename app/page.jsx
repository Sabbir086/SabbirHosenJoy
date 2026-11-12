import LoadingScreen from "@/components/layout/LoadingScreen";
import CinematicCanvas from "@/components/layout/CinematicCanvas";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import CodingProfilesSection from "@/components/sections/CodingProfilesSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import DocumentariesSection from "@/components/sections/DocumentariesSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import PortfolioClientEffects from "@/components/PortfolioClientEffects";

export default function HomePage() {
  return (
    <main className="min-h-screen w-full overflow-x-clip bg-[var(--bg)] text-[var(--text)]">
      <LoadingScreen />
      <CinematicCanvas />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <CodingProfilesSection />
      <AchievementsSection />
      <DocumentariesSection />
      <ContactSection />
      <Footer />
      <PortfolioClientEffects />
    </main>
  );
}
