import '../../styles.css'
import './ProfileCreation.css';
import SideBar from '../../components/SidebarComp/SideBar';
import Stepper from '../../components/ProfileCreationComp/Stepper';
import { useDarkMode } from '../../components/DarkModeComp/DarkModeProvider';

function ProfileCreation(){
    const { darkMode, setDarkMode } = useDarkMode();
    return(
        <>
            <div className="app-layout">
                
                <SideBar/>

                <div className='app-layout-body'>

                    <div className="profile-creation-body">
                        
                        <div className='profile-creation-header'>
                            <Stepper/>
                        </div>
                        
                    </div>
                    
                </div>
                
            </div>
            
        </>
        
    )
}

export default ProfileCreation;