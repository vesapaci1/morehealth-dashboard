import dashboardData from "@/data/dashboard.json";

export function loader() {
  return dashboardData;
}

export { Dashboard as default } from "@/components/mockups/growth-hub/Dashboard";
