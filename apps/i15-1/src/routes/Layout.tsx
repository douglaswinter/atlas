import { Link, Outlet, useLocation } from "react-router-dom";
import WaffleNavbar from "../components/WaffleNavbar";
import { Breadcrumbs } from "@diamondlightsource/sci-react-ui";
import { AuthFallbackScreen } from "./Fallback";
import { ErrorBoundary } from "react-error-boundary";

/* A common layout for all routes, consisting of Navbar and breadcrumbs */
export function Layout() {
  const location = useLocation();
  return (
    <ErrorBoundary fallback={<AuthFallbackScreen />}>
      <div className="app">
        <WaffleNavbar />
        <Breadcrumbs path={location.pathname} linkComponent={Link} />
        <Outlet />
      </div>
    </ErrorBoundary>
  );
}
