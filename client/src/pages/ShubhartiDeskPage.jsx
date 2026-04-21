import { useEffect, useMemo, useState } from "react";
import { api } from "../api/client";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

export const ShubhartiDeskPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [orderDrafts, setOrderDrafts] = useState({});
  const [loading, setLoading] = useState(true);

  const loadDeskData = async () => {
    if (!user?.token) return;

    const [orderData, catalogData] = await Promise.all([
      api.get("/orders", user.token),
      api.get("/products/admin/catalog", user.token),
    ]);

    setOrders(orderData);
    setCatalog(catalogData);
    setOrderDrafts(
      Object.fromEntries(
        orderData.map((order) => [
          order._id,
          {
            status: order.status,
            porterBookingId: order.porterDetails?.bookingId || order.porterTrackingId || "",
            porterName: order.porterDetails?.porterName || "",
            porterPhone: order.porterDetails?.porterPhone || "",
            vehicleNumber: order.porterDetails?.vehicleNumber || "",
            porterFare: order.porterFare || 0,
            adminNotes: order.adminNotes || "",
          },
        ])
      )
    );
  };

  useEffect(() => {
    loadDeskData()
      .catch(() => {
        setOrders([]);
        setCatalog([]);
      })
      .finally(() => setLoading(false));
  }, [user]);

  const activeOrders = useMemo(
    () =>
      orders.filter((order) =>
        ["Placed", "Accepted", "Confirmed", "Packed", "Dispatched", "Out for Delivery"].includes(
          order.status
        )
      ),
    [orders]
  );

  const handleOrderDraftChange = (orderId, key, value) => {
    setOrderDrafts((current) => ({
      ...current,
      [orderId]: {
        ...current[orderId],
        [key]: value,
      },
    }));
  };

  const saveOrderOps = async (orderId) => {
    if (!user?.token) return;
    const draft = orderDrafts[orderId] || {};
    const payload = {
      status: draft.status,
      porterFare: Number(draft.porterFare || 0),
      adminNotes: draft.adminNotes || "",
      porterTrackingId: draft.porterBookingId || "",
      porterDetails: {
        bookingId: draft.porterBookingId || "",
        porterName: draft.porterName || "",
        porterPhone: draft.porterPhone || "",
        vehicleNumber: draft.vehicleNumber || "",
      },
    };

    const updated = await api.put(`/orders/${orderId}`, payload, user.token);
    setOrders((current) => current.map((order) => (order._id === orderId ? updated : order)));
  };

  const adjustStock = async (productId, delta) => {
    if (!user?.token || !productId || !delta) return;
    const updated = await api.patch(`/products/${productId}/stock-adjust`, { delta }, user.token);
    setCatalog((current) => current.map((item) => (item._id === updated._id ? updated : item)));
  };

  return (
    <section className="container-shell py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Operations Desk</p>
          <h1 className="text-4xl font-semibold tracking-tight text-ink">Shubharti Galla Console</h1>
          <p className="mt-2 text-sm text-slate-600">
            Accept orders, enter Porter details with dynamic fare, and manage stock availability.
          </p>
        </div>
      </div>

      {loading ? <p className="mt-8 text-slate-600">Loading desk data...</p> : null}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="glass-panel p-6">
          <h2 className="text-2xl font-semibold text-ink">Order Acceptance and Porter Dispatch</h2>
          <div className="mt-4 space-y-4">
            {activeOrders.length === 0 ? (
              <p className="text-sm text-slate-600">No active orders right now.</p>
            ) : (
              activeOrders.map((order) => (
                <div key={order._id} className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-ink">{order.orderNumber}</p>
                      <p className="text-sm text-slate-500">
                        {order.user?.name || "Buyer"} • {order.status} • Rs. {order.totalPrice}
                      </p>
                    </div>
                    <p className="text-xs text-slate-500">{order.items.length} item(s)</p>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <select
                      value={orderDrafts[order._id]?.status || order.status}
                      onChange={(event) => handleOrderDraftChange(order._id, "status", event.target.value)}
                      className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    >
                      <option>Placed</option>
                      <option>Accepted</option>
                      <option>Confirmed</option>
                      <option>Packed</option>
                      <option>Dispatched</option>
                      <option>Out for Delivery</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                    <input
                      type="number"
                      min="0"
                      value={orderDrafts[order._id]?.porterFare || 0}
                      onChange={(event) =>
                        handleOrderDraftChange(order._id, "porterFare", Number(event.target.value))
                      }
                      placeholder="Porter fare (dynamic)"
                      className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    />
                    <input
                      value={orderDrafts[order._id]?.porterBookingId || ""}
                      onChange={(event) =>
                        handleOrderDraftChange(order._id, "porterBookingId", event.target.value)
                      }
                      placeholder="Porter booking ID"
                      className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    />
                    <input
                      value={orderDrafts[order._id]?.porterName || ""}
                      onChange={(event) =>
                        handleOrderDraftChange(order._id, "porterName", event.target.value)
                      }
                      placeholder="Porter executive name"
                      className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    />
                    <input
                      value={orderDrafts[order._id]?.porterPhone || ""}
                      onChange={(event) =>
                        handleOrderDraftChange(order._id, "porterPhone", event.target.value)
                      }
                      placeholder="Porter phone"
                      className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    />
                    <input
                      value={orderDrafts[order._id]?.vehicleNumber || ""}
                      onChange={(event) =>
                        handleOrderDraftChange(order._id, "vehicleNumber", event.target.value)
                      }
                      placeholder="Vehicle number"
                      className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    />
                  </div>

                  <textarea
                    value={orderDrafts[order._id]?.adminNotes || ""}
                    onChange={(event) =>
                      handleOrderDraftChange(order._id, "adminNotes", event.target.value)
                    }
                    placeholder="Galla desk notes"
                    className="mt-3 min-h-20 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  />

                  <Button className="mt-3" onClick={() => saveOrderOps(order._id)}>
                    Save Dispatch Update
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="glass-panel p-6">
          <h2 className="text-2xl font-semibold text-ink">Stock Availability Controls</h2>
          <p className="mt-2 text-sm text-slate-600">
            Use + or - to adjust stock in real time based on product movement at galla desk.
          </p>

          <div className="mt-4 space-y-3">
            {catalog.map((product) => (
              <div key={product._id} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-ink">{product.name}</p>
                    <p className="text-xs text-slate-500">{product.category}</p>
                  </div>
                  <span className="text-sm font-semibold text-ink">Stock: {product.countInStock}</span>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <Button variant="secondary" onClick={() => adjustStock(product._id, -1)}>
                    -1
                  </Button>
                  <Button variant="secondary" onClick={() => adjustStock(product._id, 1)}>
                    +1
                  </Button>
                  <Button variant="secondary" onClick={() => adjustStock(product._id, 5)}>
                    +5
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
