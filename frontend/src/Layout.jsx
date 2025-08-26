import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import SidebarLeft from "./components/SidebarLeft";
import SidebarRight from "./components/SidebarRight";
import { Outlet } from "react-router-dom";
import ErrorPop from "./utils/ErrorPop";
import { errorObj } from "./context/errorContext/errorContext";

function Layout() {
  const { isError, errMessage, errType, errorDispatch } = errorObj();
  const background = {
    backgroundColor: "#8360c3",
    background: "linear-gradient(to right, #8360c3, #2ebf91)",
  };
  useEffect(() => {
    if (isError) {
      setTimeout(
        () =>
          errorDispatch({
            type: "CLEAR_ERROR",
          }),
        5000
      );
    }
  }, [isError]);
  return (
    <>
      {isError && <ErrorPop message={errMessage} type={errType} />}
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
    </>
  );
}

export default Layout;
