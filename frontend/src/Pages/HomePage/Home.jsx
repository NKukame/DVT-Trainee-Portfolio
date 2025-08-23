import Body from "../../components/BodyComp/Body";
import MobileNavbar from "../../components/SidebarComp/MobileNavBar";
import MobileDock from "../../components/SidebarComp/MobileNavDock";
import SideBar from "../../components/SidebarComp/SideBar";

function Home() {
  return (
    <>
      <div className="app-layout">
        <SideBar />

        <MobileNavbar />
        <div className="app-layout-body">
          <Body />
        </div>
        <MobileDock />
      </div>
    </>
  );
}

export default Home;
