import ordersData from "@/data/orders.json";

export function loader() {
  return ordersData;
}

export { Orders as default } from "@/components/mockups/growth-hub/Orders";
