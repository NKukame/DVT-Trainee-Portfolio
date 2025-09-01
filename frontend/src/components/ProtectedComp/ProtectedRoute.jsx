import { Navigate, Outlet } from "react-router";
import SideBar from "../SidebarComp/SideBar";
import MobileNavbar from "../SidebarComp/MobileNavBar";
import MobileDock from "../SidebarComp/MobileNavDock";

export default function ProtectedRoutes() {
  const token = localStorage.getItem("token");
  return (
    <>
      {!token ? (
        <Navigate to={"/"} replace />
      ) : (
        <div className="app-layout">
          <SideBar />
          <MobileNavbar />
          <div className="app-layout-body">
            <Outlet />
          </div>
          <MobileDock />
        </div>
      )}
    </>
  );
}
