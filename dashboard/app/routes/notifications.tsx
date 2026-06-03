import notificationsData from "@/data/notifications.json";

export function loader() {
  return notificationsData;
}

export { Notifications as default } from "@/components/mockups/growth-hub/Notifications";
