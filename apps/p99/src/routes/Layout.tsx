import { Outlet } from "react-router-dom";
import P99Navbar from "../components/P99Navbar";

export function Layout() {
  return (
    <div className="app">
      <P99Navbar />
      <Outlet />
    </div>
  );
}
