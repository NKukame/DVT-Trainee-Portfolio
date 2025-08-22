import Body from "../../components/BodyComp/Body";
import MobileNavbar from "../../components/SidebarComp/MobileNavBar";
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
      </div>
    </>
  );
}

export default Home;

