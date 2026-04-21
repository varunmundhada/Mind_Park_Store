export const SectionHeading = ({ eyebrow, title, copy }) => (
  <div className="space-y-4">
    {eyebrow ? (
      <div className="inline-flex items-center gap-2">
        <span className="h-px w-8 bg-gradient-to-r from-sage to-transparent"></span>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage">{eyebrow}</p>
      </div>
    ) : null}
    <h2 className="section-title">{title}</h2>
    {copy ? <p className="section-copy mt-4">{copy}</p> : null}
  </div>
);
