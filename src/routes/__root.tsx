import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { NetworkGuard } from "@/components/NetworkGuard";

import appCss from "../styles.css?url";
import favicon from "../assets/shana.png";

function ErrorComponent({ error }: { error: Error }) {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[500px] w-[500px] rounded-full border border-[var(--primary)]/8 animate-spin-slow" />
          <div className="absolute inset-16 rounded-full border border-[var(--primary)]/5 animate-spin-slower" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-md text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--primary)]/15 bg-[var(--primary)]/8">
            <span className="font-mono text-lg text-[var(--primary)]">!</span>
          </div>
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Something broke
        </h1>
        <p className="mt-3 font-serif text-base italic leading-relaxed text-muted-foreground">
          {error.message || "The page encountered an unexpected error."}
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-[var(--primary)]/30 bg-[var(--primary)]/8 px-7 py-3 font-display text-xs uppercase tracking-[0.2em] text-[var(--primary)] transition-all hover:bg-[var(--primary)]/15"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[500px] w-[500px] rounded-full border border-[var(--primary)]/8 animate-spin-slow" />
          <div className="absolute inset-16 rounded-full border border-[var(--primary)]/5 animate-spin-slower" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-md text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--primary)]/15 bg-[var(--primary)]/8">
            <span className="font-mono text-xl text-[var(--primary)]">404</span>
          </div>
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Not found
        </h1>
        <p className="mt-3 font-serif text-base italic leading-relaxed text-muted-foreground">
          This page does not exist or has been moved. The trail ends here.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-[var(--primary)]/30 bg-[var(--primary)]/8 px-7 py-3 font-display text-xs uppercase tracking-[0.2em] text-[var(--primary)] transition-all hover:bg-[var(--primary)]/15"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

const SITE_URL = "https://switch41.online";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kushal's Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Kushal (switch41): AI and full-stack developer from Hyderabad building things that work.",
      },
      { name: "author", content: "Kushal (switch41)" },
      { name: "keywords", content: "kushal, parihar, switch41, developer, portfolio, AI, full-stack, Hyderabad" },

      { property: "og:title", content: "Kushal's Portfolio" },
      {
        property: "og:description",
        content: "AI and full-stack developer from Hyderabad. If it's unsolved, I'm interested.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:site_name", content: "Kushal's Portfolio" },
      { property: "og:image", content: `${SITE_URL}/og-image.svg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Kushal's Portfolio" },
      {
        name: "twitter:description",
        content: "AI and full-stack developer from Hyderabad. If it's unsolved, I'm interested.",
      },
      { name: "twitter:image", content: `${SITE_URL}/og-image.svg` },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: favicon },
      { rel: "shortcut icon", type: "image/png", href: favicon },
      { rel: "canonical", href: SITE_URL },
    ],
    scripts: [
      {
        src: "https://static.cloudflareinsights.com/beacon.min.js",
        defer: true,
        "data-cf-beacon": '{"token": "614ee850c2f04e268f6a29af66564393"}',
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  errorComponent: ErrorComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <NetworkGuard>{children}</NetworkGuard>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
