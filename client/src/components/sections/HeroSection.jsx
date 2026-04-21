import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

export const HeroSection = () => (
  <section className="container-shell py-8 md:py-16">
    <div className="relative overflow-hidden rounded-5xl border-2 border-sage/20 bg-gradient-to-br from-white via-warmCream to-meadow/30 shadow-medium">
      <div className="absolute inset-0 bg-hero-glow" />
      
      {/* Decorative elements */}
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-gradient-to-br from-coral/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-gradient-to-tr from-sage/10 to-transparent blur-3xl" />
      
      <div className="relative grid items-center gap-12 px-6 py-12 md:grid-cols-[1.1fr_0.9fr] md:px-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-3 rounded-full border-2 border-sage/30 bg-white/95 px-5 py-2.5 shadow-soft backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-sage">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-sage opacity-75"></span>
            </span>
            <span className="text-sm font-semibold text-ink">Mind Park Foundation, Nagpur</span>
            <span className="text-sm text-slate-500">•</span>
            <span className="text-sm text-slate-600">Trusted & Transparent</span>
          </div>
          
          <div className="space-y-6">
            <h1 className="font-display max-w-3xl text-5xl font-bold leading-tight tracking-tight text-ink md:text-6xl lg:text-7xl">
              Handcrafted with{" "}
              <span className="bg-gradient-to-r from-sage to-deepTeal bg-clip-text text-transparent">
                Purpose
              </span>
              , Delivered with{" "}
              <span className="bg-gradient-to-r from-coral to-terracotta bg-clip-text text-transparent">
                Care
              </span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-slate-700">
              Every purchase from Mind Park Store supports rehabilitation journeys, builds confidence, 
              and creates sustainable livelihoods. Shop traditional flours and wooden artifacts made 
              by skilled artisans on their path to recovery.
            </p>
            <div className="flex items-center gap-3 rounded-2xl bg-white/80 p-4 shadow-soft backdrop-blur-sm">
              <svg className="h-5 w-5 flex-shrink-0 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm leading-relaxed text-slate-600">
                43F4+MG2, Madhav Nagar Rd, Madhav Nagar, Nagpur, Maharashtra 440010
              </p>
            </div>
          </div>
          
          <div className="grid max-w-2xl gap-4 sm:grid-cols-3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="warm-card group"
            >
              <div className="flex items-center gap-3">
                <div className="feature-icon">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-ink">74+</p>
                  <p className="mt-1 text-xs font-medium text-slate-600">Lives Supported</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="warm-card group"
            >
              <div className="flex items-center gap-3">
                <div className="feature-icon">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-ink">1,280</p>
                  <p className="mt-1 text-xs font-medium text-slate-600">Therapy Hours</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="warm-card group"
            >
              <div className="flex items-center gap-3">
                <div className="feature-icon">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-ink">1,900+</p>
                  <p className="mt-1 text-xs font-medium text-slate-600">Orders Delivered</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/shop">
              <Button variant="primary" className="shadow-glow">
                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Explore Products
              </Button>
            </Link>
            <Link to="/our-story">
              <Button variant="secondary">
                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Our Story
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative min-h-[520px]"
        >
          <div className="absolute right-0 top-0 h-[380px] w-[85%] overflow-hidden rounded-4xl border-4 border-white shadow-medium">
            <img
              src="/brand/mindpark-activity.png"
              alt="Mind Park activity and community engagement"
              className="h-full w-full object-cover"
            />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute bottom-0 left-0 w-[68%] rounded-4xl border-2 border-sage/20 bg-white/95 p-6 shadow-medium backdrop-blur-sm"
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-meadow/60 px-3 py-1">
              <svg className="h-4 w-4 text-sage" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-semibold text-sage">Verified Initiative</span>
            </div>
            <p className="font-display text-lg font-bold text-ink">
              Authentic Mind Park Foundation
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Mind Park Foundation and Mind Park Cafe unite rehabilitation, dignity, and community 
              through meaningful products and consistent support systems.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute right-4 top-[320px] w-60 rounded-4xl border-2 border-deepTeal/20 bg-gradient-to-br from-deepTeal to-sage p-5 text-white shadow-medium md:right-10"
          >
            <div className="mb-2 flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-bold">Every Order Includes</p>
            </div>
            <ul className="space-y-1.5 text-sm leading-relaxed text-white/90">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-xs">✓</span>
                <span>Unique order tracking ID</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-xs">✓</span>
                <span>Transparent payment records</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-xs">✓</span>
                <span>Real-time dispatch updates</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);
