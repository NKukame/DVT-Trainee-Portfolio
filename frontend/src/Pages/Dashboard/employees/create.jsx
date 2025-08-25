import React from "react";
import { useForm as useRhfForm, Controller, useFieldArray } from "react-hook-form";
import { useForm } from "@refinedev/react-hook-form";
import { useAutocomplete, SaveButton, Create } from "@refinedev/mui";
import { useCreate } from "@refinedev/core";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

/**
 * Helper: file -> base64 string
 */
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });

export const CreateEmployee = () => {
  // useRefine-react-hook-form wrapper
  const {
    register,
    control,
    handleSubmit,
    refineCore: { onFinish, query },
    reset,
    setValue,
    formState: { errors },
    saveButtonProps,
  } = useForm({
    // optional: you may supply resource: "employee" here,
    // but we'll call useCreate() manually so it's not required
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
      education: [{ institution: "", qualification: "" }],
      certificates: [{ name: "", institution: "" }],
      career: [{ role: "", company: "", duration: "" }],
      testimonials: [{ company: "", quote: "", reference: "" }],
      projects: [
        {
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

  // for create call
  const { mutate: create } = useCreate();

  // Autocomplete props for tech stack & soft skills
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

  // field arrays
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  const {
    fields: certificateFields,
    append: appendCertificate,
    remove: removeCertificate,
  } = useFieldArray({
    control,
    name: "certificates",
  });

  const {
    fields: careerFields,
    append: appendCareer,
    remove: removeCareer,
  } = useFieldArray({
    control,
    name: "career",
  });

  const {
    fields: testimonialFields,
    append: appendTestimonial,
    remove: removeTestimonial,
  } = useFieldArray({
    control,
    name: "testimonials",
  });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control,
    name: "projects",
  });

  const onSubmit = async (values) => {
    try {
      // convert main photo
      const photoBase64 = values.photoUrl
        ? await fileToBase64(values.photoUrl)
        : null;

      // convert project images (async)
      const projectsPayload = await Promise.all(
        (values.projects || []).map(async (p) => {
          const screenshot = p.image ? await fileToBase64(p.image) : null;
          

          return {
            role: values.role,
            project: {
              create: {
                name: p.name,
                description: p.description,
                github: p.repoLink || null,
                demo: p.demoLink || null,
                screenshot,
                // industries: create if not exist (connectOrCreate)
                industries: {
                  create:
                    (p.industries || []).map((industryName) => ({
                      industry: {
                        connectOrCreate: {
                          where: { name: industryName },
                          create: { name: industryName },
                        },
                      },
                    })) || [],
                },
                techStack: {
                  create:
                    (p.technologies || []).map((techId) => ({
                      techStackId:
                        typeof techId === "object" ? techId.id ?? techId : techId,
                    })) || [],
                },
              },
            },
          };
        })
      );
      // Format birthday as ISO-8601 date
      const birthday = values.birthday ? new Date(values.birthday).toISOString() : null;
      // build main payload matching your Prisma nested create shape
      const finalData = {
        title: values.title,
        name: values.name,
        surname: values.surname,
        birthday: birthday,
        photoUrl: photoBase64,
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
        techStack: {
          create:
            (values.techStack || []).map((t) => ({
              techStackId: typeof t === "object" ? t.id ?? t : t,
            })) || [],
        },
        softSkills: {
          create:
            (values.softSkills || []).map((s) => ({
              softSkillId: typeof s === "object" ? s.id ?? s : s,
            })) || [],
        },
        availability: {
          create: {
            available: !!values.available,
            client: values.client || "",
          },
        },
        education: {
          create:
            (values.education || []).map((e) => ({
              institution: e.institution,
              qualification: e.qualification,
            })) || [],
        },
        certificates: {
          create:
            (values.certificates || []).map((c) => ({
              name: c.name,
              institution: c.institution,
            })) || [],
        },
        career: {
          create:
            (values.career || []).map((c) => ({
              role: c.role,
              company: c.company,
              duration: c.duration,
            })) || [],
        },
        testimonials: {
          create:
            (values.testimonials || []).map((t) => ({
              company: t.company,
              quote: t.quote,
              reference: t.reference,
            })) || [],
        },
        projects: {
          create: projectsPayload,
        },
      };

      // Use refine's create
      await onFinish(finalData);
    } catch (error) {
      console.error("submit error", error);
    }
  };

  return (
    <Create>
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h5">Create Employee</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>
          <TextField
            select
            label="Title"
            fullWidth
            defaultValue="MR"
            {...register("title")}
          >
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
          <TextField
            type="date"
            label="Birthday"
            InputLabelProps={{ shrink: true }}
            fullWidth
            {...register("birthday")}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Controller
            control={control}
            name="photoUrl"
            render={({ field }) => (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => field.onChange(e.target.files?.[0] ?? null)}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            select
            label="Role"
            fullWidth
            defaultValue="DEVELOPER"
            {...register("role")}
          >
            <MenuItem value="DEVELOPER">Developer</MenuItem>
            <MenuItem value="DESIGNER">Designer</MenuItem>
            <MenuItem value="PROJECT_MANAGER">Project Manager</MenuItem>
            <MenuItem value="TEAM_LEAD">Team Lead</MenuItem>
            <MenuItem value="SENIOR_DEVELOPER">Senior Developer</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            select
            label="Department"
            fullWidth
            defaultValue="ENGINEERING"
            {...register("department")}
          >
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
          <TextField
            label="LinkedIn"
            fullWidth
            {...register("linkedIn")}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Experience"
            multiline
            rows={3}
            fullWidth
            {...register("experience")}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField label="Portfolio" fullWidth {...register("portfolio")} />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Bio"
            multiline
            rows={4}
            fullWidth
            {...register("bio")}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField select fullWidth label="Available" {...register("available")}>
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField label="Client" fullWidth {...register("client")} />
        </Grid>

        {/* Tech Stack Autocomplete (multiple) */}
        <Grid item xs={12}>
          <Controller
            control={control}
            name="techStack"
            defaultValue={[]}
            render={({ field }) => (
              <Autocomplete
                multiple
                {...techAutocompleteProps}
                options={techAutocompleteProps?.options || []}
                getOptionLabel={(o) => o?.name ?? o?.title ?? ""}
                isOptionEqualToValue={(option, value) =>
                  option?.id === (value?.id ?? value)
                }
                value={
                  (techAutocompleteProps?.options || []).filter((opt) =>
                    (field.value || []).includes(opt.id)
                  ) || []
                }
                onChange={(_, v) =>
                  field.onChange(v.map((item) => item?.id ?? item))
                }
                renderInput={(params) => (
                  <TextField {...params} label="Tech Stack" />
                )}
              />
            )}
          />
        </Grid>

        {/* Soft Skills Autocomplete (multiple) */}
        <Grid item xs={12}>
          <Controller
            control={control}
            name="softSkills"
            defaultValue={[]}
            render={({ field }) => (
              <Autocomplete
                multiple
                {...softAutocompleteProps}
                options={softAutocompleteProps?.options || []}
                getOptionLabel={(o) => o?.name ?? o?.title ?? ""}
                isOptionEqualToValue={(option, value) =>
                  option?.id === (value?.id ?? value)
                }
                value={
                  (softAutocompleteProps?.options || []).filter((opt) =>
                    (field.value || []).includes(opt.id)
                  ) || []
                }
                onChange={(_, v) =>
                  field.onChange(v.map((item) => item?.id ?? item))
                }
                renderInput={(params) => (
                  <TextField {...params} label="Soft Skills" />
                )}
              />
            )}
          />
        </Grid>
      </Grid>

      {/* Repeating field groups: Education */}
      <Box>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Education
        </Typography>
        {educationFields.map((f, idx) => (
          <Grid container spacing={1} key={f.id} alignItems="center" sx={{ mb: 1 }}>
            <Grid item xs={5}>
              <TextField
                label="Institution"
                fullWidth
                {...register(`education.${idx}.institution`)}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="Qualification"
                fullWidth
                {...register(`education.${idx}.qualification`)}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={() => removeEducation(idx)}>
                <RemoveIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Button startIcon={<AddIcon />} onClick={() => appendEducation({ institution: "", qualification: "" })}>
          Add Education
        </Button>
      </Box>

      {/* Certificates */}
      <Box>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Certificates
        </Typography>
        {certificateFields.map((f, idx) => (
          <Grid container spacing={1} key={f.id} alignItems="center" sx={{ mb: 1 }}>
            <Grid item xs={5}>
              <TextField label="Certificate" fullWidth {...register(`certificates.${idx}.name`)} />
            </Grid>
            <Grid item xs={5}>
              <TextField label="Institution" fullWidth {...register(`certificates.${idx}.institution`)} />
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={() => removeCertificate(idx)}>
                <RemoveIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Button startIcon={<AddIcon />} onClick={() => appendCertificate({ name: "", institution: "" })}>
          Add Certificate
        </Button>
      </Box>

      {/* Career */}
      <Box>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Career
        </Typography>
        {careerFields.map((f, idx) => (
          <Grid container spacing={1} key={f.id} alignItems="center" sx={{ mb: 1 }}>
            <Grid item xs={4}>
              <TextField label="Role" fullWidth {...register(`career.${idx}.role`)} />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Company" fullWidth {...register(`career.${idx}.company`)} />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Duration" fullWidth {...register(`career.${idx}.duration`)} />
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={() => removeCareer(idx)}>
                <RemoveIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Button startIcon={<AddIcon />} onClick={() => appendCareer({ role: "", company: "", duration: "" })}>
          Add Career
        </Button>
      </Box>

      {/* Testimonials */}
      <Box>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Testimonials
        </Typography>
        {testimonialFields.map((f, idx) => (
          <Grid container spacing={1} key={f.id} alignItems="center" sx={{ mb: 1 }}>
            <Grid item xs={3}>
              <TextField label="Company" fullWidth {...register(`testimonials.${idx}.company`)} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Quote" fullWidth {...register(`testimonials.${idx}.quote`)} />
            </Grid>
            <Grid item xs={2}>
              <TextField label="Reference" fullWidth {...register(`testimonials.${idx}.reference`)} />
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={() => removeTestimonial(idx)}>
                <RemoveIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Button startIcon={<AddIcon />} onClick={() => appendTestimonial({ company: "", quote: "", reference: "" })}>
          Add Testimonial
        </Button>
      </Box>

      {/* Projects */}
      <Box>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Projects
        </Typography>

        {projectFields.map((f, idx) => (
          <Box key={f.id} sx={{ border: "1px solid #eee", p: 2, mb: 2 }}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={12} sm={6}>
                <TextField label="Project Name" fullWidth {...register(`projects.${idx}.name`)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Repository Link" fullWidth {...register(`projects.${idx}.repoLink`)} />
              </Grid>

              <Grid item xs={12}>
                <TextField label="Description" multiline rows={3} fullWidth {...register(`projects.${idx}.description`)} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField label="Demo Link" fullWidth {...register(`projects.${idx}.demoLink`)} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name={`projects.${idx}.image`}
                  control={control}
                  render={({ field }) => (
                    <input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0] ?? null)} />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name={`projects.${idx}.technologies`}
                  defaultValue={[]}
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      options={techAutocompleteProps?.options || []}
                      getOptionLabel={(o) => o?.name ?? o?.title ?? ""}
                      isOptionEqualToValue={(option, value) =>
                        option?.id === (value?.id ?? value)
                      }
                      value={(techAutocompleteProps?.options || []).filter((opt) =>
                        (field.value || []).includes(opt.id)
                      )}
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
                  defaultValue={[]}
                  render={({ field }) => (
                    <TextField
                      select
                      label="Industries"
                      fullWidth
                      SelectProps={{ multiple: true, value: field.value || [] }}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      <MenuItem value="RETAIL">Retail</MenuItem>
                      <MenuItem value="BANKING">Banking</MenuItem>
                      <MenuItem value="INSURANCE">Insurance</MenuItem>
                      <MenuItem value="EDUCATION">Education</MenuItem>
                      <MenuItem value="MINING">Mining</MenuItem>
                      <MenuItem value="MECS">MECS</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Button color="error" onClick={() => removeProject(idx)} startIcon={<RemoveIcon />}>
                  Remove Project
                </Button>
              </Grid>
            </Grid>
          </Box>
        ))}

        <Button startIcon={<AddIcon />} onClick={() => appendProject({
          name: "",
          description: "",
          repoLink: "",
          demoLink: "",
          technologies: [],
          industries: [],
          image: null,
        })}>
          Add Project
        </Button>
      </Box>

      <Box sx={{ mt: 2 }}>
        {/* SaveButton from refine */}
        <SaveButton  type="submit" />
      </Box>
    </Box>
    </Create>
  );
};