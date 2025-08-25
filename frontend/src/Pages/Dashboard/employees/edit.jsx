import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { useForm } from "@refinedev/react-hook-form";
import { useAutocomplete, SaveButton, Edit } from "@refinedev/mui";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

/** helper: file -> base64 */
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });

export const EditEmployee = () => {
  const {
    register,
    control,
    handleSubmit,
    refineCore: { onFinish, query },
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    refineCoreProps: {
      meta: {
        include: {
          education: true,
          certificates: true,
          career: true,
          testimonials: true,
          availability: true,
          techStack: { include: { techStack: true } },
          softSkills: { include: { softSkill: true } },
          projects: {
            include: {
              project: {
                include: {
                  techStack: { include: { techStack: true } },
                  industries: { include: { industry: true } },
                },
              },
            },
          },
        },
      },
    },
    defaultValues: {
      title: "MR",
      name: "",
      surname: "",
      birthday: "",
      photoUrl: null,
      role: "DEVELOPER",
      department: "ENGINEERING",
      company: "",
      location: "",
      email: "",
      phone: "",
      github: "",
      linkedIn: "",
      experience: "",
      portfolio: "",
      bio: "",
      available: true,
      client: "",
      techStack: [],
      softSkills: [],
      education: [{ id: "", institution: "", qualification: "" }],
      certificates: [{ id: "", name: "", institution: "" }],
      career: [{ id: "", role: "", company: "", duration: "" }],
      testimonials: [{ id: "", company: "", quote: "", reference: "" }],
      projects: [
        {
          id: "",
          name: "",
          description: "",
          repoLink: "",
          demoLink: "",
          technologies: [],
          industries: [],
          image: null,
        },
      ],
    },
  });

  // Autocomplete sources
  const { autocompleteProps: techAutocompleteProps } = useAutocomplete({
    resource: "techStack",
    optionLabel: "name",
    optionValue: "id",
  });
  const { autocompleteProps: softAutocompleteProps } = useAutocomplete({
    resource: "softSkill",
    optionLabel: "name",
    optionValue: "id",
  });
  const { autocompleteProps: industryAutocompleteProps } = useAutocomplete({
    resource: "industry",
    optionLabel: "name",
    optionValue: "name",
  });

  // track deletions for arrays (to be wired with array UI next)
  const [entriesToDelete, setEntriesToDelete] = React.useState({
    education: [],
    certificates: [],
    career: [],
    testimonials: [],
    projects: [],
  });

  // Field arrays for dynamic sections
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({ control, name: "education" });
  const {
    fields: certificateFields,
    append: appendCertificate,
    remove: removeCertificate,
  } = useFieldArray({ control, name: "certificates" });
  const {
    fields: careerFields,
    append: appendCareer,
    remove: removeCareer,
  } = useFieldArray({ control, name: "career" });
  const {
    fields: testimonialFields,
    append: appendTestimonial,
    remove: removeTestimonial,
  } = useFieldArray({ control, name: "testimonials" });
  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({ control, name: "projects" });

  // Removal handlers to capture IDs for deletion
  const handleRemoveEducation = (index) => {
    const id = getValues(`education.${index}.id`);
    if (id) {
      setEntriesToDelete((prev) => ({ ...prev, education: [...prev.education, id] }));
    }
    removeEducation(index);
  };
  const handleRemoveCertificate = (index) => {
    const id = getValues(`certificates.${index}.id`);
    if (id) {
      setEntriesToDelete((prev) => ({ ...prev, certificates: [...prev.certificates, id] }));
    }
    removeCertificate(index);
  };
  const handleRemoveCareer = (index) => {
    const id = getValues(`career.${index}.id`);
    if (id) {
      setEntriesToDelete((prev) => ({ ...prev, career: [...prev.career, id] }));
    }
    removeCareer(index);
  };
  const handleRemoveTestimonial = (index) => {
    const id = getValues(`testimonials.${index}.id`);
    if (id) {
      setEntriesToDelete((prev) => ({ ...prev, testimonials: [...prev.testimonials, id] }));
    }
    removeTestimonial(index);
  };
  const handleRemoveProject = (index) => {
    const id = getValues(`projects.${index}.id`);
    if (id) {
      setEntriesToDelete((prev) => ({ ...prev, projects: [...prev.projects, id] }));
    }
    removeProject(index);
  };

  // Load existing record into RHF defaults
  React.useEffect(() => {
    const record = query?.data?.data;
    if (!record) return;
    reset({
      title: record.title ?? "MR",
      name: record.name ?? "",
      surname: record.surname ?? "",
      birthday: record.birthday
        ? new Date(record.birthday).toISOString().split("T")[0]
        : "",
      photoUrl: null,
      role: record.role ?? "DEVELOPER",
      department: record.department ?? "ENGINEERING",
      company: record.company ?? "",
      location: record.location ?? "",
      email: record.email ?? "",
      phone: record.phone ?? "",
      github: record.github ?? "",
      linkedIn: record.linkedIn ?? "",
      experience: record.experience ?? "",
      portfolio: record.portfolio ?? "",
      bio: record.bio ?? "",
      available: record.availability?.available ?? true,
      client: record.availability?.client ?? "",
      techStack: (record.techStack || []).map((t) => t.techStackId),
      softSkills: (record.softSkills || []).map((s) => s.softSkillId),
      education:
        (record.education || []).map((e) => ({
          id: e.id,
          institution: e.institution || "",
          qualification: e.qualification || "",
        })) || [{ id: "", institution: "", qualification: "" }],
      certificates:
        (record.certificates || []).map((c) => ({
          id: c.id,
          name: c.name || "",
          institution: c.institution || "",
        })) || [{ id: "", name: "", institution: "" }],
      career:
        (record.career || []).map((c) => ({
          id: c.id,
          role: c.role || "",
          company: c.company || "",
          duration: c.duration || "",
        })) || [{ id: "", role: "", company: "", duration: "" }],
      testimonials:
        (record.testimonials || []).map((t) => ({
          id: t.id,
          company: t.company || "",
          quote: t.quote || "",
          reference: t.reference || "",
        })) || [{ id: "", company: "", quote: "", reference: "" }],
      projects:
        (record.projects || []).map((pm) => ({
          id: pm.project?.id,
          name: pm.project?.name || "",
          description: pm.project?.description || "",
          repoLink: pm.project?.github || "",
          demoLink: pm.project?.demo || "",
          technologies: pm.project?.techStack?.map((ts) => ts.techStackId) || [],
          industries:
            pm.project?.industries?.map((ind) => ind.industry?.name).filter(Boolean) || [],
          image: null,
        })) || [
          {
            id: "",
            name: "",
            description: "",
            repoLink: "",
            demoLink: "",
            technologies: [],
            industries: [],
            image: null,
          },
        ],
    });
    setEntriesToDelete({ education: [], certificates: [], career: [], testimonials: [], projects: [] });
  }, [query?.data?.data, reset]);

  const onSubmit = async (values) => {
    const record = query?.data?.data;
    const employeeId = record?.id;

    // base64 conversions
    const photoBase64 = values.photoUrl ? await fileToBase64(values.photoUrl) : undefined;

    // tech/soft diffs
    const existingTechIds = (record?.techStack || []).map((t) => t.techStackId);
    const existingSoftIds = (record?.softSkills || []).map((s) => s.softSkillId);
    const uniqTech = Array.from(new Set(values.techStack || []));
    const uniqSoft = Array.from(new Set(values.softSkills || []));
    const toAddTech = uniqTech.filter((id) => !existingTechIds.includes(id));
    const toRemoveTech = existingTechIds.filter((id) => !uniqTech.includes(id));
    const toAddSoft = uniqSoft.filter((id) => !existingSoftIds.includes(id));
    const toRemoveSoft = existingSoftIds.filter((id) => !uniqSoft.includes(id));

    // Helper to build delete/upsert blocks
    const buildRelationshipOperation = (entries, idsToDelete, mapFn) => {
      const op = {};
      if ((idsToDelete || []).length > 0) {
        op.deleteMany = { id: { in: idsToDelete } };
      }
      const valid = (entries || []).filter((e) => Object.values(e || {}).some((v) => v !== undefined && v !== null && String(v).trim() !== ""));
      if (valid.length > 0) {
        op.upsert = valid.map(mapFn);
      }
      return op;
    };

    // Projects upsert payload (with screenshot conversions)
    const projectsUpsert = await Promise.all(
      (values.projects || [])
        .filter((p) => (p?.name || "").trim() !== "")
        .map(async (p) => {
          const screenshot = p.image ? await fileToBase64(p.image) : undefined;
          return {
            where: {
              projectId_employeeId: {
                projectId: p.id || "new-project-id",
                employeeId,
              },
            },
            update: {
              role: values.role,
              project: p.id
                ? {
                    update: {
                      name: p.name,
                      description: p.description,
                      github: p.repoLink || null,
                      demo: p.demoLink || null,
                      ...(screenshot ? { screenshot } : {}),
                      industries: {
                        deleteMany: {},
                        create: (p.industries || []).map((industryName) => ({
                          industry: {
                            connectOrCreate: {
                              where: { name: industryName },
                              create: { name: industryName },
                            },
                          },
                        })),
                      },
                      techStack: {
                        deleteMany: {},
                        create: (p.technologies || []).map((techId) => ({ techStackId: techId })),
                      },
                    },
                  }
                : undefined,
            },
            create: {
              role: values.role,
              project: {
                create: {
                  name: p.name,
                  description: p.description,
                  github: p.repoLink || null,
                  demo: p.demoLink || null,
                  screenshot: p.image ? screenshot || null : null,
                  industries: {
                    create: (p.industries || []).map((industryName) => ({
                      industry: {
                        connectOrCreate: {
                          where: { name: industryName },
                          create: { name: industryName },
                        },
                      },
                    })),
                  },
                  techStack: {
                    create: (p.technologies || []).map((techId) => ({ techStackId: techId })),
                  },
                },
              },
            },
          };
        })
    );

    const birthday = values.birthday ? new Date(values.birthday).toISOString() : null;

    // Build nested operations (avoid empty objects)
    const educationOp = buildRelationshipOperation(
      values.education,
      entriesToDelete.education,
      (e) => ({
        where: { id: e.id || "new" },
        update: { institution: e.institution, qualification: e.qualification },
        create: { institution: e.institution, qualification: e.qualification },
      })
    );
    const certificatesOp = buildRelationshipOperation(
      values.certificates,
      entriesToDelete.certificates,
      (c) => ({
        where: { id: c.id || "new" },
        update: { name: c.name, institution: c.institution },
        create: { name: c.name, institution: c.institution },
      })
    );
    const careerOp = buildRelationshipOperation(
      values.career,
      entriesToDelete.career,
      (c) => ({
        where: { id: c.id || "new" },
        update: { role: c.role, company: c.company, duration: c.duration },
        create: { role: c.role, company: c.company, duration: c.duration },
      })
    );
    const testimonialsOp = buildRelationshipOperation(
      values.testimonials,
      entriesToDelete.testimonials,
      (t) => ({
        where: { id: t.id || "new" },
        update: { company: t.company, quote: t.quote, reference: t.reference },
        create: { company: t.company, quote: t.quote, reference: t.reference },
      })
    );

    const finalData = {
      title: values.title,
      name: values.name,
      surname: values.surname,
      birthday,
      ...(photoBase64 ? { photoUrl: photoBase64 } : {}),
      role: values.role,
      department: values.department,
      company: values.company,
      location: values.location,
      email: values.email,
      phone: values.phone,
      github: values.github,
      linkedIn: values.linkedIn,
      experience: values.experience,
      portfolio: values.portfolio,
      bio: values.bio,
      availability: {
        upsert: {
          create: { available: !!values.available, client: values.client || "" },
          update: { available: !!values.available, client: values.client || "" },
        },
      },
      ...(Object.keys(educationOp).length ? { education: educationOp } : {}),
      ...(Object.keys(certificatesOp).length ? { certificates: certificatesOp } : {}),
      ...(Object.keys(careerOp).length ? { career: careerOp } : {}),
      ...(Object.keys(testimonialsOp).length ? { testimonials: testimonialsOp } : {}),
      projects: {
        ...(entriesToDelete.projects.length
          ? { deleteMany: { OR: entriesToDelete.projects.map((projectId) => ({ projectId })) } }
          : {}),
        ...(projectsUpsert.length ? { upsert: projectsUpsert } : {}),
      },
    };

    if (toAddTech.length || toRemoveTech.length) {
      finalData.techStack = {
        ...(toRemoveTech.length ? { deleteMany: { techStackId: { in: toRemoveTech } } } : {}),
        ...(toAddTech.length ? { create: toAddTech.map((id) => ({ techStackId: id })) } : {}),
      };
    }
    if (toAddSoft.length || toRemoveSoft.length) {
      finalData.softSkills = {
        ...(toRemoveSoft.length ? { deleteMany: { softSkillId: { in: toRemoveSoft } } } : {}),
        ...(toAddSoft.length ? { create: toAddSoft.map((id) => ({ softSkillId: id })) } : {}),
      };
    }

    await onFinish(finalData);
  };

  if (!query?.data?.data) {
    return <div>Loading...</div>;
  }

  const record = query?.data?.data;

  return (
    <Edit>
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5">Edit Employee</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>
          <TextField select label="Title" fullWidth defaultValue={record?.title ?? "MR"} {...register("title")}>
            <MenuItem value="MR">Mr</MenuItem>
            <MenuItem value="MRS">Mrs</MenuItem>
            <MenuItem value="MS">Ms</MenuItem>
            <MenuItem value="DR">Dr</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={5}>
          <TextField label="Name" fullWidth {...register("name")} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField label="Surname" fullWidth {...register("surname")} />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField type="date" label="Birthday" InputLabelProps={{ shrink: true }} fullWidth {...register("birthday")} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Controller control={control} name="photoUrl" render={({ field }) => (
            <input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0] ?? null)} />
          )} />
          {record?.photoUrl && (
            <div>
              <Typography variant="caption">Current photo:</Typography>
              <img src={record.photoUrl} alt="Current employee" style={{ width: 80, height: 80, objectFit: "cover", display: "block", marginTop: 4 }} />
            </div>
          )}
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField select label="Role" fullWidth defaultValue={record?.role ?? "DEVELOPER"} {...register("role")}>
            <MenuItem value="DEVELOPER">Developer</MenuItem>
            <MenuItem value="DESIGNER">Designer</MenuItem>
            <MenuItem value="PROJECT_MANAGER">Project Manager</MenuItem>
            <MenuItem value="TEAM_LEAD">Team Lead</MenuItem>
            <MenuItem value="SENIOR_DEVELOPER">Senior Developer</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField select label="Department" fullWidth defaultValue={record?.department ?? "ENGINEERING"} {...register("department")}>
            <MenuItem value="ENGINEERING">Engineering</MenuItem>
            <MenuItem value="DESIGN">Design</MenuItem>
            <MenuItem value="MARKETING">Marketing</MenuItem>
            <MenuItem value="SALES">Sales</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={8}>
          <TextField label="Company" fullWidth {...register("company")} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Location" fullWidth {...register("location")} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Email" fullWidth {...register("email")} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Phone" fullWidth {...register("phone")} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="GitHub" fullWidth {...register("github")} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="LinkedIn" fullWidth {...register("linkedIn")} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Experience" fullWidth multiline rows={3} {...register("experience")} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Portfolio" fullWidth {...register("portfolio")} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Bio" fullWidth multiline rows={4} {...register("bio")} />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Controller
            control={control}
            name="available"
            render={({ field }) => (
              <TextField
                select
                fullWidth
                label="Available"
                value={field.value ? "true" : "false"}
                onChange={(e) => field.onChange(e.target.value === "true")}
              >
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField label="Client" fullWidth {...register("client")} />
        </Grid>

        <Grid item xs={12}>
          <Controller
            control={control}
            name="techStack"
            defaultValue={[]}
            render={({ field }) => (
              <Autocomplete
                multiple
                options={techAutocompleteProps?.options || []}
                getOptionLabel={(o) => o?.name ?? o?.title ?? ""}
                isOptionEqualToValue={(option, value) => option?.id === (value?.id ?? value)}
                value={(techAutocompleteProps?.options || []).filter((opt) => (field.value || []).includes(opt.id))}
                onChange={(_, v) => field.onChange(v.map((it) => it?.id ?? it))}
                renderInput={(params) => <TextField {...params} label="Tech Stack" />}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            control={control}
            name="softSkills"
            defaultValue={[]}
            render={({ field }) => (
              <Autocomplete
                multiple
                options={softAutocompleteProps?.options || []}
                getOptionLabel={(o) => o?.name ?? o?.title ?? ""}
                isOptionEqualToValue={(option, value) => option?.id === (value?.id ?? value)}
                value={(softAutocompleteProps?.options || []).filter((opt) => (field.value || []).includes(opt.id))}
                onChange={(_, v) => field.onChange(v.map((it) => it?.id ?? it))}
                renderInput={(params) => <TextField {...params} label="Soft Skills" />}
              />
            )}
          />
        </Grid>

        {/* Education */}
        <Grid item xs={12}>
          <Divider sx={{ my: 1 }} />
          <Typography variant="h6">Education</Typography>
          {educationFields.map((f, idx) => (
            <Paper key={f.id} variant="outlined" sx={{ p: 2, my: 1 }}>
              <input type="hidden" {...register(`education.${idx}.id`)} />
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={5}>
                  <TextField label="Institution" fullWidth {...register(`education.${idx}.institution`)} />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField label="Qualification" fullWidth {...register(`education.${idx}.qualification`)} />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button color="error" variant="outlined" onClick={() => handleRemoveEducation(idx)}>
                    Remove
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ))}
          <Button
            variant="contained"
            onClick={() => appendEducation({ id: "", institution: "", qualification: "" })}
          >
            Add education
          </Button>
        </Grid>

        {/* Certificates */}
        <Grid item xs={12}>
          <Divider sx={{ my: 1 }} />
          <Typography variant="h6">Certificates</Typography>
          {certificateFields.map((f, idx) => (
            <Paper key={f.id} variant="outlined" sx={{ p: 2, my: 1 }}>
              <input type="hidden" {...register(`certificates.${idx}.id`)} />
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={5}>
                  <TextField label="Name" fullWidth {...register(`certificates.${idx}.name`)} />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField label="Institution" fullWidth {...register(`certificates.${idx}.institution`)} />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button color="error" variant="outlined" onClick={() => handleRemoveCertificate(idx)}>
                    Remove
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ))}
          <Button
            variant="contained"
            onClick={() => appendCertificate({ id: "", name: "", institution: "" })}
          >
            Add certificate
          </Button>
        </Grid>

        {/* Career */}
        <Grid item xs={12}>
          <Divider sx={{ my: 1 }} />
          <Typography variant="h6">Career</Typography>
          {careerFields.map((f, idx) => (
            <Paper key={f.id} variant="outlined" sx={{ p: 2, my: 1 }}>
              <input type="hidden" {...register(`career.${idx}.id`)} />
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <TextField label="Role" fullWidth {...register(`career.${idx}.role`)} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField label="Company" fullWidth {...register(`career.${idx}.company`)} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField label="Duration" fullWidth {...register(`career.${idx}.duration`)} />
                </Grid>
                <Grid item xs={12} sm={1}>
                  <Button color="error" variant="outlined" onClick={() => handleRemoveCareer(idx)}>
                    Remove
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ))}
          <Button variant="contained" onClick={() => appendCareer({ id: "", role: "", company: "", duration: "" })}>
            Add career entry
          </Button>
        </Grid>

        {/* Testimonials */}
        <Grid item xs={12}>
          <Divider sx={{ my: 1 }} />
          <Typography variant="h6">Testimonials</Typography>
          {testimonialFields.map((f, idx) => (
            <Paper key={f.id} variant="outlined" sx={{ p: 2, my: 1 }}>
              <input type="hidden" {...register(`testimonials.${idx}.id`)} />
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <TextField label="Company" fullWidth {...register(`testimonials.${idx}.company`)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Quote" fullWidth multiline rows={2} {...register(`testimonials.${idx}.quote`)} />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField label="Reference" fullWidth {...register(`testimonials.${idx}.reference`)} />
                </Grid>
                <Grid item xs={12} sm={1}>
                  <Button color="error" variant="outlined" onClick={() => handleRemoveTestimonial(idx)}>
                    Remove
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ))}
          <Button
            variant="contained"
            onClick={() => appendTestimonial({ id: "", company: "", quote: "", reference: "" })}
          >
            Add testimonial
          </Button>
        </Grid>

        {/* Projects */}
        <Grid item xs={12}>
          <Divider sx={{ my: 1 }} />
          <Typography variant="h6">Projects</Typography>
          {projectFields.map((f, idx) => (
            <Paper key={f.id} variant="outlined" sx={{ p: 2, my: 1 }}>
              <input type="hidden" {...register(`projects.${idx}.id`)} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Name" fullWidth {...register(`projects.${idx}.name`)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Description" fullWidth multiline rows={3} {...register(`projects.${idx}.description`)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Repo link" fullWidth {...register(`projects.${idx}.repoLink`)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Demo link" fullWidth {...register(`projects.${idx}.demoLink`)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control}
                    name={`projects.${idx}.technologies`}
                    render={({ field }) => (
                      <Autocomplete
                        multiple
                        options={techAutocompleteProps?.options || []}
                        getOptionLabel={(o) => o?.name ?? o?.title ?? ""}
                        isOptionEqualToValue={(option, value) => option?.id === (value?.id ?? value)}
                        value={(techAutocompleteProps?.options || []).filter((opt) => (field.value || []).includes(opt.id))}
                        onChange={(_, v) => field.onChange(v.map((it) => it?.id ?? it))}
                        renderInput={(params) => <TextField {...params} label="Technologies" />}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control}
                    name={`projects.${idx}.industries`}
                    render={({ field }) => (
                      <Autocomplete
                        multiple
                        freeSolo
                        options={(industryAutocompleteProps?.options || []).map((o) => o?.name || "")}
                        value={field.value || []}
                        onChange={(_, v) => field.onChange(v)}
                        renderInput={(params) => <TextField {...params} label="Industries" />}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name={`projects.${idx}.image`}
                    render={({ field }) => (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files?.[0] ?? null)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button color="error" variant="outlined" onClick={() => handleRemoveProject(idx)}>
                    Remove project
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ))}
          <Button
            variant="contained"
            onClick={() =>
              appendProject({
                id: "",
                name: "",
                description: "",
                repoLink: "",
                demoLink: "",
                technologies: [],
                industries: [],
                image: null,
              })
            }
          >
            Add project
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <SaveButton type="submit" />
      </Box>
    </Box>
    </Edit>
  );
};