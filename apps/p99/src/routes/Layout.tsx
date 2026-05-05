import { Link, Outlet, useLocation } from "react-router-dom";
import P99Navbar from "../components/P99Navbar";
import { Breadcrumbs } from "@diamondlightsource/sci-react-ui";

/* A common layout for all routes, consisting of Navbar and breadcrumbs */
export function Layout() {
  const location = useLocation();
  return (
    <div className="app">
      <P99Navbar />
      <Breadcrumbs path={location.pathname} linkComponent={Link} />
      <Outlet />
    </div>
  );
}
