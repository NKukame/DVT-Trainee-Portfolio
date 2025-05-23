import './styles.css'
import Body from './components/BodyComp/Body';
import SideBar from './components/SidebarComp/SideBar';

function Home(){
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