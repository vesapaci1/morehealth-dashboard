import { Navigate } from "@remix-run/react";

export default function EnrollRedirect() {
  return <Navigate to="/dashboard" replace />;
}
