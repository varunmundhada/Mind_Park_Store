import { useShop } from "../context/ShopContext";

export const MakersPage = () => {
  const { profiles } = useShop();

  return (
    <section className="container-shell py-12">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
          Meet the Makers
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          Stories of progress, patience, and possibility.
        </h1>
        <p className="text-base leading-8 text-slate-600">
          These are glimpses into the journeys of Shubhartis whose work powers the marketplace.
          The goal is not charity aesthetics, but respect, visibility, and shared dignity.
        </p>
      </div>

      <div className="mt-10 grid gap-8">
        {profiles.map((profile) => (
          <article
            key={profile._id || profile.name}
            className="glass-panel grid overflow-hidden md:grid-cols-[0.9fr_1.1fr]"
          >
            <img src={profile.image} alt={profile.name} className="h-full min-h-80 w-full object-cover" />
            <div className="space-y-4 p-8">
              <div>
                <h2 className="text-2xl font-semibold text-ink">{profile.name}</h2>
                <p className="text-sm text-slate-500">{profile.role}</p>
              </div>
              <p className="text-base leading-7 text-slate-600">{profile.fullStory}</p>
              <div className="flex flex-wrap gap-2">
                {profile.tags?.map((tag) => (
                  <span key={tag} className="rounded-full bg-mist px-3 py-2 text-xs text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
