import { Outlet } from "react-router-dom";
import TopHeader from "./Topheader";
import Navigation from "./Navigation";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopHeader />
      <Navigation />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
