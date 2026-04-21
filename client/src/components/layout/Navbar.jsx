import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useShop } from "../../context/ShopContext";
import { useState } from "react";

const navLinkClass = ({ isActive }) =>
  `relative font-medium transition-all ${isActive ? "text-sage" : "text-slate-700 hover:text-sage"} ${isActive ? "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-gradient-to-r after:from-sage after:to-deepTeal" : ""}`;

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-sage/10 bg-white/95 shadow-soft backdrop-blur-xl">
      <div className="container-shell flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105">
          <div className="relative">
            <img
              src="/brand/mindpark-logo-round.png"
              alt="Mind Park Foundation logo"
              className="h-12 w-12 rounded-full border-2 border-sage/30 object-cover shadow-soft"
            />
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-gradient-to-br from-sage to-deepTeal"></div>
          </div>
          <div>
            <p className="font-display text-lg font-bold text-ink">Mind Park Store</p>
            <p className="text-xs font-medium text-sage">Powered by Mind Park Foundation</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm lg:flex">
          <NavLink to="/shop" className={navLinkClass}>
            Shop
          </NavLink>
          <NavLink to="/our-story" className={navLinkClass}>
            Our Story
          </NavLink>
          <NavLink to="/makers" className={navLinkClass}>
            Makers
          </NavLink>
          <NavLink to="/get-involved" className={navLinkClass}>
            Get Involved
          </NavLink>
          {user?.role === "seller" ? (
            <>
              <NavLink to="/admin" className={navLinkClass}>
                Admin
              </NavLink>
              <NavLink to="/galla" className={navLinkClass}>
                Galla
              </NavLink>
            </>
          ) : user?.role === "shubharti" ? (
            <NavLink to="/galla" className={navLinkClass}>
              Galla
            </NavLink>
          ) : (
            <NavLink to="/orders" className={navLinkClass}>
              Orders
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="group relative inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-sage/30 bg-white text-slate-700 shadow-soft transition-all hover:border-sage hover:bg-sage hover:text-white hover:shadow-medium"
            aria-label="View cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M3 4h2l2.4 10.2a2 2 0 0 0 2 1.5h7.9a2 2 0 0 0 2-1.6L21 7H7" />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
            {cartCount > 0 ? (
              <span className="absolute -right-1.5 -top-1.5 inline-flex min-h-6 min-w-6 items-center justify-center rounded-full bg-gradient-to-r from-coral to-terracotta px-1.5 text-xs font-bold text-white shadow-soft">
                {cartCount}
              </span>
            ) : null}
          </Link>

          {user ? (
            <div className="hidden items-center gap-3 lg:flex">
              <div className="flex items-center gap-2 rounded-full border-2 border-sage/20 bg-gradient-to-r from-warmCream to-mist px-4 py-2">
                <div className="h-2 w-2 rounded-full bg-sage"></div>
                <span className="text-sm font-semibold text-ink">{user.name}</span>
              </div>
              <button 
                className="rounded-full border-2 border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-ink transition-all hover:border-sage hover:bg-sage hover:text-white" 
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/auth" className="hidden rounded-full bg-gradient-to-r from-deepTeal to-sage px-5 py-2.5 text-sm font-bold text-white shadow-soft transition-all hover:shadow-glow lg:inline-flex">
              Login
            </Link>
          )}
          
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-sage/30 bg-white text-ink lg:hidden"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t-2 border-sage/10 bg-white/95 backdrop-blur-xl lg:hidden">
          <nav className="container-shell flex flex-col gap-2 py-4">
            <NavLink to="/shop" className="rounded-2xl px-4 py-3 font-medium text-slate-700 hover:bg-warmCream hover:text-sage" onClick={() => setMobileMenuOpen(false)}>
              Shop
            </NavLink>
            <NavLink to="/our-story" className="rounded-2xl px-4 py-3 font-medium text-slate-700 hover:bg-warmCream hover:text-sage" onClick={() => setMobileMenuOpen(false)}>
              Our Story
            </NavLink>
            <NavLink to="/makers" className="rounded-2xl px-4 py-3 font-medium text-slate-700 hover:bg-warmCream hover:text-sage" onClick={() => setMobileMenuOpen(false)}>
              Makers
            </NavLink>
            <NavLink to="/get-involved" className="rounded-2xl px-4 py-3 font-medium text-slate-700 hover:bg-warmCream hover:text-sage" onClick={() => setMobileMenuOpen(false)}>
              Get Involved
            </NavLink>
            {user ? (
              <>
                <div className="my-2 border-t border-sage/10"></div>
                <div className="rounded-2xl bg-warmCream px-4 py-3">
                  <p className="text-sm font-semibold text-ink">{user.name}</p>
                  <p className="text-xs text-slate-600">{user.email}</p>
                </div>
                <button 
                  className="rounded-2xl bg-gradient-to-r from-deepTeal to-sage px-4 py-3 font-semibold text-white" 
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth" className="rounded-2xl bg-gradient-to-r from-deepTeal to-sage px-4 py-3 text-center font-semibold text-white" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
