import './styles.css'
import Header from './components/Header';
import Body from './components/Body';
import SideBar from './components/SideBar';

function Home(){
    return(
        <>
            {/* <Header/> */}
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