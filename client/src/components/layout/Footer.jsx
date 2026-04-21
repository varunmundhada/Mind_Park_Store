import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="relative mt-24 overflow-hidden border-t-2 border-sage/20 bg-gradient-to-br from-white via-warmCream to-mist">
    {/* Decorative background */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(143,185,150,0.08),transparent_50%)]" />
    
    <div className="container-shell relative py-16">
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand section */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center gap-3">
            <div className="relative">
              <img
                src="/brand/mindpark-logo.jpg"
                alt="Mind Park Foundation logo"
                className="h-16 w-16 rounded-3xl border-2 border-sage/30 object-cover shadow-soft"
              />
              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white bg-gradient-to-br from-sage to-deepTeal"></div>
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-ink">Mind Park Store</h3>
              <p className="text-sm font-medium text-sage">A Purpose-Driven Initiative</p>
            </div>
          </div>
          <p className="mb-6 max-w-md text-sm leading-relaxed text-slate-700">
            Every order supports rehabilitation, dignity, and livelihood through the meaningful work 
            of Mind Park Foundation. Shop with purpose, create lasting impact.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 rounded-full border-2 border-sage/30 bg-white px-4 py-2 text-sm font-semibold text-ink transition-all hover:border-sage hover:bg-sage hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Browse Products
            </Link>
            <Link 
              to="/our-story" 
              className="inline-flex items-center gap-2 rounded-full border-2 border-sage/30 bg-white px-4 py-2 text-sm font-semibold text-ink transition-all hover:border-sage hover:bg-sage hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Our Story
            </Link>
          </div>
        </div>
        
        {/* Contact section */}
        <div>
          <h4 className="mb-4 font-display text-lg font-bold text-ink">Get in Touch</h4>
          <div className="space-y-3">
            <a 
              href="tel:+918805510886" 
              className="flex items-start gap-3 text-sm text-slate-700 transition-colors hover:text-sage"
            >
              <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+91 88055 10886</span>
            </a>
            <div className="flex items-start gap-3 text-sm text-slate-700">
              <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="leading-relaxed">
                43F4+MG2, Madhav Nagar Rd,<br />
                Madhav Nagar, Nagpur,<br />
                Maharashtra 440010
              </span>
            </div>
            <a
              href="https://www.instagram.com/mind_park_cafe/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-sm font-semibold text-sage transition-colors hover:text-deepTeal"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @mind_park_cafe
            </a>
          </div>
        </div>
        
        {/* Mind Park Cafe section */}
        <div>
          <h4 className="mb-4 font-display text-lg font-bold text-ink">Mind Park Cafe</h4>
          <div className="rounded-3xl border-2 border-sage/20 bg-white/80 p-4 backdrop-blur-sm">
            <p className="mb-2 text-sm font-semibold text-sage">A slow-living cafe with a difference</p>
            <p className="mb-3 font-display text-base font-semibold text-ink">
              मन करा रे प्रसन्न, व्हा पुनर्नवं
            </p>
            <p className="text-xs leading-relaxed text-slate-600">
              Experience hospitality training, warm interactions, and inclusive community building 
              through our cafe initiative.
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom bar */}
      <div className="mt-12 border-t-2 border-sage/10 pt-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} Mind Park Foundation. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <Link to="/our-story" className="font-medium text-slate-700 transition-colors hover:text-sage">
              About Us
            </Link>
            <Link to="/makers" className="font-medium text-slate-700 transition-colors hover:text-sage">
              Meet the Makers
            </Link>
            <Link to="/get-involved" className="font-medium text-slate-700 transition-colors hover:text-sage">
              Support Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
