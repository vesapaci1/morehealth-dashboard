import { Navigate } from "@remix-run/react";

export default function IndexRedirect() {
  return <Navigate to="/login" replace />;
}
