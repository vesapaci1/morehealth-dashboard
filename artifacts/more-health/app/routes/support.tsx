import { Navigate } from "@remix-run/react";

export default function SupportRedirect() {
  return <Navigate to="/settings" replace />;
}
