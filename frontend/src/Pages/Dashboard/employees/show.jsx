import { useShow } from "@refinedev/core";
import { TextFieldComponent as TextField, MarkdownField,Show } from "@refinedev/mui";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

export const EmployeeShow = () => {
  const {
    query: { data, isLoading },
  } = useShow({
    meta: {
      include: {
        education: true,
        certificates: true,
        career: true,
        testimonials: true,
        availability: true,
        techStack: { include: { techStack: true } },
        softSkills: { include: { softSkill: true } },
        projects: { include: { project: true } },
      },
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const record = data?.data;
  if (!record) return <div>No data</div>;

  const fmtDate = (d) => (d ? new Date(d).toLocaleDateString() : "-");
  const techNames = (record.techStack || [])
    .map((t) => t?.techStack?.name)
    .filter(Boolean);
  const softNames = (record.softSkills || [])
    .map((s) => s?.softSkill?.name)
    .filter(Boolean);
  const projectNames = (record.projects || [])
    .map((m) => m?.project?.name)
    .filter(Boolean);

  return (
    <Show>  
    <Stack gap={2}>
      <Stack direction="row" spacing={2} alignItems="center">
        {record.photoUrl ? (
          <Avatar src={record.photoUrl} sx={{ width: 80, height: 80 }} />
        ) : (
          <Avatar sx={{ width: 80, height: 80 }}>
            {record.name?.[0]}
            {record.surname?.[0]}
          </Avatar>
        )}
        <Stack>
          <Typography variant="h5" fontWeight="bold">
            {record.title} {record.name} {record.surname}
          </Typography>
          <Typography variant="body2">
            {record.role} • {record.department}
          </Typography>
          <Typography variant="body2">
            {record.company}
            {record.location ? ` • ${record.location}` : ""}
          </Typography>
        </Stack>
      </Stack>

      <Divider />

      <Typography variant="body1" fontWeight="bold">
        Bio
      </Typography>
      <MarkdownField value={record.bio || ""} />

      <Divider />

      <Typography variant="body1" fontWeight="bold">
        Contact
      </Typography>
      <TextField value={record.email} />
      {record.phone && <TextField value={record.phone} />}
      {record.github && <TextField value={record.github} />}
      {record.linkedIn && <TextField value={record.linkedIn} />}
      <Typography variant="body1" fontWeight="bold">
        Birthday
      </Typography>
      <TextField value={fmtDate(record.birthday)} />

      <Divider />

      <Typography variant="body1" fontWeight="bold">
        Availability
      </Typography>
      <TextField
        value={record.availability ? (record.availability.available ? "Available" : "Not Available") : "-"}
      />
      {record.availability?.client && (
        <TextField value={`Client: ${record.availability.client}`} />
      )}

      <Divider />

      <Typography variant="body1" fontWeight="bold">
        Education
      </Typography>
      <Stack gap={1}>
        {(record.education || []).length ? (
          record.education.map((e) => (
            <TextField key={e.id} value={`${e.institution} — ${e.qualification}`} />
          ))
        ) : (
          <TextField value="-" />
        )}
      </Stack>

      <Typography variant="body1" fontWeight="bold">
        Certificates
      </Typography>
      <Stack gap={1}>
        {(record.certificates || []).length ? (
          record.certificates.map((c) => (
            <TextField key={c.id} value={`${c.name} — ${c.institution}`} />
          ))
        ) : (
          <TextField value="-" />
        )}
      </Stack>

      <Typography variant="body1" fontWeight="bold">
        Career
      </Typography>
      <Stack gap={1}>
        {(record.career || []).length ? (
          record.career.map((c) => (
            <TextField
              key={c.id}
              value={`${c.role} @ ${c.company}${c.duration ? ` (${c.duration})` : ""}`}
            />
          ))
        ) : (
          <TextField value="-" />
        )}
      </Stack>

      <Typography variant="body1" fontWeight="bold">
        Tech Stack
      </Typography>
      {techNames.length ? (
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {techNames.map((n) => (
            <Chip key={n} label={n} />
          ))}
        </Stack>
      ) : (
        <TextField value="-" />
      )}

      <Typography variant="body1" fontWeight="bold">
        Soft Skills
      </Typography>
      {softNames.length ? (
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {softNames.map((n) => (
            <Chip key={n} label={n} />
          ))}
        </Stack>
      ) : (
        <TextField value="-" />
      )}

      <Typography variant="body1" fontWeight="bold">
        Testimonials
      </Typography>
      <Stack gap={1}>
        {(record.testimonials || []).length ? (
          record.testimonials.map((t) => (
            <Stack key={t.id}>
              <Typography variant="subtitle2">
                {t.company} — {t.reference}
              </Typography>
              <MarkdownField value={t.quote} />
            </Stack>
          ))
        ) : (
          <TextField value="-" />
        )}
      </Stack>

      <Typography variant="body1" fontWeight="bold">
        Projects
      </Typography>
      {projectNames.length ? (
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {projectNames.map((n) => (
            <Chip key={n} label={n} />
          ))}
        </Stack>
      ) : (
        <TextField value="-" />
      )}

      <Divider />
      <Typography variant="caption">
        Created: {fmtDate(record.createdAt)} • Updated: {fmtDate(record.updatedAt)}
      </Typography>
    </Stack>
    </Show>
  );
};