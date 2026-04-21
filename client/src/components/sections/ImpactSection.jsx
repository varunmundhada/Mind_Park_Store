import { motion } from "framer-motion";
import { impactStats } from "../../data/fallbackContent";
import { SectionHeading } from "../ui/SectionHeading";

export const ImpactSection = () => (
  <section className="container-shell py-12">
    <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="rounded-[34px] bg-[#133449] px-6 py-8 text-white shadow-soft md:px-8">
        <SectionHeading
          eyebrow="Impact"
          title="Every purchase supports rehabilitation."
          copy="When someone buys a product from Mind Park Foundation, they support therapy-linked livelihood, confidence-building routines, community visibility, and a more dignified recovery journey."
        />
        <div className="mt-6 rounded-[28px] bg-white/10 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-100">
            What your order really funds
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-100">
            Materials for workshops, supervised training, therapy-linked structure, public-facing
            opportunities like the cafe, and the everyday conditions that help recovery feel
            possible.
          </p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {impactStats.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="rounded-[30px] bg-white p-6 shadow-soft"
          >
            <p className="text-3xl font-semibold text-ink">{item.value}</p>
            <p className="mt-2 text-sm text-slate-600">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
