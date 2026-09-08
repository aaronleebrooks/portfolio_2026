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

        <main id="main">
          <About />
          <Experience />
          <Projects />
          <Contact />
        </main>

        <footer
          role="contentinfo"
          className="mt-8 border-t border-border pb-20 pt-8 text-sm text-muted-foreground"
        >
          <p className="max-w-[68ch]">
            I test this site the way I test production code: 100% unit coverage
            and a Playwright end-to-end suite, both public.{" "}
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
    </>
  );
}
