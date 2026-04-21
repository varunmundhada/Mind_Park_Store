import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

const tagColors = [
  "bg-meadow/60 text-sage",
  "bg-softPeach text-terracotta",
  "bg-skywash text-deepTeal",
];

export const MakersPage = () => {
  const { profiles } = useShop();

  return (
    <div>
      {/* Hero */}
      <section className="container-shell py-12">
        <div className="relative overflow-hidden rounded-5xl border-2 border-sage/20 bg-gradient-to-br from-warmCream via-white to-meadow/30 px-8 py-14 shadow-medium md:px-14">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-gradient-to-br from-coral/10 to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-gradient-to-tr from-sage/10 to-transparent blur-3xl" />
          <div className="relative max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2">
              <span className="h-px w-8 bg-gradient-to-r from-sage to-transparent" />
              <p className="text-sm font-bold uppercase tracking-widest text-sage">Meet the Makers</p>
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight text-ink md:text-6xl">
              Real people.{" "}
              <span className="bg-gradient-to-r from-sage to-deepTeal bg-clip-text text-transparent">
                Real journeys.
              </span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-700">
              These are the Shubhartis — people living with schizophrenia, dementia, and neurocognitive 
              conditions — who make every product you buy. Their stories are not about charity. 
              They are about dignity, skill, and the power of meaningful work.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-deepTeal to-sage px-6 py-3 font-semibold text-white shadow-soft transition-all hover:shadow-glow"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Buy Their Products
              </Link>
              <Link
                to="/get-involved"
                className="inline-flex items-center gap-2 rounded-full border-2 border-sage/30 bg-white px-6 py-3 font-semibold text-ink transition-all hover:border-sage hover:bg-sage hover:text-white"
              >
                Support the Mission
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Profiles */}
      <section className="container-shell pb-20">
        <div className="space-y-10">
          {profiles.map((profile, index) => (
            <motion.article
              key={profile._id || profile.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className={`overflow-hidden rounded-5xl border-2 border-sage/10 bg-white shadow-card transition-all duration-500 hover:border-sage/30 hover:shadow-medium ${
                index % 2 === 0 ? "" : ""
              }`}
            >
              <div className={`grid md:grid-cols-[420px_1fr] ${index % 2 !== 0 ? "md:grid-cols-[1fr_420px]" : ""}`}>
                {/* Image side */}
                <div className={`relative overflow-hidden ${index % 2 !== 0 ? "md:order-2" : ""}`}>
                  <img
                    src={profile.image}
                    alt={`${profile.name} at work`}
                    className="h-80 w-full object-cover transition-transform duration-700 hover:scale-105 md:h-full md:min-h-[420px]"
                  />
                  {/* Overlay with name */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6">
                    <p className="font-display text-2xl font-bold text-white">{profile.name}</p>
                    <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
                      <div className="h-2 w-2 rounded-full bg-sage" />
                      <p className="text-sm font-semibold text-white">{profile.role}</p>
                    </div>
                  </div>
                </div>

                {/* Content side */}
                <div className={`flex flex-col justify-between p-8 md:p-10 ${index % 2 !== 0 ? "md:order-1" : ""}`}>
                  <div className="space-y-6">
                    {/* Quote / Summary */}
                    <div className="relative rounded-3xl border-2 border-sage/20 bg-gradient-to-br from-warmCream to-mist p-6">
                      <svg className="mb-3 h-8 w-8 text-sage/40" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-base font-medium italic leading-relaxed text-slate-700">
                        "{profile.summary}"
                      </p>
                    </div>

                    {/* Full story */}
                    <p className="text-sm leading-relaxed text-slate-600">{profile.fullStory}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {profile.tags?.map((tag, tagIndex) => (
                        <span
                          key={tag}
                          className={`rounded-full px-4 py-1.5 text-xs font-semibold ${tagColors[tagIndex % tagColors.length]}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom CTA */}
                  <div className="mt-8 flex items-center justify-between border-t-2 border-sage/10 pt-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sage to-deepTeal">
                        <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-sage">Support {profile.name.split(" ")[0]}</p>
                        <p className="text-xs text-slate-500">Buy their handmade products</p>
                      </div>
                    </div>
                    <Link
                      to="/shop"
                      className="inline-flex items-center gap-2 rounded-full border-2 border-sage/30 bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:border-sage hover:bg-sage hover:text-white"
                    >
                      Shop Now
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-5xl border-2 border-sage/20 bg-gradient-to-br from-meadow/30 to-mist p-10 text-center"
        >
          <img
            src="/brand/mindpark-logo-round.png"
            alt="Mind Park Foundation"
            className="mx-auto mb-4 h-16 w-16 rounded-full border-2 border-sage/30 object-cover shadow-soft"
          />
          <h2 className="font-display text-2xl font-bold text-ink">
            Every purchase directly supports these journeys
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-slate-700">
            When you buy from Mind Park Store, you're not just getting a quality product — 
            you're funding therapy hours, building livelihoods, and saying that every person 
            deserves dignity and a chance to contribute.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-deepTeal to-sage px-8 py-3.5 font-bold text-white shadow-soft transition-all hover:shadow-glow"
            >
              Browse All Products
            </Link>
            <Link
              to="/get-involved"
              className="inline-flex items-center gap-2 rounded-full border-2 border-sage/30 bg-white px-8 py-3.5 font-semibold text-ink transition-all hover:border-sage hover:bg-sage hover:text-white"
            >
              Other Ways to Help
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
