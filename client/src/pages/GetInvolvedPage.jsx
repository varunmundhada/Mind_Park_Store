import { Button } from "../components/ui/Button";

export const GetInvolvedPage = () => (
  <section className="container-shell py-12">
    <div className="grid gap-6 md:grid-cols-3">
      <article className="glass-panel p-6">
        <h2 className="text-2xl font-semibold text-ink">Volunteer</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Support workshops, community events, logistics, or storytelling initiatives that help
          Shubhartis gain visibility and structure.
        </p>
        <Button className="mt-5 w-full">Apply to Volunteer</Button>
      </article>
      <article className="glass-panel p-6">
        <h2 className="text-2xl font-semibold text-ink">Donate</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Help fund therapy, materials, livelihood training, and accessible rehabilitation support.
        </p>
        <Button variant="soft" className="mt-5 w-full">
          Make a Donation
        </Button>
      </article>
      <article className="glass-panel p-6">
        <h2 className="text-2xl font-semibold text-ink">Mind Park Cafe</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          The cafe creates a welcoming public space where hospitality training and inclusion become
          part of daily life.
        </p>
        <Button variant="secondary" className="mt-5 w-full">
          Partner with the Cafe
        </Button>
      </article>
    </div>
  </section>
);
