import { useEffect } from "react";
import { Outlet } from "react-router";
import { useAuthStore } from "./stores/authStore";

export default function AppLayout() {
  const init = useAuthStore((s) => s.init);
  const loading = useAuthStore((s) => s.loading);

  useEffect(() => {
    init();
  }, [init]);

  if (loading) {
    return <div>Loading session…</div>;
  }

  return <Outlet />;
}
