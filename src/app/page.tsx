import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Jobs from '@/components/sections/jobs';
import Featured from '@/components/sections/featured';
import Projects from '@/components/sections/projects';
import Contact from '@/components/sections/contact';
import ClientLayout from './layout-client';
import { getAllJobs } from '@/lib/content';
import { getFeaturedProjects } from '@/lib/content';
import { getAllProjects } from '@/lib/content';
import type { Job, FeaturedProject, Project } from '@/types/content';

export default async function Home() {
  const jobs: Job[] = await getAllJobs();
  const featuredProjects: FeaturedProject[] = await getFeaturedProjects();
  const projects: Project[] = await getAllProjects(true);

  return (
    <ClientLayout>
      <main className="fillHeight counter-reset-section">
        <Hero />
        <About />
        <Jobs jobs={jobs} />
        <Featured projects={featuredProjects} />
        <Projects projects={projects} />
        <Contact />
      </main>
    </ClientLayout>
  );
}
