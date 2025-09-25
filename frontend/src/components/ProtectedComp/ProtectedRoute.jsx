import { Navigate, Outlet } from "react-router";
import SideBar from "../SidebarComp/SideBar";
import MobileNavbar from "../SidebarComp/MobileNavBar";
import MobileDock from "../SidebarComp/MobileNavDock";
import { useUserStore } from "../../lib/useUser";
import { useEffect } from "react";

export default function ProtectedRoutes() {
  const token = localStorage.getItem("token");
  const fetchUser = useUserStore((state) => state.fetchUser);
  useEffect(() => {

    const navEntries = performance.getEntriesByType("navigation");

    if (navEntries.length > 0 && navEntries[0].type === "reload") {
    
      fetchUser();
    }

  }, []);
 
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
