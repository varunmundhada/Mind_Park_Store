import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import { SectionHeading } from "../ui/SectionHeading";

export const StoriesSection = () => {
  const { profiles } = useShop();

  return (
    <section className="container-shell py-16">
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Shubhartis"
          title="The people behind every product."
          copy="These are not stock photos. These are real people at Mind Park Foundation whose work, patience, and progress power this marketplace."
        />
        <Link
          to="/makers"
          className="group inline-flex items-center gap-2 self-start rounded-full border-2 border-sage/30 bg-white px-6 py-3 font-semibold text-ink shadow-soft transition-all hover:border-sage hover:bg-sage hover:text-white md:self-auto"
        >
          All Stories
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {profiles.slice(0, 3).map((profile, index) => (
          <motion.article
            key={profile._id || profile.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group overflow-hidden rounded-4xl border-2 border-sage/10 bg-white shadow-card transition-all duration-500 hover:border-sage/30 hover:shadow-medium"
          >
            {/* Image with overlay */}
            <div className="relative h-72 overflow-hidden">
              <img
                src={profile.image}
                alt={`${profile.name} at work`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              {/* Name overlay on image */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-display text-xl font-bold text-white">{profile.name}</p>
                <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-sage" />
                  <p className="text-xs font-semibold text-white">{profile.role}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-6">
              <p className="text-sm leading-relaxed text-slate-600">{profile.summary}</p>
              <div className="flex flex-wrap gap-2">
                {profile.tags?.map((tag) => (
                  <span key={tag} className="rounded-full bg-meadow/50 px-3 py-1 text-xs font-semibold text-sage">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                to="/makers"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-sage transition-colors hover:text-deepTeal"
              >
                Read full story
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};
