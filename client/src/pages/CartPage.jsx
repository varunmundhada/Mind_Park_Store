import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useShop } from "../context/ShopContext";

export const CartPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, updateQuantity } = useShop();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const donation = subtotal > 0 ? 100 : 0;
  const total = subtotal + donation;

  return (
    <section className="container-shell py-12">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-ink">Your Cart</h1>
          {cart.length === 0 ? (
            <div className="glass-panel p-6">
              <p className="text-slate-600">Your cart is empty. Explore products that support rehabilitation.</p>
              <Link to="/shop" className="mt-4 inline-block text-sm font-medium text-ink">
                Continue shopping
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <article
                key={item._id}
                className="glass-panel grid items-center gap-4 p-4 md:grid-cols-[120px_1fr_140px]"
              >
                <img src={item.images?.[0]} alt={item.name} className="h-28 w-full rounded-2xl object-cover" />
                <div>
                  <h2 className="text-lg font-semibold text-ink">{item.name}</h2>
                  <p className="text-sm text-slate-500">
                    {item.subcategory ? `${item.category} • ${item.subcategory}` : item.category}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">Rs. {item.price}</p>
                </div>
                <input
                  type="number"
                  min="0"
                  max={item.countInStock || undefined}
                  value={item.quantity}
                  onChange={(event) => updateQuantity(item._id, Number(event.target.value))}
                  className="rounded-2xl border border-slate-200 px-4 py-3"
                />
              </article>
            ))
          )}
        </div>

        <div className="glass-panel h-fit p-6">
          <h2 className="text-2xl font-semibold text-ink">Order Summary</h2>
          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs. {subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Impact contribution</span>
              <span>Rs. {donation}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold text-ink">
              <span>Total</span>
              <span>Rs. {total}</span>
            </div>
          </div>
          <Button
            className="mt-6 w-full"
            onClick={() => (user ? navigate("/checkout") : navigate("/auth"))}
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </Button>
          <p className="mt-4 text-xs leading-6 text-slate-500">
            Mind Park manages dispatch and delivery through Porter after order confirmation, and
            customers can follow those updates from their order history.
          </p>
        </div>
      </div>
    </section>
  );
};
