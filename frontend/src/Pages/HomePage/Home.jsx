import Body from "../../components/BodyComp/Body";
import MobileNavbar from "../../components/SidebarComp/MobileNavBar";
import MobileDock from "../../components/SidebarComp/MobileNavDock";
import SideBar from "../../components/SidebarComp/SideBar";
import { useEffect } from 'react';

function Home(){
    useEffect(() => {
          if (window.sessionStorage.getItem("searchPageReloaded")) {
            window.sessionStorage.removeItem("searchPageReloaded", "true");
          }
        }, []);
    return(
        <>
            <div className="app-layout">
                
                <SideBar/>

                <div className='app-layout-body'>
                    <Body/>
                </div>
                
            </div>
            
        </>
        
    )
}

export default Home;
