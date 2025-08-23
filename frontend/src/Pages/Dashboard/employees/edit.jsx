import { useForm, useSelect } from "@refinedev/core";
import React from "react";

export const EditEmployee = ({ id = "fba62a39-1d53-4e79-9bb2-019902b40657" }) => {
  const { onFinish, mutation, query } = useForm({
    action: "edit",
    resource: "employee",
    id: id,
    meta: {
      // Include related data when fetching
      include: {
        education: true,
        certificates: true,
        career: true,
        testimonials: true,
        availability: true,
        techStack: {
          include: {
            techStack: true
          }
        },
        softSkills: {
          include: {
            softSkill: true
          }
        },
        projects: {
          include: {
            project: {
              include: {
                techStack: {
                  include: {
                    techStack: true
                  }
                },
                industries: {
                  include: {
                    industry: true
                  }
                }
              }
            }
          }
        }
      }
    },
  });

  const { options: techStackOptions } = useSelect({
    resource: "techStack",
    optionLabel: "name",
    optionValue: "id",
  });

  const { options: softSkillOptions } = useSelect({
    resource: "softSkill",
    optionLabel: "name",
    optionValue: "id",
  });

  // Initialize state with empty arrays
  const [educationEntries, setEducationEntries] = React.useState([{ id: "", institution: "", qualification: "" }]);
  const [certificationEntries, setCertificationEntries] = React.useState([{ id: "", certificate: "", certificatesInstitution: "" }]);
  const [careerEntries, setCareerEntries] = React.useState([{ id: "", role: "", company: "", duration: "" }]);
  const [testimonials, setTestimonials] = React.useState([{ id: "", company: "", quote: "", reference: "" }]);
  const [projects, setProjects] = React.useState([{ 
    id: "",
    name: "", 
    description: "", 
    repoLink: "", 
    demoLink: "", 
    technologies: [], 
    industries: [],
    image: ""
  }]);

  // Track which entries to delete
  const [entriesToDelete, setEntriesToDelete] = React.useState({
    education: [],
    certificates: [],
    career: [],
    testimonials: [],
    projects: []
  });

  // Load data when component mounts
  React.useEffect(() => {
    if (query.data?.data) {
      const record = query.data.data;
      
      // Populate education entries
      if (record.education && record.education.length > 0) {
        setEducationEntries(record.education.map(edu => ({
          id: edu.id,
          institution: edu.institution || "",
          qualification: edu.qualification || ""
        })));
      }
      
      // Populate certification entries
      if (record.certificates && record.certificates.length > 0) {
        setCertificationEntries(record.certificates.map(cert => ({
          id: cert.id,
          certificate: cert.name || "",
          certificatesInstitution: cert.institution || ""
        })));
      }
      
      // Populate career entries
      if (record.career && record.career.length > 0) {
        setCareerEntries(record.career.map(career => ({
          id: career.id,
          role: career.role || "",
          company: career.company || "",
          duration: career.duration || ""
        })));
      }
      
      // Populate testimonials
      if (record.testimonials && record.testimonials.length > 0) {
        setTestimonials(record.testimonials.map(testimonial => ({
          id: testimonial.id,
          company: testimonial.company || "",
          quote: testimonial.quote || "",
          reference: testimonial.reference || ""
        })));
      }
      
      // Populate projects
      if (record.projects && record.projects.length > 0) {
        setProjects(record.projects.map(projectMember => ({
          id: projectMember.project?.id,
          name: projectMember.project?.name || "",
          description: projectMember.project?.description || "",
          repoLink: projectMember.project?.github || "",
          demoLink: projectMember.project?.demo || "",
          technologies: projectMember.project?.techStack?.map(ts => ts.techStackId) || [],
          industries: projectMember.project?.industries?.map(ind => ind.industry?.name) || [],
          image: ""
        })));
      }
    }
  }, [query.data]);

  // Add/remove functions with proper ID handling
  const addEducationEntry = () => {
    setEducationEntries([...educationEntries, { id: "", institution: "", qualification: "" }]);
  };

  const removeEducationEntry = (index) => {
    const newEntries = [...educationEntries];
    const removedEntry = newEntries.splice(index, 1)[0];
    
    if (removedEntry.id) {
      setEntriesToDelete(prev => ({
        ...prev,
        education: [...prev.education, removedEntry.id]
      }));
    }
    
    setEducationEntries(newEntries);
  };

  const addCertificationEntry = () => {
    setCertificationEntries([...certificationEntries, { id: "", certificate: "", certificatesInstitution: "" }]);
  };

  const removeCertificationEntry = (index) => {
    const newEntries = [...certificationEntries];
    const removedEntry = newEntries.splice(index, 1)[0];
    
    if (removedEntry.id) {
      setEntriesToDelete(prev => ({
        ...prev,
        certificates: [...prev.certificates, removedEntry.id]
      }));
    }
    
    setCertificationEntries(newEntries);
  };

  const addCareerEntry = () => {
    setCareerEntries([...careerEntries, { id: "", role: "", company: "", duration: "" }]);
  };

  const removeCareerEntry = (index) => {
    const newEntries = [...careerEntries];
    const removedEntry = newEntries.splice(index, 1)[0];
    
    if (removedEntry.id) {
      setEntriesToDelete(prev => ({
        ...prev,
        career: [...prev.career, removedEntry.id]
      }));
    }
    
    setCareerEntries(newEntries);
  };

  const addTestimonial = () => {
    setTestimonials([...testimonials, { id: "", company: "", quote: "", reference: "" }]);
  };

  const removeTestimonial = (index) => {
    const newEntries = [...testimonials];
    const removedEntry = newEntries.splice(index, 1)[0];
    
    if (removedEntry.id) {
      setEntriesToDelete(prev => ({
        ...prev,
        testimonials: [...prev.testimonials, removedEntry.id]
      }));
    }
    
    setTestimonials(newEntries);
  };

  const addProject = () => {
    setProjects([...projects, { 
      id: "",
      name: "", 
      description: "", 
      repoLink: "", 
      demoLink: "", 
      technologies: [], 
      industries: [],
      image: ""
    }]);
  };

  const removeProject = (index) => {
  const newEntries = [...projects];
  const removedEntry = newEntries.splice(index, 1)[0];
  
  // For projects, we need to track the project ID, not the ProjectMember ID
  if (removedEntry.id) {
    setEntriesToDelete(prev => ({
      ...prev,
      projects: [...prev.projects, removedEntry.id]
    }));
  }
  
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
  let photoUrl = query.data?.data?.photoUrl; // Keep existing photo if no new one uploaded
  if (data.photoUrl && data.photoUrl instanceof File) {
    photoUrl = URL.createObjectURL(data.photoUrl);
  }

  // Helper function to build delete/upsert operations
  const buildRelationshipOperation = (entries, entriesToDelete, mapFn) => {
    const operation = {};
    
    // Only add deleteMany if there are entries to delete
    if (entriesToDelete.length > 0) {
      operation.deleteMany = {
        id: {
          in: entriesToDelete
        }
      };
    }
    
    // Filter and map entries for upsert
    const validEntries = entries.filter(entry => {
      // Check if entry has any meaningful content
      return Object.values(entry).some(value => value && value !== "");
    });
    
    if (validEntries.length > 0) {
      operation.upsert = validEntries.map(mapFn);
    }
    
    return operation;
  };

  // Create structured data for update
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
      deleteMany: {},
      create: Array.from(document.getElementById("techStack").selectedOptions)
        .map(option => ({
          techStackId: option.value
        }))
    },
    softSkills: {
      deleteMany: {},
      create: Array.from(document.getElementById("softSkills").selectedOptions)
        .map(option => ({
          softSkillId: option.value
        }))
    },
    availability: {
      upsert: {
        create: {
          available: data.available === "true",
          client: data.client || ""
        },
        update: {
          available: data.available === "true",
          client: data.client || ""
        }
      }
    },
    
    // Education with proper delete/upsert handling
    education: buildRelationshipOperation(
      educationEntries,
      entriesToDelete.education,
      (entry) => ({
        where: { id: entry.id || "new" },
        update: {
          institution: entry.institution,
          qualification: entry.qualification
        },
        create: {
          institution: entry.institution,
          qualification: entry.qualification
        }
      })
    ),
    
    // Certificates with proper delete/upsert handling
    certificates: buildRelationshipOperation(
      certificationEntries,
      entriesToDelete.certificates,
      (entry) => ({
        where: { id: entry.id || "new" },
        update: {
          name: entry.certificate,
          institution: entry.certificatesInstitution
        },
        create: {
          name: entry.certificate,
          institution: entry.certificatesInstitution
        }
      })
    ),
    
    // Career with proper delete/upsert handling
    career: buildRelationshipOperation(
      careerEntries,
      entriesToDelete.career,
      (entry) => ({
        where: { id: entry.id || "new" },
        update: {
          role: entry.role,
          company: entry.company,
          duration: entry.duration
        },
        create: {
          role: entry.role,
          company: entry.company,
          duration: entry.duration
        }
      })
    ),
    
    // Testimonials with proper delete/upsert handling
    testimonials: buildRelationshipOperation(
      testimonials,
      entriesToDelete.testimonials,
      (entry) => ({
        where: { id: entry.id || "new" },
        update: {
          company: entry.company,
          quote: entry.quote,
          reference: entry.reference
        },
        create: {
          company: entry.company,
          quote: entry.quote,
          reference: entry.reference
        }
      })
    ),
    
    // Projects with proper delete/upsert handling
    projects: {
      // Delete project memberships that should be removed
      deleteMany: entriesToDelete.projects.length > 0 ? {
        OR: entriesToDelete.projects.map(projectId => ({
          projectId: projectId
        }))
      } : undefined,
      
      // Upsert project memberships
      upsert: projects
        .filter(project => project.name && project.name.trim() !== "")
        .map(project => ({
          where: {
            projectId_employeeId: {
              projectId: project.id || "new-project-id",
              employeeId: id
            }
          },
          update: {
            role: data.role,
            project: project.id ? {
              update: {
                name: project.name,
                description: project.description,
                github: project.repoLink,
                demo: project.demoLink,
                screenshot: project.image ? URL.createObjectURL(project.image) : undefined,
                industries: {
                  deleteMany: {},
                  create: project.industries.map(industryName => ({
                    industry: {
                      connectOrCreate: {
                        where: { name: industryName },
                        create: { name: industryName }
                      }
                    }
                  }))
                },
                techStack: {
                  deleteMany: {},
                  create: project.technologies.map(techId => ({
                    techStackId: techId
                  }))
                }
              }
            } : undefined
          },
          create: {
            role: data.role,
            project: {
              create: {
                name: project.name,
                description: project.description,
                github: project.repoLink,
                demo: project.demoLink,
                screenshot: project.image ? URL.createObjectURL(project.image) : null,
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
                techStack: {
                  create: project.technologies.map(techId => ({
                    techStackId: techId
                  }))
                }
              }
            }
          }
        }))
    }
  };
  
  console.log(finalData);
  // Call onFinish to submit
  onFinish(finalData);
};

  if (!query.data?.data) {
    return <div>Loading...</div>;
  }

  const record = query.data.data;

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="title">Title</label>
      <select id="title" name="title" defaultValue={record?.title}>
        <option value="MR">Mr</option>
        <option value="MRS">Mrs</option>
        <option value="MS">Ms</option>
        <option value="DR">Dr</option>
      </select>

      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" defaultValue={record?.name} />

      <label htmlFor="surname">Surname</label>
      <input type="text" id="surname" name="surname" defaultValue={record?.surname} />

      <label htmlFor="birthday">Birthday</label>
      <input 
        type="date" 
        id="birthday" 
        name="birthday" 
        defaultValue={record?.birthday ? new Date(record.birthday).toISOString().split('T')[0] : ''}
      />

      <label htmlFor="photoUrl">Photo</label>
      <input type="file" id="photoUrl" name="photoUrl" />
      {record?.photoUrl && (
        <div>
          <p>Current photo:</p>
          <img src={record.photoUrl} alt="Current employee photo" style={{width: '100px', height: '100px', objectFit: 'cover'}} />
        </div>
      )}

      <label htmlFor="role">Role</label>
      <select id="role" name="role" defaultValue={record?.role}>
        <option value="DEVELOPER">Developer</option>
        <option value="DESIGNER">Designer</option>
        <option value="PROJECT_MANAGER">Project Manager</option>
        <option value="TEAM_LEAD">Team Lead</option>
        <option value="SENIOR_DEVELOPER">Senior Developer</option>
      </select>

      <label htmlFor="department">Department</label>
      <select id="department" name="department" defaultValue={record?.department}>
        <option value="ENGINEERING">Engineering</option>
        <option value="DESIGN">Design</option>
        <option value="MARKETING">Marketing</option>
        <option value="SALES">Sales</option>
        <option value="HR">HR</option>
      </select>

      <label htmlFor="company">Company</label>
      <input type="text" id="company" name="company" defaultValue={record?.company} />

      <label htmlFor="location">Location</label>
      <input type="text" id="location" name="location" defaultValue={record?.location} />

      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" defaultValue={record?.email} />

      <label htmlFor="phone">Phone</label>
      <input type="tel" id="phone" name="phone" defaultValue={record?.phone} />

      <label htmlFor="github">GitHub</label>
      <input type="text" id="github" name="github" defaultValue={record?.github} />

      <label htmlFor="linkedIn">LinkedIn</label>
      <input type="text" id="linkedIn" name="linkedIn" defaultValue={record?.linkedIn} />

      <label htmlFor="experience">Experience</label>
      <textarea id="experience" name="experience" defaultValue={record?.experience}></textarea>

      <label htmlFor="portfolio">Portfolio</label>
      <input type="text" id="portfolio" name="portfolio" defaultValue={record?.portfolio} />

      <label htmlFor="bio">Bio</label>
      <textarea id="bio" name="bio" defaultValue={record?.bio}></textarea>

      <label htmlFor="available">Available</label>
      <select id="available" name="available" defaultValue={record?.availability?.available?.toString()}>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>

      <label htmlFor="client">Client</label>
      <input type="text" id="client" name="client" defaultValue={record?.availability?.client} />

      <label htmlFor="techStack">Tech Stack</label>
      <select id="techStack" name="techStack" multiple>
        {techStackOptions?.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            selected={record?.techStack?.some(ts => ts.techStackId === option.value)}
          >
            {option.label}
          </option>
        ))}
      </select>

      <label htmlFor="softSkills">Soft Skills</label>
      <select id="softSkills" name="softSkills" multiple>
        {softSkillOptions?.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            selected={record?.softSkills?.some(ss => ss.softSkillId === option.value)}
          >
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
            {techStackOptions?.map((option) => (
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

      {mutation.isSuccess && <span>Successfully updated!</span>}
      <button type="submit">Update</button>
    </form>
  );
};