import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useShop } from "../context/ShopContext";

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, clearCart } = useShop();
  const [form, setForm] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const donation = subtotal > 0 ? 100 : 0;

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user?.token || cart.length === 0) return;

    setSubmitting(true);
    setError("");

    try {
      const lineItems = cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      let transactionId;

      if (paymentMethod === "Online Payment") {
        const paymentConfig = await api.get("/payments/config", user.token);
        if (!paymentConfig.enabled || !paymentConfig.keyId) {
          throw new Error("Razorpay test payment is not configured on server");
        }

        const scriptReady = await loadRazorpayScript();
        if (!scriptReady) {
          throw new Error("Unable to load Razorpay checkout. Please refresh and try again.");
        }

        const razorpayOrder = await api.post(
          "/payments/create-order",
          { items: lineItems, impactDonation: donation },
          user.token
        );

        const paymentResult = await new Promise((resolve, reject) => {
          const razorpayInstance = new window.Razorpay({
            key: paymentConfig.keyId,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            name: "Mind Park Store",
            description: "Marketplace order payment",
            order_id: razorpayOrder.orderId,
            prefill: {
              name: form.fullName,
              email: form.email,
              contact: form.phone,
            },
            theme: {
              color: "#0f172a",
            },
            handler: async (response) => {
              try {
                const verification = await api.post("/payments/verify", response, user.token);
                resolve(verification);
              } catch (verifyError) {
                reject(verifyError);
              }
            },
            modal: {
              ondismiss: () => reject(new Error("Payment was cancelled")),
            },
          });

          razorpayInstance.open();
        });

        transactionId = paymentResult.transactionId;
      }

      const order = await api.post(
        "/orders",
        {
          items: lineItems,
          shippingAddress: form,
          paymentMethod,
          impactDonation: donation,
          transactionId,
        },
        user.token
      );

      clearCart();
      navigate("/orders", { state: { orderNumber: order.orderNumber } });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="container-shell py-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <form className="glass-panel p-6" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-semibold text-ink">Checkout</h1>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {Object.keys(form).map((key) => (
              <input
                key={key}
                name={key}
                placeholder={key.replace(/([A-Z])/g, " $1")}
                value={form[key]}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 px-4 py-3 capitalize"
                required
              />
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Payment method
            </p>
            <label className="flex items-start gap-3 rounded-2xl border border-slate-200 px-4 py-4">
              <input
                type="radio"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={paymentMethod === "Cash on Delivery"}
                onChange={(event) => setPaymentMethod(event.target.value)}
              />
              <span>
                <span className="block font-medium text-ink">Cash on Delivery</span>
                <span className="text-sm text-slate-500">
                  Mind Park collects payment during delivery and updates the order manually.
                </span>
              </span>
            </label>
            <label className="flex items-start gap-3 rounded-2xl border border-slate-200 px-4 py-4">
              <input
                type="radio"
                name="paymentMethod"
                value="Online Payment"
                checked={paymentMethod === "Online Payment"}
                onChange={(event) => setPaymentMethod(event.target.value)}
              />
              <span>
                <span className="block font-medium text-ink">Online Payment</span>
                <span className="text-sm text-slate-500">
                  A transaction ID is generated with the order for payment reference.
                </span>
              </span>
            </label>
          </div>

          {error ? <p className="mt-4 text-sm text-rose-500">{error}</p> : null}

          <Button type="submit" className="mt-6" disabled={submitting}>
            {submitting ? "Placing order..." : "Place Order"}
          </Button>
        </form>

        <div className="glass-panel h-fit p-6">
          <h2 className="text-2xl font-semibold text-ink">Order Summary</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Your order supports livelihood-linked rehabilitation and helps keep Mind Park&apos;s
            care programs sustainable.
          </p>
          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Items</span>
              <span>Rs. {subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Impact contribution</span>
              <span>Rs. {donation}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold text-ink">
              <span>Total</span>
              <span>Rs. {subtotal + donation}</span>
            </div>
          </div>
          <div className="mt-6 rounded-2xl bg-mist p-4 text-sm leading-6 text-slate-600">
            Mind Park remains responsible for order processing, dispatch, and Porter-based
            delivery coordination. Tracking details appear in the customer order history once the
            admin team updates them.
          </div>
        </div>
      </div>
    </section>
  );
};
