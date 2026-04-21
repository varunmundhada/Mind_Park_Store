import { motion } from "framer-motion";
import { ngoHighlights } from "../../data/fallbackContent";
import { SectionHeading } from "../ui/SectionHeading";

export const AboutPreview = () => (
  <section className="container-shell py-10">
    <div className="grid gap-8 md:grid-cols-[0.92fr_1.08fr]">
      <div className="space-y-6">
        <SectionHeading
          eyebrow="About Mind Park"
          title="A marketplace rooted in rehabilitation, not just retail."
          copy="Mind Park Foundation supports people living with schizophrenia, dementia, and neurocognitive disorders through care, skill-building, and livelihood opportunities. This platform turns buying into belonging."
        />
        <div className="rounded-[30px] bg-[#f3fafb] p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            What makes this different
          </p>
          <p className="mt-3 text-base leading-7 text-slate-700">
            The homepage is designed to keep people, dignity, and impact visible. Products are
            entry points into the cause, not a distraction from it.
          </p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {ngoHighlights.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="glass-panel p-6"
          >
            <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.copy}</p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
