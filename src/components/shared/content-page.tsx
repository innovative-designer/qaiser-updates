import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { InfoPanel } from '@/components/shared/info-panel';
import { PageHero } from '@/components/shared/page-hero';
import { PageSection } from '@/components/shared/page-section';
import type { ContentDocument } from '@/content/legal/privacy-policy';

interface ContentPageProps {
  document: ContentDocument;
}

export function ContentPage({ document }: ContentPageProps) {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-8 sm:py-10 lg:py-12">
        <PageSection width="wide" spacing="compact">
          <PageHero gridClassName="lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="space-y-5">
              <p className="section-kicker">{document.eyebrow}</p>
              <div className="space-y-4">
                <h1 className="text-foreground max-w-4xl">{document.title}</h1>
                <p className="text-muted-foreground max-w-3xl text-base leading-7 sm:text-lg">
                  {document.description}
                </p>
              </div>
            </div>

            <InfoPanel tone="quiet">
              <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
                Last updated
              </p>
              <p className="text-foreground mt-3 text-lg font-semibold tracking-tight">
                {document.lastUpdated}
              </p>
              <div className="text-muted-foreground mt-5 space-y-3 text-sm leading-7">
                {document.highlights.map((highlight) => (
                  <p key={highlight}>{highlight}</p>
                ))}
              </div>
            </InfoPanel>
          </PageHero>
        </PageSection>

        <PageSection width="narrow" spacing="compact">
          <article className="surface-card rounded-[var(--radius-shell)] border px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
            <div className="space-y-10">
              {document.sections.map((section) => (
                <section key={section.title} className="space-y-4">
                  <h2 className="text-foreground text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-muted-foreground text-sm leading-7 sm:text-[15px]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.items ? (
                    <ul className="text-muted-foreground list-disc space-y-2 pl-5 text-sm leading-7 sm:text-[15px]">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </article>
        </PageSection>
      </main>

      <Footer />
    </div>
  );
}
