import { useEffect, useMemo, useState } from "react";
import { api } from "../api/client";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useShop } from "../context/ShopContext";

const initialForm = {
  name: "",
  category: "Flours",
  subcategory: "",
  sku: "",
  unitLabel: "per item",
  price: 0,
  countInStock: 0,
  description: "",
  story: "",
  makerName: "",
  impactSummary: "",
  materials: "",
  tags: "",
  imageUrl: "",
  featured: false,
  isActive: true,
};

const buildProductForm = (product) => ({
  name: product.name || "",
  category: product.category || "Flours",
  subcategory: product.subcategory || "",
  sku: product.sku || "",
  unitLabel: product.unitLabel || "per item",
  price: product.price || 0,
  countInStock: product.countInStock || 0,
  description: product.description || "",
  story: product.story || "",
  makerName: product.makerName || "",
  impactSummary: product.impactSummary || "",
  materials: (product.materials || []).join(", "),
  tags: (product.tags || []).join(", "),
  imageUrl: product.images?.[0] || "",
  featured: Boolean(product.featured),
  isActive: product.isActive !== false,
});

export const AdminDashboardPage = () => {
  const { user } = useAuth();
  const { refreshProducts } = useShop();
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState("");
  const [savingProduct, setSavingProduct] = useState(false);
  const [productError, setProductError] = useState("");
  const [orderDrafts, setOrderDrafts] = useState({});

  const categoryOptions = useMemo(
    () => [...new Set(catalog.map((item) => item.category).filter(Boolean))],
    [catalog]
  );

  const loadAdminData = async () => {
    if (!user?.token) return;

    const [statsData, orderData, catalogData] = await Promise.all([
      api.get("/dashboard/stats", user.token),
      api.get("/orders", user.token),
      api.get("/products/admin/catalog", user.token),
    ]);

    setStats(statsData);
    setOrders(orderData);
    setCatalog(catalogData);
    setOrderDrafts(
      Object.fromEntries(
        orderData.map((order) => [
          order._id,
          {
            status: order.status,
            paymentStatus: order.paymentStatus,
            transactionId: order.transactionId || "",
            porterTrackingId: order.porterTrackingId || "",
            porterBookingId: order.porterDetails?.bookingId || order.porterTrackingId || "",
            porterName: order.porterDetails?.porterName || "",
            porterPhone: order.porterDetails?.porterPhone || "",
            vehicleNumber: order.porterDetails?.vehicleNumber || "",
            porterAppLink: order.porterDetails?.appLink || "",
            porterFare: order.porterFare || 0,
            adminNotes: order.adminNotes || "",
          },
        ])
      )
    );
  };

  useEffect(() => {
    loadAdminData().catch(() => {
      setStats(null);
      setOrders([]);
      setCatalog([]);
    });
  }, [user]);

  const recentOrders = useMemo(() => orders.slice(0, 5), [orders]);

  const handleFormChange = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId("");
    setProductError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user?.token) return;

    setSavingProduct(true);
    setProductError("");

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, form, user.token);
      } else {
        await api.post("/products", form, user.token);
      }

      resetForm();
      await Promise.all([loadAdminData(), refreshProducts()]);
    } catch (error) {
      setProductError(error.message);
    } finally {
      setSavingProduct(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm(buildProductForm(product));
  };

  const handleDelete = async (productId) => {
    if (!user?.token || !productId) return;
    await api.delete(`/products/${productId}`, user.token);
    await Promise.all([loadAdminData(), refreshProducts()]);
  };

  const handleStockAdjust = async (productId, delta) => {
    if (!user?.token || !productId || !delta) return;
    await api.patch(`/products/${productId}/stock-adjust`, { delta }, user.token);
    await Promise.all([loadAdminData(), refreshProducts()]);
  };

  const handlePublishToggle = async (productId, nextActive) => {
    if (!user?.token || !productId) return;
    await api.patch(`/products/${productId}/publish`, { isActive: nextActive }, user.token);
    await Promise.all([loadAdminData(), refreshProducts()]);
  };

  const handleOrderDraftChange = (orderId, key, value) => {
    setOrderDrafts((current) => ({
      ...current,
      [orderId]: {
        ...current[orderId],
        [key]: value,
      },
    }));
  };

  const handleOrderSave = async (orderId) => {
    if (!user?.token) return;
    const draft = orderDrafts[orderId] || {};
    const payload = {
      ...draft,
      porterTrackingId: draft.porterBookingId || draft.porterTrackingId || "",
      porterFare: Number(draft.porterFare || 0),
      porterDetails: {
        bookingId: draft.porterBookingId || "",
        porterName: draft.porterName || "",
        porterPhone: draft.porterPhone || "",
        vehicleNumber: draft.vehicleNumber || "",
        appLink: draft.porterAppLink || "",
      },
    };

    const updated = await api.put(`/orders/${orderId}`, payload, user.token);
    setOrders((current) => current.map((order) => (order._id === orderId ? updated : order)));
  };

  return (
    <section className="container-shell py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
            Mind Park Admin
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-ink">Store Control Center</h1>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-5">
        <div className="glass-panel p-5">
          <p className="text-sm text-slate-500">Products</p>
          <p className="mt-2 text-3xl font-semibold text-ink">{stats?.products ?? catalog.length}</p>
        </div>
        <div className="glass-panel p-5">
          <p className="text-sm text-slate-500">Active</p>
          <p className="mt-2 text-3xl font-semibold text-ink">{stats?.activeProducts ?? 0}</p>
        </div>
        <div className="glass-panel p-5">
          <p className="text-sm text-slate-500">Orders</p>
          <p className="mt-2 text-3xl font-semibold text-ink">{stats?.orders ?? orders.length}</p>
        </div>
        <div className="glass-panel p-5">
          <p className="text-sm text-slate-500">Pending Dispatch</p>
          <p className="mt-2 text-3xl font-semibold text-ink">{stats?.pendingDispatch ?? 0}</p>
        </div>
        <div className="glass-panel p-5">
          <p className="text-sm text-slate-500">Revenue</p>
          <p className="mt-2 text-3xl font-semibold text-ink">Rs. {stats?.revenue ?? 0}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form className="glass-panel p-6" onSubmit={handleSubmit}>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold text-ink">
              {editingId ? "Edit Product" : "Add Product"}
            </h2>
            {editingId ? (
              <button type="button" className="text-sm text-slate-600" onClick={resetForm}>
                Cancel edit
              </button>
            ) : null}
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {["name", "subcategory", "sku", "unitLabel", "makerName", "imageUrl"].map((field) => (
              <input
                key={field}
                value={form[field]}
                onChange={(event) => handleFormChange(field, event.target.value)}
                placeholder={field.replace(/([A-Z])/g, " $1")}
                className="rounded-2xl border border-slate-200 px-4 py-3 capitalize"
              />
            ))}
            <>
              <input
                list="admin-category-options"
                value={form.category}
                onChange={(event) => handleFormChange("category", event.target.value)}
                placeholder="Category (type or select existing)"
                className="rounded-2xl border border-slate-200 px-4 py-3"
              />
              <datalist id="admin-category-options">
                {categoryOptions.map((option) => (
                  <option key={option} value={option} />
                ))}
              </datalist>
            </>
            <input
              type="number"
              value={form.price}
              onChange={(event) => handleFormChange("price", Number(event.target.value))}
              placeholder="Price"
              className="rounded-2xl border border-slate-200 px-4 py-3"
            />
            <input
              type="number"
              value={form.countInStock}
              onChange={(event) => handleFormChange("countInStock", Number(event.target.value))}
              placeholder="Stock"
              className="rounded-2xl border border-slate-200 px-4 py-3"
            />
            <input
              value={form.materials}
              onChange={(event) => handleFormChange("materials", event.target.value)}
              placeholder="Materials, comma separated"
              className="rounded-2xl border border-slate-200 px-4 py-3"
            />
            <input
              value={form.tags}
              onChange={(event) => handleFormChange("tags", event.target.value)}
              placeholder="Tags, comma separated"
              className="rounded-2xl border border-slate-200 px-4 py-3"
            />
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 p-4">
            <p className="text-sm font-medium text-ink">Capture or upload product image</p>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="mt-2 block w-full text-sm text-slate-600"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = () => {
                  if (typeof reader.result === "string") {
                    handleFormChange("imageUrl", reader.result);
                  }
                };
                reader.readAsDataURL(file);
              }}
            />
          </div>

          <div className="mt-4 grid gap-4">
            {["description", "story", "impactSummary"].map((field) => (
              <textarea
                key={field}
                value={form[field]}
                onChange={(event) => handleFormChange(field, event.target.value)}
                placeholder={field.replace(/([A-Z])/g, " $1")}
                className="min-h-28 rounded-2xl border border-slate-200 px-4 py-3"
              />
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-600">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) => handleFormChange("featured", event.target.checked)}
              />
              Featured
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(event) => handleFormChange("isActive", event.target.checked)}
              />
              Visible in store
            </label>
          </div>

          {productError ? <p className="mt-4 text-sm text-rose-500">{productError}</p> : null}

          <Button type="submit" className="mt-6" disabled={savingProduct}>
            {savingProduct ? "Saving..." : editingId ? "Update Product" : "Create Product"}
          </Button>
        </form>

        <div className="space-y-6">
          <div className="glass-panel p-6">
            <h2 className="text-2xl font-semibold text-ink">Recent Orders</h2>
            <div className="mt-4 space-y-4">
              {recentOrders.length ? (
                recentOrders.map((order) => (
                  <div key={order._id} className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-medium text-ink">{order.orderNumber}</p>
                        <p className="text-sm text-slate-500">
                          {order.user?.name || "Buyer"} • {order.status}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-ink">Rs. {order.totalPrice}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-600">Orders will appear here once customers start buying.</p>
              )}
            </div>
          </div>

          <div className="glass-panel p-6">
            <h2 className="text-2xl font-semibold text-ink">Impact Snapshot</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-mist p-4">
                <p className="text-2xl font-semibold text-ink">{stats?.impact?.supportedPeople ?? 74}</p>
                <p className="text-sm text-slate-600">People supported</p>
              </div>
              <div className="rounded-2xl bg-mist p-4">
                <p className="text-2xl font-semibold text-ink">{stats?.impact?.therapyHours ?? 1280}</p>
                <p className="text-sm text-slate-600">Therapy hours</p>
              </div>
              <div className="rounded-2xl bg-mist p-4">
                <p className="text-2xl font-semibold text-ink">{stats?.lowStockProducts ?? 0}</p>
                <p className="text-sm text-slate-600">Low stock items</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-panel p-6">
          <h2 className="text-2xl font-semibold text-ink">Catalog Management</h2>
          <div className="mt-4 space-y-3">
            {catalog.map((product) => (
              <div
                key={product._id || product.slug}
                className="rounded-2xl bg-slate-50 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-ink">{product.name}</p>
                    <p className="text-sm text-slate-500">
                      {product.category}
                      {product.subcategory ? ` • ${product.subcategory}` : ""} • Rs. {product.price}
                    </p>
                    <p className="text-sm text-slate-500">
                      Stock: {product.countInStock} • {product.isActive ? "Visible" : "Hidden"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => handleEdit(product)}>
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handlePublishToggle(product._id, !product.isActive)}
                    >
                      {product.isActive ? "Unpublish" : "Publish"}
                    </Button>
                    <Button variant="secondary" onClick={() => handleStockAdjust(product._id, -1)}>
                      -1 Stock
                    </Button>
                    <Button variant="secondary" onClick={() => handleStockAdjust(product._id, 1)}>
                      +1 Stock
                    </Button>
                    <Button variant="secondary" onClick={() => handleDelete(product._id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6">
          <h2 className="text-2xl font-semibold text-ink">Order Operations</h2>
          <div className="mt-4 space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-ink">{order.orderNumber}</p>
                    <p className="text-sm text-slate-500">
                      {order.user?.name || "Buyer"} • {order.paymentMethod} • Rs. {order.totalPrice}
                    </p>
                  </div>
                  <p className="text-sm text-slate-500">{order.items.length} item(s)</p>
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
                  <select
                    value={orderDrafts[order._id]?.paymentStatus || order.paymentStatus}
                    onChange={(event) =>
                      handleOrderDraftChange(order._id, "paymentStatus", event.target.value)
                    }
                    className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  >
                    <option>Pending</option>
                    <option>Paid</option>
                    <option>Cash on Delivery</option>
                    <option>Failed</option>
                    <option>Refunded</option>
                  </select>
                  <input
                    value={orderDrafts[order._id]?.transactionId || ""}
                    onChange={(event) =>
                      handleOrderDraftChange(order._id, "transactionId", event.target.value)
                    }
                    placeholder="Transaction ID"
                    className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  />
                  <input
                    value={orderDrafts[order._id]?.porterBookingId || ""}
                    onChange={(event) =>
                      handleOrderDraftChange(order._id, "porterBookingId", event.target.value)
                    }
                    placeholder="Porter booking/tracking ID"
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
                  <input
                    value={orderDrafts[order._id]?.porterAppLink || ""}
                    onChange={(event) =>
                      handleOrderDraftChange(order._id, "porterAppLink", event.target.value)
                    }
                    placeholder="Porter app/share link (optional)"
                    className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  />
                  <input
                    type="number"
                    min="0"
                    value={orderDrafts[order._id]?.porterFare || 0}
                    onChange={(event) =>
                      handleOrderDraftChange(order._id, "porterFare", Number(event.target.value))
                    }
                    placeholder="Porter fare"
                    className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  />
                </div>

                <textarea
                  value={orderDrafts[order._id]?.adminNotes || ""}
                  onChange={(event) =>
                    handleOrderDraftChange(order._id, "adminNotes", event.target.value)
                  }
                  placeholder="Admin note visible in tracking timeline"
                  className="mt-3 min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />

                <Button className="mt-3" onClick={() => handleOrderSave(order._id)}>
                  Save Order Update
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
