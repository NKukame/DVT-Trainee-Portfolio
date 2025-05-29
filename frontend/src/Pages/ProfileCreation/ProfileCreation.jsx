import '../../styles.css'
import './ProfileCreation.css';
import SideBar from '../../components/SidebarComp/SideBar';
import Stepper from '../../components/ProfileCreationComp/Stepper';
import {Save, X} from 'lucide-react'
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
                            <Stepper currentStep={0}/>
                        </div>

                        <div className='profile-creation-content'>

                            <div className='profile-creation-content-header'>
                                <h1>Body</h1>
                            </div>

                            <div className="profile-creation-content-forms-container">
                                <h1>Forms</h1>
                            </div>

                            <div className="profile-creation-content-footer">
                                <div className="profile-creation-content-footer-left-sided-buttons">
                                    <button className='profile-creation-cancel-btn'> <X size={15} className='profile-creation-button-icon'/>Cancel</button>
                                    <button className='profile-creation-save-btn'> <Save size={15} className='profile-creation-button-icon'/>Save & Exit</button>
                                </div>

                                <div className="profile-creation-content-footer-page-numbers">
                                    <p>Page 1 of 7</p>
                                </div>

                                <div className="profile-creation-content-footer-left-sided-buttons">
                                    <button>Previous</button>
                                    <button>Next</button>
                                </div>
                            </div>

                        </div>
                        
                    </div>
                    
                </div>
                
            </div>
            
        </>
        
    )
}

export default ProfileCreation;