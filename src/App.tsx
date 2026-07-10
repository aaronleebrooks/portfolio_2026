import { MobileNav } from "@/components/layout/MobileNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { sectionIds } from "@/data/profile";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export default function App() {
  const activeId = useScrollSpy(sectionIds);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:m-0 focus:inline-flex focus:h-auto focus:w-auto focus:overflow-visible focus:whitespace-normal focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:[clip:auto]"
      >
        Skip to content
      </a>

      <MobileNav activeId={activeId} />

      <div className="mx-auto grid max-w-6xl gap-4 px-6 lg:grid-cols-[minmax(280px,340px)_minmax(0,1fr)] lg:gap-16 lg:px-12">
        <Sidebar activeId={activeId} />

        <main id="main" className="min-w-0 pb-24 lg:py-24">
          <About />
          <Experience />
          <Projects />
          <Contact />

          <footer className="mt-8 border-t border-border pt-8 text-sm text-muted-foreground">
            <p>
              Built with React, TypeScript, Vite, Tailwind, and shadcn/ui.
              Designed for accessibility and performance.
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
