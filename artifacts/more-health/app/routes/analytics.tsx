import { Navigate } from "@remix-run/react";

export default function AnalyticsRedirect() {
  return <Navigate to="/dashboard" replace />;
}
