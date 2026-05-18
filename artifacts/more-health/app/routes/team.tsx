import { Navigate } from "@remix-run/react";

export default function TeamRedirect() {
  return <Navigate to="/dashboard" replace />;
}
