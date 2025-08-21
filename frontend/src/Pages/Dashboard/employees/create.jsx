import { useForm, useSelect } from "@refinedev/core";
import React from "react";
export const CreateEmployee = () => {
  const { onFinish, mutation } = useForm({
    action: "create",
    resource: "employee",
  });

  const { options } = useSelect({
    resource: "techStack",
    optionLabel: "name", 
    optionValue: "id", 
  });

  const { options: softSkillOptions } = useSelect({
    resource: "softSkill",
    optionLabel: "name", 
    optionValue: "id", 
  });

  const [educationEntries, setEducationEntries] = React.useState([{ institution: "", qualification: "" }]);
  const [certificationEntries, setCertificationEntries] = React.useState([{ certificate: "", certificatesInstitution: "" }]);
  const [careerEntries, setCareerEntries] = React.useState([{ role: "", company: "", duration: "" }]);
  const [testimonials, setTestimonials] = React.useState([{ company: "", quote: "", reference: "" }]);
  const [projects, setProjects] = React.useState([{ 
    name: "", 
    description: "", 
    repoLink: "", 
    demoLink: "", 
    technologies: [], 
    industries: [] ,
    image: ""
  }]);

  const addEducationEntry = () => {
    setEducationEntries([...educationEntries, { institution: "", qualification: "" }]);
  };

  const removeEducationEntry = (index) => {
    const newEntries = [...educationEntries];
    newEntries.splice(index, 1);
    setEducationEntries(newEntries);
  };

  const addCertificationEntry = () => {
    setCertificationEntries([...certificationEntries, { certificate: "", certificatesInstitution: "" }]);
  };

  const removeCertificationEntry = (index) => {
    const newEntries = [...certificationEntries];
    newEntries.splice(index, 1);
    setCertificationEntries(newEntries);
  };

  const addCareerEntry = () => {
    setCareerEntries([...careerEntries, { role: "", company: "", duration: "" }]);
  };

  const removeCareerEntry = (index) => {
    const newEntries = [...careerEntries];
    newEntries.splice(index, 1);
    setCareerEntries(newEntries);
  };

  const addTestimonial = () => {
    setTestimonials([...testimonials, { company: "", quote: "", reference: "" }]);
  };

  const removeTestimonial = (index) => {
    const newEntries = [...testimonials];
    newEntries.splice(index, 1);
    setTestimonials(newEntries);
  };

  const addProject = () => {
    setProjects([...projects, { 
      name: "", 
      description: "", 
      repoLink: "", 
      demoLink: "", 
      technologies: [], 
      industries: [] ,
      image: ""
    }]);
  };

  const removeProject = (index) => {
    const newEntries = [...projects];
    newEntries.splice(index, 1);
    setProjects(newEntries);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Format birthday as ISO-8601 date
    const birthday = data.birthday ? new Date(data.birthday).toISOString() : null;

    // Handle photo upload - convert file to string URL
    let photoUrl = null;
    if (data.photoUrl && data.photoUrl instanceof File) {
      photoUrl = URL.createObjectURL(data.photoUrl);
    }

    

    // Create structured data based on schema
    const finalData = {
      title: data.title,
      name: data.name,
      surname: data.surname,
      birthday: birthday,
      photoUrl: photoUrl,
      role: data.role,
      department: data.department,
      company: data.company,
      location: data.location,
      email: data.email,
      phone: data.phone,
      github: data.github,
      linkedIn: data.linkedIn,
      experience: data.experience,
      portfolio: data.portfolio,
      bio: data.bio,

      
      // Relationships
      techStack: {
        create: data.techStack ? [{
          techStackId: data.techStack
        }] : []
      },
      softSkills: {
        create: data.softSkills ? [{
          softSkillId: data.softSkills
        }] : []
      },
      availability: {
        create: {
          available: data.available === "true",
          client: data.client || ""
        }
      },
      education: {
        create: educationEntries.map(entry => ({
          institution: entry.institution,
          qualification: entry.qualification
        }))
      },
      certificates: {
        create: certificationEntries.map(entry => ({
          name: entry.certificate,
          institution: entry.certificatesInstitution
        }))
      },
      career: {
        create: careerEntries.map(entry => ({
          role: entry.role,
          company: entry.company,
          duration: entry.duration
        }))
      },
      testimonials: {
        create: testimonials.map(entry => ({
          company: entry.company,
          quote: entry.quote,
          reference: entry.reference
        }))
      },
      projects: {
        create: projects.map(project => ({
          role: data.role, // The employee's role in this project
          project: {
            create: {
              name: project.name,
              description: project.description,
              github: project.repoLink,
              demo: project.demoLink,
              screenshot: project.image ? URL.createObjectURL(project.image) : null,
              // Handle industries relationship
              industries: {
                create: project.industries.map(industryName => ({
                  industry: {
                    connectOrCreate: {
                      where: { name: industryName },
                      create: { name: industryName }
                    }
                  }
                }))
              },
              // Handle techStack relationship
              techStack: {
                create: project.technologies.map(techId => ({
                  techStackId: techId
                }))
              }
            }
          }
        }))
      }
    };

    // Call onFinish to submit
    onFinish(finalData);
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="title">Title</label>
      <select id="title" name="title">
        <option value="MR">Mr</option>
        <option value="MRS">Mrs</option>
        <option value="MS">Ms</option>
        <option value="DR">Dr</option>
      </select>

      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" />

      <label htmlFor="surname">Surname</label>
      <input type="text" id="surname" name="surname" />

      <label htmlFor="birthday">Birthday</label>
      <input 
        type="date" 
        id="birthday" 
        name="birthday" 
      />

      <label htmlFor="photoUrl">Photo</label>
      <input type="file" id="photoUrl" name="photoUrl" />

      <label htmlFor="role">Role</label>
      <select id="role" name="role">
        <option value="DEVELOPER">Developer</option>
        <option value="DESIGNER">Designer</option>
        <option value="PROJECT_MANAGER">Project Manager</option>
        <option value="TEAM_LEAD">Team Lead</option>
        <option value="SENIOR_DEVELOPER">Senior Developer</option>
      </select>

      <label htmlFor="department">Department</label>
      <select id="department" name="department">
        <option value="ENGINEERING">Engineering</option>
        <option value="DESIGN">Design</option>
        <option value="MARKETING">Marketing</option>
        <option value="SALES">Sales</option>
        <option value="HR">HR</option>
      </select>

      <label htmlFor="company">Company</label>
      <input type="text" id="company" name="company" />

      <label htmlFor="location">Location</label>
      <input type="text" id="location" name="location" />

      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" />

      <label htmlFor="phone">Phone</label>
      <input type="tel" id="phone" name="phone" />

      <label htmlFor="github">GitHub</label>
      <input type="text" id="github" name="github" />

      <label htmlFor="linkedIn">LinkedIn</label>
      <input type="text" id="linkedIn" name="linkedIn" />

      <label htmlFor="experience">Experience</label>
      <textarea id="experience" name="experience"></textarea>

      <label htmlFor="portfolio">Portfolio</label>
      <input type="text" id="portfolio" name="portfolio" />

      <label htmlFor="bio">Bio</label>
      <textarea id="bio" name="bio"></textarea>

      <label htmlFor="available">Available</label>
      <select id="available" name="available">
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>

      <label htmlFor="client">Client</label>
      <input type="text" id="client" name="client" />

      <label htmlFor="techStack">Tech Stack</label>
      <select id="techStack" name="techStack" multiple>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <label htmlFor="softSkills">Soft Skills</label>
      <select id="softSkills" name="softSkills" multiple>
        {softSkillOptions?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <h3>Education</h3>
      {educationEntries.map((entry, index) => (
        <div key={index} className="education-entry">
          <label htmlFor={`institution-${index}`}>Institution</label>
          <input 
            type="text" 
            id={`institution-${index}`} 
            name={`institution-${index}`} 
            value={entry.institution}
            onChange={(e) => {
              const newEntries = [...educationEntries];
              newEntries[index].institution = e.target.value;
              setEducationEntries(newEntries);
            }}
          />
          
          <label htmlFor={`qualification-${index}`}>Qualification</label>
          <input 
            type="text" 
            id={`qualification-${index}`} 
            name={`qualification-${index}`} 
            value={entry.qualification}
            onChange={(e) => {
              const newEntries = [...educationEntries];
              newEntries[index].qualification = e.target.value;
              setEducationEntries(newEntries);
            }}
          />
          
          <button type="button" onClick={() => removeEducationEntry(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addEducationEntry}>Add Education</button>

      <h3>Certificates</h3>
      {certificationEntries.map((entry, index) => (
        <div key={index} className="certification-entry">
          <label htmlFor={`certificate-${index}`}>Certificate</label>
          <input 
            type="text" 
            id={`certificate-${index}`} 
            name={`certificate-${index}`} 
            value={entry.certificate}
            onChange={(e) => {
              const newEntries = [...certificationEntries];
              newEntries[index].certificate = e.target.value;
              setCertificationEntries(newEntries);
            }}
          />
          
          <label htmlFor={`certificatesInstitution-${index}`}>Institution</label>
          <input 
            type="text" 
            id={`certificatesInstitution-${index}`} 
            name={`certificatesInstitution-${index}`} 
            value={entry.certificatesInstitution}
            onChange={(e) => {
              const newEntries = [...certificationEntries];
              newEntries[index].certificatesInstitution = e.target.value;
              setCertificationEntries(newEntries);
            }}
          />
          
          <button type="button" onClick={() => removeCertificationEntry(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addCertificationEntry}>Add Certificate</button>

      <h3>Career</h3>
      {careerEntries.map((entry, index) => (
        <div key={index} className="career-entry">
          <label htmlFor={`role-${index}`}>Role</label>
          <input 
            type="text" 
            id={`role-${index}`} 
            name={`role-${index}`} 
            value={entry.role}
            onChange={(e) => {
              const newEntries = [...careerEntries];
              newEntries[index].role = e.target.value;
              setCareerEntries(newEntries);
            }}
          />
          
          <label htmlFor={`company-${index}`}>Company</label>
          <input 
            type="text" 
            id={`company-${index}`} 
            name={`company-${index}`} 
            value={entry.company}
            onChange={(e) => {
              const newEntries = [...careerEntries];
              newEntries[index].company = e.target.value;
              setCareerEntries(newEntries);
            }}
          />
          
          <label htmlFor={`duration-${index}`}>Duration</label>
          <input 
            type="text" 
            id={`duration-${index}`} 
            name={`duration-${index}`} 
            value={entry.duration}
            onChange={(e) => {
              const newEntries = [...careerEntries];
              newEntries[index].duration = e.target.value;
              setCareerEntries(newEntries);
            }}
          />
          
          <button type="button" onClick={() => removeCareerEntry(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addCareerEntry}>Add Career Entry</button>

      <h3>Testimonials</h3>
      {testimonials.map((entry, index) => (
        <div key={index} className="testimonial-entry">
          <label htmlFor={`company-${index}`}>Company</label>
          <input 
            type="text" 
            id={`company-${index}`} 
            name={`company-${index}`} 
            value={entry.company}
            onChange={(e) => {
              const newEntries = [...testimonials];
              newEntries[index].company = e.target.value;
              setTestimonials(newEntries);
            }}
          />
          
          <label htmlFor={`quote-${index}`}>Quote</label>
          <textarea 
            id={`quote-${index}`} 
            name={`quote-${index}`} 
            value={entry.quote}
            onChange={(e) => {
              const newEntries = [...testimonials];
              newEntries[index].quote = e.target.value;
              setTestimonials(newEntries);
           }}
          />
          
          <label htmlFor={`reference-${index}`}>Reference</label>
          <input 
            type="text" 
            id={`reference-${index}`} 
            name={`reference-${index}`} 
            value={entry.reference}
            onChange={(e) => {
              const newEntries = [...testimonials];
              newEntries[index].reference = e.target.value;
              setTestimonials(newEntries);
            }}
          />
          
          <button type="button" onClick={() => removeTestimonial(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addTestimonial}>Add Testimonial</button>

      <h3>Projects</h3>
      {projects.map((project, index) => (
        <div key={index} className="project-entry">
          <label htmlFor={`name-${index}`}>Project Name</label>
          <input 
            type="text" 
            id={`name-${index}`} 
            name={`name-${index}`} 
            value={project.name}
            onChange={(e) => {
              const newEntries = [...projects];
              newEntries[index].name = e.target.value;
              setProjects(newEntries);
            }}
          />
          
          <label htmlFor={`description-${index}`}>Description</label>
          <textarea 
            id={`description-${index}`} 
            name={`description-${index}`} 
            value={project.description}
            onChange={(e) => {
              const newEntries = [...projects];
              newEntries[index].description = e.target.value;
              setProjects(newEntries);
            }}
          />
          
          <label htmlFor={`repoLink-${index}`}>Repository Link</label>
          <input 
            type="text" 
            id={`repoLink-${index}`} 
            name={`repoLink-${index}`} 
            value={project.repoLink}
            onChange={(e) => {
              const newEntries = [...projects];
              newEntries[index].repoLink = e.target.value;
              setProjects(newEntries);
            }}
          />
          
          <label htmlFor={`demoLink-${index}`}>Demo Link</label>
          <input 
            type="text" 
            id={`demoLink-${index}`} 
            name={`demoLink-${index}`} 
            value={project.demoLink}
            onChange={(e) => {
              const newEntries = [...projects];
              newEntries[index].demoLink = e.target.value;
              setProjects(newEntries);
            }}
          />
          
          <label htmlFor={`image-${index}`}>Project Image</label>
          <input 
            type="file" 
            id={`image-${index}`} 
            name={`image-${index}`} 
            onChange={(e) => {
              const newEntries = [...projects];
              newEntries[index].image = e.target.files[0];
              setProjects(newEntries);
            }}
          />
          
          <label htmlFor={`technologies-${index}`}>Technologies</label>
          <select 
            id={`technologies-${index}`} 
            name={`technologies-${index}`} 
            multiple
            value={project.technologies}
            onChange={(e) => {
              const newEntries = [...projects];
              newEntries[index].technologies = Array.from(e.target.selectedOptions).map(option => option.value);
              setProjects(newEntries);
            }}
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <label htmlFor={`industries-${index}`}>Industries</label>
          <select 
            id={`industries-${index}`} 
            name={`industries-${index}`} 
            multiple
            value={project.industries}
            onChange={(e) => {
              const newEntries = [...projects];
              newEntries[index].industries = Array.from(e.target.selectedOptions).map(option => option.value);
              setProjects(newEntries);
            }}
          >
            <option value="RETAIL">Retail</option>
            <option value="BANKING">Banking</option>
            <option value="INSURANCE">Insurance</option>
            <option value="EDUCATION">Education</option>
            <option value="MINING">Mining</option>
            <option value="MECS">MECS</option>
          </select>
          
          <button type="button" onClick={() => removeProject(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addProject}>Add Project</button>

      {mutation.isSuccess && <span>successfully submitted!</span>}
      <button type="submit">Submit</button>
    </form>
  );
};