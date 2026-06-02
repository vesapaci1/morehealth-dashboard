import { Navigate } from "@remix-run/react";

export default function ShopRedirect() {
  return <Navigate to="/dashboard" replace />;
}
