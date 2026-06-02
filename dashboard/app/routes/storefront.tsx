import storefrontData from "@/data/storefront.json";

export function loader() {
  return storefrontData;
}

export { Storefront as default } from "@/components/mockups/growth-hub/Storefront";
