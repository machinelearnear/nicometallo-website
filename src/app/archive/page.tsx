import { Metadata } from 'next';
import Link from 'next/link';
import ClientLayout from '@/app/layout-client';
import { FadeIn } from '@/components/fade-in';
import { getAllProjects } from '@/lib/content';
import { Icon } from '@/components/icons';
import type { Project } from '@/types/content';

export const metadata: Metadata = {
  title: 'Archive | Nicolas Metallo',
  description: 'A big list of things I\'ve worked on',
};

export default async function ArchivePage() {
  const projects: Project[] = await getAllProjects();

  return (
    <ClientLayout>
      <main className="fillHeight py-[100px] px-[25px]">
        <FadeIn as="header" className="mb-20" y={30}>
          <h1 className="big-heading text-lightest-slate">Archive</h1>
          <p className="subtitle text-light-slate mt-4">A big list of things I've worked on</p>
        </FadeIn>

        <div className="overflow-x-auto -mx-[20px]">
          <FadeIn as="div" delay={0.2}>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-[10px] text-light-slate font-normal text-xs uppercase tracking-wider">Year</th>
                  <th className="text-left p-[10px] text-light-slate font-normal text-xs uppercase tracking-wider">Title</th>
                  <th className="hidden md:table-cell text-left p-[10px] text-light-slate font-normal text-xs uppercase tracking-wider">Made at</th>
                  <th className="hidden md:table-cell text-left p-[10px] text-light-slate font-normal text-xs uppercase tracking-wider">Built with</th>
                  <th className="text-left p-[10px] text-light-slate font-normal text-xs uppercase tracking-wider">Link</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project: Project, i: number) => {
                  const year = new Date(project.date).getFullYear();
                  const { github, external, title, tech, company } = project;

                  return (
                    <tr
                      key={i}
                      className="cursor-default transition-colors duration-200"
                      style={{ 
                        animation: `fadeInUp 0.3s ease ${i * 0.05}s both` 
                      }}
                    >
                      <td className="p-[10px] text-nowrap text-green font-mono text-sm">{year}</td>
                      <td className="p-[10px] text-lightest-slate font-semibold text-lg leading-tight">{title}</td>
                      <td className="hidden md:table-cell p-[10px] text-light-slate text-base">
                        {company ? company : '—'}
                      </td>
                      <td className="hidden md:table-cell p-[10px]">
                        <div className="flex flex-wrap gap-x-3">
                          {tech && tech.length > 0 && tech.map((t: string, j: number) => (
                            <span key={j} className="font-mono text-xs text-light-slate">
                              {t}
                              {j < tech.length - 1 && <span className="mx-1.25">&middot;</span>}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-[10px] min-w-[100px]">
                        <div className="flex items-center">
                          {external && (
                            <a
                              href={external}
                              aria-label="External Link"
                              target="_blank"
                              rel="noreferrer"
                              className="p-2.5 hover:text-green transition-colors text-light-slate"
                            >
                              <Icon name="External" />
                            </a>
                          )}
                          {github && (
                            <a
                              href={github}
                              aria-label="GitHub Link"
                              target="_blank"
                              rel="noreferrer"
                              className="p-2.5 hover:text-green transition-colors text-light-slate"
                            >
                              <Icon name="GitHub" />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </FadeIn>
        </div>
      </main>
    </ClientLayout>
  );
}
