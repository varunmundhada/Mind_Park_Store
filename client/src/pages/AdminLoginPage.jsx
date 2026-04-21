import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { login, logout, loading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const user = await login(form);
      if (!["seller", "shubharti"].includes(user.role)) {
        logout();
        setError("This login is reserved for Mind Park operations staff only.");
        return;
      }
      navigate(user.role === "seller" ? "/admin" : "/galla");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="container-shell py-12">
      <div className="mx-auto max-w-xl glass-panel p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
          Admin control
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-ink">Mind Park operations login</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          This area is restricted to Mind Park staff managing products, orders, porter updates,
          and galla desk operations.
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input
            placeholder="Admin email"
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            required
          />
          <input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(event) =>
              setForm((current) => ({ ...current, password: event.target.value }))
            }
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            required
          />
          {error ? <p className="text-sm text-rose-500">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Login as admin"}
          </Button>
        </form>

        <button
          type="button"
          className="mt-5 text-sm text-slate-600"
          onClick={() => navigate("/auth")}
        >
          Back to customer login
        </button>
      </div>
    </section>
  );
};
