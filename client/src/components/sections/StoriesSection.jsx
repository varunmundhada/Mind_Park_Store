import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import { SectionHeading } from "../ui/SectionHeading";

export const StoriesSection = () => {
  const { profiles } = useShop();

  return (
    <section className="container-shell py-12">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Shubhartis"
          title="Meet the makers behind the work."
          copy="The people behind these products are not hidden in the background. Their journeys, strengths, and progress are central to the platform."
        />
        <Link to="/makers" className="text-sm font-medium text-ink">
          Explore all stories
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {profiles.slice(0, 3).map((profile, index) => (
          <motion.article
            key={profile._id || profile.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="glass-panel overflow-hidden"
          >
            <img src={profile.image} alt={profile.name} className="h-72 w-full object-cover" />
            <div className="space-y-3 p-6">
              <div>
                <h3 className="text-xl font-semibold text-ink">{profile.name}</h3>
                <p className="text-sm text-slate-500">{profile.role}</p>
              </div>
              <p className="text-sm leading-6 text-slate-600">{profile.summary}</p>
              <div className="flex flex-wrap gap-2">
                {profile.tags?.map((tag) => (
                  <span key={tag} className="rounded-full bg-mist px-3 py-1 text-xs text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};
