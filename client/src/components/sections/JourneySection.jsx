import { motion } from "framer-motion";
import { journeySteps, supporterQuotes } from "../../data/fallbackContent";
import { SectionHeading } from "../ui/SectionHeading";

export const JourneySection = () => (
  <section className="container-shell py-12">
    <div className="grid gap-8 lg:grid-cols-[1fr_1.02fr]">
      <div className="space-y-6">
        <SectionHeading
          eyebrow="Why This Matters"
          title="Each product begins long before it reaches a cart."
          copy="Behind every order is a rehabilitation journey shaped by therapy, patience, and supported work. The marketplace helps that journey become visible, sustainable, and respected."
        />
        <div className="glass-panel overflow-hidden p-2">
          <img
            src="https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?auto=format&fit=crop&w=1200&q=80"
            alt="Hands working together on handmade craft"
            className="h-[380px] w-full rounded-[28px] object-cover"
          />
        </div>
      </div>

      <div className="space-y-4">
        {journeySteps.map((step, index) => (
          <motion.article
            key={step.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="glass-panel p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-meadow text-sm font-semibold text-ink">
                0{index + 1}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{step.copy}</p>
              </div>
            </div>
          </motion.article>
        ))}

        <div className="grid gap-4 md:grid-cols-2">
          {supporterQuotes.map((item) => (
            <blockquote key={item.name} className="rounded-[28px] bg-[#f4fafc] p-6 shadow-soft">
              <p className="text-base leading-7 text-slate-700">"{item.quote}"</p>
              <footer className="mt-4">
                <p className="font-semibold text-ink">{item.name}</p>
                <p className="text-sm text-slate-500">{item.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </div>
  </section>
);
