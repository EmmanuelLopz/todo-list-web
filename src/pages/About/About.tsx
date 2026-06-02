import AboutHero from "../../components/AboutHero/AboutHero";
import AuthorCard from "../../components/AuthorCard/AuthorCard";
import ProjectInfoCard from "../../components/ProjectInfoCard/ProjectInfoCard";

const About = () => {
  return (
    <div className="min-h-screen bg-slate-100 px-8 pb-16">
      <AboutHero />
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProjectInfoCard />
        </div>
        <div className="lg:col-span-1">
          <AuthorCard />
        </div>
      </div>
    </div>
  );
};

export default About;
