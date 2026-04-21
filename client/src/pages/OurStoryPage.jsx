import { ngoHighlights } from "../data/fallbackContent";

export const OurStoryPage = () => (
  <section className="container-shell py-12">
    <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Our Story</p>
        <h1 className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          Mind Park Foundation builds rehabilitation pathways with dignity at the center.
        </h1>
        <p className="text-base leading-8 text-slate-600">
          The foundation supports individuals living with schizophrenia, dementia, and
          neurocognitive disorders through therapeutic care, structured routines, skill training,
          and community-facing opportunities. The marketplace exists to make this care visible and
          sustainable.
        </p>
        <div className="glass-panel p-6">
          <h2 className="text-xl font-semibold text-ink">Why “Shubhartis”?</h2>
          <p className="mt-3 text-base leading-7 text-slate-600">
            The word reflects a humane, strength-based view of beneficiaries. It centers identity,
            promise, and participation rather than reducing people to a diagnosis.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {ngoHighlights.map((item) => (
          <article key={item.title} className="glass-panel p-6">
            <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.copy}</p>
          </article>
        ))}
        <img
          src="https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?auto=format&fit=crop&w=1200&q=80"
          alt="Mind Park community support"
          className="h-72 w-full rounded-[30px] object-cover shadow-soft"
        />
      </div>
    </div>
  </section>
);
