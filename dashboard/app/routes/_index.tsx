import { redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";

export function loader({ request }: LoaderFunctionArgs) {
  const cookie = request.headers.get("Cookie") ?? "";
  const isLoggedIn = cookie.includes("session=");
  return redirect(isLoggedIn ? "/dashboard" : "/login");
}
