import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { useShop } from "../../context/ShopContext";

export const AppLayout = ({ children }) => {
  const { cartToast } = useShop();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer />

      {cartToast ? (
        <div className="pointer-events-none fixed bottom-6 right-6 z-[80] animate-slide-up">
          <div className="flex items-center gap-3 rounded-3xl border-2 border-sage/30 bg-gradient-to-r from-deepTeal to-sage px-6 py-4 text-white shadow-glow backdrop-blur-sm">
            <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold">{cartToast}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};
