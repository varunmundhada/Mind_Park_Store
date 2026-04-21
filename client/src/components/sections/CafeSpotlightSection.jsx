import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cafeHighlights } from "../../data/fallbackContent";
import { Button } from "../ui/Button";

export const CafeSpotlightSection = () => (
  <section className="container-shell py-12">
    <div className="relative overflow-hidden rounded-[36px] bg-[#12344a] px-6 py-8 text-white shadow-soft md:px-10 md:py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(167,221,238,0.24),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(216,242,223,0.22),transparent_28%)]" />
      <div className="relative grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-100">
            Mind Park Cafe
          </p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            A slow-living cafe with a difference.
          </h2>
          <p className="max-w-xl text-base leading-8 text-slate-200">
            Mind Park Cafe is more than a menu. It is a calm, inclusive space where hospitality
            training, confidence, and community interaction come alive in everyday moments.
          </p>
          <p className="text-sm font-medium text-sky-100">मन करा रे प्रसन्न, व्हा पुनर्नवं</p>
          <a
            href="https://www.instagram.com/mind_park_cafe/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white"
          >
            Follow on Instagram @mind_park_cafe
          </a>
          <div className="space-y-3">
            {cafeHighlights.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/8 px-4 py-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#bceacc]" />
                <p className="text-sm leading-6 text-slate-100">{item}</p>
              </div>
            ))}
          </div>
          <Link to="/get-involved">
            <Button className="mt-2 bg-white text-ink hover:bg-slate-100">Support the Cafe</Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <img
            src="/brand/dr-urmila-kshirsagar.png"
            alt="Mind Park cafe and leadership"
            className="h-72 w-full rounded-[28px] object-cover"
          />
          <div className="space-y-4">
            <div className="rounded-[28px] bg-white/10 p-5">
              <p className="text-4xl font-semibold text-white">620</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">
                cafe meals and snacks served through a model built on care and training
              </p>
            </div>
            <img
              src="/brand/mindpark-activity.png"
              alt="Mind Park community activity"
              className="h-40 w-full rounded-[28px] object-cover"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
