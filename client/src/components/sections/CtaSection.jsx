import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

export const CtaSection = () => (
  <section className="container-shell py-12">
    <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-skywash via-white to-meadow px-8 py-12 text-center shadow-soft">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(247,184,164,0.18),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(216,242,223,0.28),transparent_24%)]" />
      <div className="relative">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Get Involved
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Buy handmade. Share the story. Help recovery stay visible.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
          Every order tells the NGO that people believe in this work. Every share, visit, and
          volunteer hour helps expand care, confidence, and community.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/shop">
            <Button>Support Through Shopping</Button>
          </Link>
          <Link to="/get-involved">
            <Button variant="secondary">Volunteer / Donate</Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);
