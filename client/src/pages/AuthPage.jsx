import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

export const AuthPage = () => {
  const navigate = useNavigate();
  const { login, signup, loading } = useAuth();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      if (mode === "login") {
        const user = await login({ email: form.email, password: form.password });
        if (user.role === "seller") {
          navigate("/admin");
        } else if (user.role === "shubharti") {
          navigate("/galla");
        } else {
          navigate("/shop");
        }
      } else {
        await signup(form);
        navigate("/shop");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="container-shell py-12">
      <div className="mx-auto max-w-xl glass-panel p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
          {mode === "login" ? "Customer access" : "Create your customer account"}
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-ink">
          {mode === "login" ? "Sign in to Mind Park Store" : "Start shopping with purpose"}
        </h1>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {mode === "signup" ? (
            <input
              placeholder="Full name"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              required
            />
          ) : null}
          <input
            placeholder="Email address"
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
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            required
          />
          {error ? <p className="text-sm text-rose-500">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-slate-500">
          Mind Park administrators use a separate protected login.
        </p>
        <button
          type="button"
          className="mt-2 text-sm font-medium text-ink"
          onClick={() => navigate("/admin/login")}
        >
          Go to admin login
        </button>
        <button
          type="button"
          className="mt-5 text-sm text-slate-600"
          onClick={() => setMode((current) => (current === "login" ? "signup" : "login"))}
        >
          {mode === "login" ? "Need an account? Sign up" : "Already have an account? Login"}
        </button>
      </div>
    </section>
  );
};
