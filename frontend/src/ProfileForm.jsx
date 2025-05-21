import './ProfileForm.css'
import React from "react";
import { useState, useEffect } from 'react';
import { User, Upload, Mail, Phone, Book, Code, Briefcase, Edit2} from 'lucide-react';
import Header from './components/Header';


const ProfileCreation = () =>
    {
      const [profile, setProfile] = useState(
        {
          //Array for personal information
          personalInfo:
          {
            fullName: '',
            email: '',
            phone: '',
            about: '',
            profilePicture: null
          },
          //For image preview
          profilePictureUrl: '',
          //Array for the skills
          skills: [''],
          //Array for the user's projects
          projects:[
            {
              title: '',
              description: '',
              technologies: '',
              link: ''
            }]
          //CV URL ??????????????????????????????????
          // cvUrl: '',
        });
  
        //Able to edit the form.
        const [isEditing, setIsEditing] = useState(true);
  
        //handling the personal information taken from the input field
        const handlePersonalInfoChange = (e) =>
        {
          const { name, value} = e.target;
  
          //setting the profile
          setProfile(prev => (
            {
              ...prev,
              personalInfo:
              {
                ...prev.personalInfo,
                [name]: value
              }
            }));
        };
  
        //adding a picture
        const addPic = (e) =>
        {
          if(!isEditing) return;
          const imgFile = e.target.files[0];
          //Update the profile pic in state
          if(imgFile)
          {
            setProfile(prev =>(
              {
                ...prev,
                personalInfo:
                {
                  ...prev.personalInfo,
                  profilePicture: imgFile
                },
                profilePictureUrl: URL.createObjectURL(imgFile)
              }));
          }
        };
  
        //Function to remove the profile picture
        const removePic = () =>
        {
          if(!isEditing) return;
          setProfile(prev => (
            {
              ...prev,
              personalInfo:
              {
                ...prev.personalInfo,
                profilePicture: null
              },
              profilePictureUrl: ''
            }));
        };
  
        //handling the skills being entered by the project owner
        const handleSkillChange = (index, value) =>
        {
          setProfile(prev => 
          {
            const newSkills = [...prev.skills];
            newSkills[index] = value;
  
            return{
              ...prev,
              skills: newSkills
            };
          });
        };
  
        //adding skills
        const addSkill = () =>
        {
          if(!isEditing) return;
          setProfile(prev => (
            {
              ...prev,
              skills: [...prev.skills, '']
            }));
        };
  
        //handling the projects
        const handleProjectChange = (index, field, value) =>
        {
          setProfile(prev => 
          {
            const newProjects = [...prev.projects];
            newProjects[index] = 
            {
              ...newProjects[index],
              [field]: value
            };
  
            return{
              ...prev,
              projects: newProjects
            };
          });
        };
  
        //adding projects
        const addProject = () => 
        {
          if(!isEditing) return;
          setProfile(prev =>(
            {
              ...prev,
              projects: [...prev.projects, 
                {
                  title: '',
                  description: '',
                  technologies: '',
                  link: ''
                }]
            }));
        };
  
        //Handling the submit button of the information provided
        const handleSubmit = async (e) =>
        {
          e.preventDefault();
          //Here i will implemet the API call to save the profile
          console.log('Profile data to save:', profile);
          //closing the ability to edit
          setIsEditing(false);
        };
  
        const toggleEditing = () =>
        {
          setIsEditing(prev => !prev);
        }
  
        //RETURN ==== PUT THE HTML HERE SO IT RETURNS THE UI
        return(
        <>
        <Header />
        <div className='profile-container'>
        <div className='profile-header'>
            <h1 className='profile-title'>Profile Creation</h1>
            <button
            type='button'
            onClick={toggleEditing}
            className='btn btn-edit'
            >
            <Edit2 size={16} />
            {isEditing ? 'View Mode' : 'Edit Mode'}
            </button>
        </div>
        {/*Form for the profile creation*/}
        <form className='profile-form' onSubmit={handleSubmit}>
            {/*Personal Information Section*/}
            <div className='personal-card'>
            <div className='card-header'>
                <User size={20} color='black'/>
                <h2>Personal Information</h2>
            </div>

            {/* Add Profile Picture Section */}
            <div className='profile-picture'>
                <div className='prof-pic-container'>
                    {profile.profilePictureUrl ? (
                    <div className='prof-pic-wrap'>
                        <img 
                        src={profile.profilePictureUrl} 
                        alt='Profile Image'
                        className='profile-image'
                        />
                        {isEditing && (
                        <button
                        type='button'
                        className='btn-remove-image'
                        onClick={removePic}
                        >
                        Remove Pic
                        </button>
                        )}
                    </div>
                    ):(
                    <div className='prof-pic-holder'>
                        <User size={40} color='black' />
                        {isEditing && (
                        <>
                            <input
                            type='file'
                            accept='image/*'
                            onChange={addPic}
                            className='prof-pic-input'
                            id='prof-pic-input'
                            disabled={!isEditing}
                            />
                            <label className='add-pic-label' htmlFor='prof-pic-input'>
                            Upload Photo
                            </label>
                        </>
                        )}
                    </div>
                    )}
                </div>
                </div>

            <div className='card-content'>
                <div className='personal-grid'>
                {/*Full name input*/}
                <div className='input-field'>
                    <input 
                    type='text'
                    name='fullName'
                    placeholder='Enter Full Name'
                    value={profile.personalInfo.fullName}
                    onChange={handlePersonalInfoChange}
                    className='form-input'
                    disabled={!isEditing}
                    />
                </div>
                {/*Email input*/}
                <div className='contact-input'>
                    <div className='input-field'>
                    <input 
                    type='email'
                    name='email'
                    placeholder='Enter Email Address'
                    value={profile.personalInfo.email}
                    onChange={handlePersonalInfoChange}
                    className='form-input'
                    disabled={!isEditing}
                        />
                    </div>
                    {/*Phone Number input*/}
                    <div className='input-field'>
                    <input 
                    type='tel'
                    name='phone'
                    placeholder='Enter Phone Number'
                    value={profile.personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                    className='form-input'
                    disabled={!isEditing}
                        />
                    </div>
                </div>
                </div>
                {/*About Yourself input*/}
                <div className='input-field'>
                <textarea 
                name='about'
                placeholder='Write About Yourself'
                value={profile.personalInfo.about}
                onChange={handlePersonalInfoChange}
                className='form-input textarea'
                disabled={!isEditing}
                    />
                </div>
            </div>
            </div>

            {/* Skills Section */}
            <div className='personal-card'>
            <div className='card-header'>
                <Code size={20} color='black'/>
                <h2>Skills</h2>
            </div>

            <div className='card-content'>
                {profile.skills.map((skill, index) => (
                <div className='skill-input-field' key={index}>
                {/*Skills input*/}
                <input 
                type='text'
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                placeholder='Enter your skill'
                className='form-input skill-input'
                disabled={!isEditing}
                    />
                </div>
                ))}
                {/*Adding skills button*/}
                {isEditing && (
                <button
                type='button'
                onClick={addSkill}
                className='btn btn-primary'
                >
                Add Skill
                </button>
                )}
            </div>
            </div>

            {/*Projects Section */}
            <div className='personal-card'>
                <div className='card-header'>
                <Briefcase size={20} color='black' />
                <h2>Projects</h2>
                </div>

                <div className='card-content'>
                {profile.projects.map((project, index) =>(
                    <div className='project-card' key={index}>
                    {/*Project title input*/}
                    <input 
                    type='text'
                    value={project.title}
                    onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                    placeholder='Enter Project Title'
                    className='form-input'
                    disabled={!isEditing}
                        />
                    {/*Project description input*/}
                    <textarea
                    name='description'
                    value={project.description}
                    onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                    placeholder='Enter Your Project Description'
                    className='form-input textarea'
                    disabled={!isEditing}
                        />
                    {/*Project technologies input*/}
                    <input
                    type='text'
                    value={project.technologies}
                    onChange={(e) => handleProjectChange(index, 'technologies', e.target.value)}
                    placeholder='Enter Technologies Used'
                    className='form-input'
                    disabled={!isEditing}
                        />
                    {/*Url link to your Project input*/}
                    <input
                    type='url'
                    value={project.link}
                    onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                    placeholder='Enter Project URL'
                    className='form-input'
                    disabled={!isEditing}
                        />
                    </div>
                ))}
                {/*Adding project button*/}
                {isEditing && (
                <button
                type='button'
                onClick={addProject}
                className='btn btn-primary'
                >
                    Add Project
                </button>
                )}
                </div>
            </div>
            
            {/*Submit button*/}
            {isEditing && (
            <button className='btn btn-secondary' type='submit'>
            Save Profile
            </button>
            )}
        </form>
        </div>
        </>
        );
    };

export default ProfileCreation;