export const resources = {
  en: {
    translation: {
      taskbar: {
        start: "start",
        aria: "Taskbar",
        mute: "Mute sounds",
        unmute: "Unmute sounds",
      },
      startMenu: {
        aria: "Start menu",
        userName: "Aaron Brooks",
        shutDown: "Turn Off Computer…",
      },
      desktop: {
        aria: "Desktop",
        openApp: "Open {{name}}",
      },
      window: {
        minimize: "Minimize",
        maximize: "Maximize",
        restore: "Restore",
        close: "Close",
        resizeRight: "Resize window width",
        resizeBottom: "Resize window height",
        resizeCorner: "Resize window",
      },
      boot: {
        status: "Starting up",
        skip: "Skip",
        tagline: "Full Stack Software Engineer",
      },
      language: {
        label: "Language",
        en: "English",
        fr: "Français",
        es: "Español",
      },
      apps: {
        about: {
          title: "About Me",
          iconLabel: "About Me",
          headline: "Aaron Brooks — Full Stack Software Engineer",
          body: "8+ years building customer-facing EdTech at scale, specializing in React, TypeScript, and Redux. This site is a Windows XP–themed playground; poke around the desktop.",
          footnote:
            "More apps (résumé viewer, projects, an AIM-style AI buddy) are on the way.",
        },
        resume: {
          title: "Résumé",
          iconLabel: "Résumé",
          comingSoon:
            "A proper Adobe Acrobat–style résumé viewer is coming in a later milestone.",
          links:
            'For now, find me on <linkedin>LinkedIn</linkedin> and <github>GitHub</github>.',
        },
      },
    },
  },
  fr: {
    translation: {
      taskbar: {
        start: "démarrer",
        aria: "Barre des tâches",
        mute: "Couper le son",
        unmute: "Activer le son",
      },
      startMenu: {
        aria: "Menu Démarrer",
        userName: "Aaron Brooks",
        shutDown: "Arrêter l'ordinateur…",
      },
      desktop: {
        aria: "Bureau",
        openApp: "Ouvrir {{name}}",
      },
      window: {
        minimize: "Réduire",
        maximize: "Agrandir",
        restore: "Restaurer",
        close: "Fermer",
        resizeRight: "Redimensionner la largeur",
        resizeBottom: "Redimensionner la hauteur",
        resizeCorner: "Redimensionner la fenêtre",
      },
      boot: {
        status: "Démarrage",
        skip: "Passer",
        tagline: "Ingénieur logiciel full stack",
      },
      language: {
        label: "Langue",
        en: "English",
        fr: "Français",
        es: "Español",
      },
      apps: {
        about: {
          title: "À propos",
          iconLabel: "À propos",
          headline: "Aaron Brooks — Ingénieur logiciel full stack",
          body: "Plus de 8 ans à construire des EdTech grand public à grande échelle, spécialisé en React, TypeScript et Redux. Ce site est un bureau Windows XP thématique — explorez.",
          footnote:
            "D'autres applis (CV, projets, un compagnon IA style AIM) arrivent bientôt.",
        },
        resume: {
          title: "CV",
          iconLabel: "CV",
          comingSoon:
            "Un lecteur de CV style Adobe Acrobat arrive dans une prochaine étape.",
          links:
            'Pour l\'instant, retrouvez-moi sur <linkedin>LinkedIn</linkedin> et <github>GitHub</github>.',
        },
      },
    },
  },
  es: {
    translation: {
      taskbar: {
        start: "inicio",
        aria: "Barra de tareas",
        mute: "Silenciar sonidos",
        unmute: "Activar sonidos",
      },
      startMenu: {
        aria: "Menú Inicio",
        userName: "Aaron Brooks",
        shutDown: "Apagar el equipo…",
      },
      desktop: {
        aria: "Escritorio",
        openApp: "Abrir {{name}}",
      },
      window: {
        minimize: "Minimizar",
        maximize: "Maximizar",
        restore: "Restaurar",
        close: "Cerrar",
        resizeRight: "Cambiar ancho de ventana",
        resizeBottom: "Cambiar alto de ventana",
        resizeCorner: "Redimensionar ventana",
      },
      boot: {
        status: "Iniciando",
        skip: "Omitir",
        tagline: "Ingeniero de software full stack",
      },
      language: {
        label: "Idioma",
        en: "English",
        fr: "Français",
        es: "Español",
      },
      apps: {
        about: {
          title: "Sobre mí",
          iconLabel: "Sobre mí",
          headline: "Aaron Brooks — Ingeniero de software full stack",
          body: "Más de 8 años creando EdTech para el público a gran escala, especializado en React, TypeScript y Redux. Este sitio es un escritorio con temática Windows XP; explóralo.",
          footnote:
            "Pronto llegarán más apps (CV, proyectos, un compañero IA estilo AIM).",
        },
        resume: {
          title: "Currículum",
          iconLabel: "Currículum",
          comingSoon:
            "Un visor de currículum estilo Adobe Acrobat llegará en un hito posterior.",
          links:
            'Por ahora, encuéntrame en <linkedin>LinkedIn</linkedin> y <github>GitHub</github>.',
        },
      },
    },
  },
} as const;

export type SupportedLocale = keyof typeof resources;

export const SUPPORTED_LOCALES: SupportedLocale[] = ["en", "fr", "es"];

export function isSupportedLocale(value: string): value is SupportedLocale {
  return SUPPORTED_LOCALES.includes(value as SupportedLocale);
}

export function readStoredLocale(): SupportedLocale {
  try {
    const stored = localStorage.getItem("locale");
    if (stored && isSupportedLocale(stored)) return stored;
  } catch {
    // localStorage unavailable (SSR/tests)
  }
  return "en";
}

export function readStoredMuted(): boolean {
  try {
    const stored = localStorage.getItem("soundMuted");
    if (stored === "false") return false;
  } catch {
    // ignore
  }
  return true;
}
