import { Navigate } from "@remix-run/react";

export default function SubscriptionsRedirect() {
  return <Navigate to="/dashboard" replace />;
}
