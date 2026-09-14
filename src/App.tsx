import { Masthead } from "@/components/layout/Masthead";
import { TopBar } from "@/components/layout/TopBar";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { sectionIds } from "@/data/profile";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const reportLinkClass =
  "underline underline-offset-4 transition-colors hover:text-primary";

export default function App() {
  const activeId = useScrollSpy(sectionIds);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:m-0 focus:inline-flex focus:h-auto focus:w-auto focus:overflow-visible focus:whitespace-normal focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:[clip:auto]"
      >
        Skip to content
      </a>

      <TopBar activeId={activeId} />

      <div className="mx-auto max-w-3xl px-6">
        <Masthead />

        {/*
          tabIndex makes the skip link actually move focus. Without it the page
          scrolls but focus stays behind, so the next Tab returns to the top —
          the exact failure the skip link exists to prevent. axe cannot see this.
        */}
        <main id="main" tabIndex={-1} className="outline-none">
          <About />
          <Experience />
          <Projects />
          <Contact />
        </main>

        {/*
          The test-coverage argument used to live here, which meant the last
          thing every visitor read was a footnote about tooling. It is a project
          now, in Projects, where it reads as evidence instead of an aside.
        */}
        <footer
          role="contentinfo"
          className="mt-8 border-t border-border pb-20 pt-8 font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
        >
          <p>
            Built by hand in Ithaca, NY.{" "}
            <a
              href="https://github.com/aaronleebrooks/portfolio_2026"
              className={reportLinkClass}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}
