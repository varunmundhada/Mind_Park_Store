import { motion } from "framer-motion";

const points = [
  "Buy for impact",
  "Share the stories",
  "Volunteer your time",
  "Partner with the NGO",
];

export const SupportBannerSection = () => (
  <section className="border-y border-white/70 bg-white/50 py-5 backdrop-blur">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="container-shell flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
    >
      {points.map((point) => (
        <div key={point} className="flex items-center gap-3 text-sm font-medium text-slate-700">
          <span className="h-2 w-2 rounded-full bg-coral" />
          <span>{point}</span>
        </div>
      ))}
    </motion.div>
  </section>
);
