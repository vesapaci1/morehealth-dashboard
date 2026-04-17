import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/i18n";
import NotFound from "@/pages/not-found";

import { Login } from "@/components/mockups/growth-hub/Login";
import { Dashboard } from "@/components/mockups/growth-hub/Dashboard";
import { Orders } from "@/components/mockups/growth-hub/Orders";
import { Earnings } from "@/components/mockups/growth-hub/Earnings";
import { Storefront } from "@/components/mockups/growth-hub/Storefront";
import { Subscriptions } from "@/components/mockups/growth-hub/Subscriptions";
import { Settings } from "@/components/mockups/growth-hub/Settings";
import { Notifications } from "@/components/mockups/growth-hub/Notifications";
import { ActivateAccount } from "@/components/mockups/growth-hub/ActivateAccount";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Redirect to="/login" />} />
      <Route path="/login" component={Login} />
      <Route path="/activate" component={ActivateAccount} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/orders" component={Orders} />
      <Route path="/earnings" component={Earnings} />
      <Route path="/storefront" component={Storefront} />
      <Route path="/subscriptions" component={Subscriptions} />
      <Route path="/settings" component={Settings} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/shop" component={() => <Redirect to="/dashboard" />} />
      <Route path="/enroll" component={() => <Redirect to="/dashboard" />} />
      <Route path="/analytics" component={() => <Redirect to="/dashboard" />} />
      <Route path="/team" component={() => <Redirect to="/dashboard" />} />
      <Route path="/support" component={() => <Redirect to="/settings" />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
