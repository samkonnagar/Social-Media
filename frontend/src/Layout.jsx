import React from "react";
import Navbar from "./components/Navbar";
import SidebarLeft from "./components/SidebarLeft";
import SidebarRight from "./components/SidebarRight";
import { Outlet } from "react-router-dom";

function Layout() {
  const background = {
    backgroundColor: "#8360c3",
    background: "linear-gradient(to right, #8360c3, #2ebf91)",
  };
  return (
    <div className="min-h-screen" style={background}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <SidebarLeft />
        </div>

        <main className="col-span-6">
          <Outlet />
        </main>

        <aside className="col-span-3">
          <SidebarRight />
        </aside>
      </div>
    </div>
  );
}

export default Layout;
