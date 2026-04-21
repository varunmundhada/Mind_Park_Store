import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";

export const OrdersPage = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    []
  );

  useEffect(() => {
    if (!user?.token) return;

    api
      .get("/orders/mine", user.token)
      .then(setOrders)
      .catch(() => setOrders([]));
  }, [user]);

  return (
    <section className="container-shell py-12">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">Order History</h1>
      {location.state?.orderNumber ? (
        <div className="mt-6 rounded-3xl bg-mist p-5 text-sm text-slate-700">
          Order <span className="font-semibold text-ink">{location.state.orderNumber}</span> was
          placed successfully. Mind Park will update dispatch and delivery milestones here.
        </div>
      ) : null}
      <div className="mt-8 grid gap-4">
        {orders.length === 0 ? (
          <div className="glass-panel p-6 text-slate-600">No orders yet.</div>
        ) : (
          orders.map((order) => (
            <article key={order._id} className="glass-panel p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-ink">{order.orderNumber}</h2>
                  <p className="text-sm text-slate-500">
                    {order.status} • {dateFormatter.format(new Date(order.createdAt))}
                  </p>
                </div>
                <p className="text-lg font-semibold text-ink">Rs. {order.totalPrice}</p>
              </div>

              <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
                <div>
                  <p className="font-medium text-ink">Items</p>
                  <p className="mt-1">
                    {order.items.map((item) => `${item.name} x ${item.quantity}`).join(", ")}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-ink">Payment</p>
                  <p className="mt-1">
                    {order.paymentMethod} • {order.paymentStatus}
                  </p>
                  <p className="mt-1">Transaction ID: {order.transactionId || "Will be assigned"}</p>
                </div>
                <div>
                  <p className="font-medium text-ink">Delivery</p>
                  <p className="mt-1">
                    {order.deliveryPartner} •{" "}
                    {order.porterDetails?.bookingId || order.porterTrackingId || "Awaiting dispatch"}
                  </p>
                  {order.porterDetails?.porterName ? (
                    <p className="mt-1">Executive: {order.porterDetails.porterName}</p>
                  ) : null}
                  {order.porterDetails?.vehicleNumber ? (
                    <p className="mt-1">Vehicle: {order.porterDetails.vehicleNumber}</p>
                  ) : null}
                  {order.porterFare ? <p className="mt-1">Delivery fare: Rs. {order.porterFare}</p> : null}
                  {order.acceptedBy ? <p className="mt-1">Accepted by: {order.acceptedBy}</p> : null}
                  {order.porterDetails?.porterPhone ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      <a
                        href={`tel:${order.porterDetails.porterPhone}`}
                        className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        Call Porter
                      </a>
                      {order.porterDetails?.appLink ? (
                        <a
                          href={order.porterDetails.appLink}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700"
                        >
                          Open Porter Link
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                  <p className="mt-1">Liability: {order.deliveryLiability}</p>
                </div>
                <div>
                  <p className="font-medium text-ink">Shipping address</p>
                  <p className="mt-1">
                    {order.shippingAddress?.addressLine1}, {order.shippingAddress?.city},{" "}
                    {order.shippingAddress?.state} - {order.shippingAddress?.postalCode}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Tracking timeline
                </p>
                <div className="mt-3 grid gap-3">
                  {(order.statusTimeline || []).map((entry, index) => (
                    <div
                      key={`${order._id}-${entry.status}-${index}`}
                      className="rounded-2xl bg-slate-50 p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-medium text-ink">{entry.status}</p>
                        <p className="text-xs text-slate-500">
                          {dateFormatter.format(new Date(entry.timestamp))}
                        </p>
                      </div>
                      {entry.note ? <p className="mt-2 text-sm text-slate-600">{entry.note}</p> : null}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};
