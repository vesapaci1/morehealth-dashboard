import earningsData from "@/data/earnings.json";

export function loader() {
  return earningsData;
}

export { Earnings as default } from "@/components/mockups/growth-hub/Earnings";
