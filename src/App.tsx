import { MobileNav } from "@/components/layout/MobileNav";
import { Sidebar } from "@/components/layout/Sidebar";
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
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:m-0 focus:inline-flex focus:h-auto focus:w-auto focus:overflow-visible focus:whitespace-normal focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:[clip:auto]"
      >
        Skip to content
      </a>

      <MobileNav activeId={activeId} />

      <div className="mx-auto grid max-w-6xl gap-4 px-6 lg:grid-cols-[minmax(280px,340px)_minmax(0,1fr)] lg:gap-16 lg:px-12">
        <Sidebar activeId={activeId} />

        <div className="min-w-0 pb-24 lg:py-24">
          <main id="main">
            <About />
            <Experience />
            <Projects />
            <Contact />
          </main>

          <footer
            role="contentinfo"
            className="mt-8 border-t border-border pt-8 text-sm text-muted-foreground"
          >
            <p>
              I test this site the way I test production code: 100% unit
              coverage and a Playwright end-to-end suite, both public.{" "}
              <a
                href="/tests/coverage/"
                className={reportLinkClass}
                target="_blank"
                rel="noopener noreferrer"
              >
                Coverage report
              </a>
              {" · "}
              <a
                href="/tests/e2e/"
                className={reportLinkClass}
                target="_blank"
                rel="noopener noreferrer"
              >
                End-to-end report
              </a>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
