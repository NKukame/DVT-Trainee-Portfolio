import React from "react";
import { useList, useNavigation } from "@refinedev/core";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  LinearProgress,
  Stack,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

function KpiCard({ title, value, subtitle, onClick, loading }) {
  return (
    <Card
      onClick={onClick}
      sx={{ cursor: onClick ? "pointer" : "default", height: "100%" }}
      variant="outlined"
    >
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4" sx={{ mt: 1 }}>
          {loading ? "…" : value}
        </Typography>
        {subtitle ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {subtitle}
          </Typography>
        ) : null}
      </CardContent>
    </Card>
  );
}

export const DashboardSummary = () => {
  const { list } = useNavigation();

  // Totals via dataProvider.getList (uses /count under the hood)
  const { data: employeeList, isLoading: eLoading } = useList({
    resource: "employee",
    pagination: { mode: "server", current: 1, pageSize: 1 },
  });
  const { data: userList, isLoading: uLoading } = useList({
    resource: "user",
    pagination: { mode: "server", current: 1, pageSize: 1 },
  });
  const { data: projectList, isLoading: pLoading } = useList({
    resource: "project",
    pagination: { mode: "server", current: 1, pageSize: 1 },
  });
  const { data: techList, isLoading: tLoading } = useList({
    resource: "techStack",
    pagination: { mode: "server", current: 1, pageSize: 1 },
  });

  // Availability rate = available / total employees
  const { data: availableList, isLoading: aLoading } = useList({
    resource: "availability",
    pagination: { mode: "server", current: 1, pageSize: 1 },
    filters: [{ field: "available", operator: "eq", value: true }],
  });

  const totalEmployees = employeeList?.total ?? 0;
  const totalUsers = userList?.total ?? 0;
  const totalProjects = projectList?.total ?? 0;
  const totalTech = techList?.total ?? 0;
  const availableEmployees = availableList?.total ?? 0;
  const availabilityPct = totalEmployees
    ? Math.round((availableEmployees / totalEmployees) * 100)
    : 0;

  // Recent projects
  const { data: recentProjects, isLoading: rpLoading } = useList({
    resource: "project",
    pagination: { mode: "server", current: 1, pageSize: 5 },
    sorters: [{ field: "createdAt", order: "desc" }],
  });
  const projects = recentProjects?.data ?? [];

  return (
    <Box p={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h5">Dashboard summary</Typography>
        <Button size="small" onClick={() => list("employee")}>Go to resources</Button>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <KpiCard
            title="Employees"
            value={totalEmployees}
            loading={eLoading}
            onClick={() => list("employee")}
            subtitle="Total employees"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <KpiCard
            title="Users"
            value={totalUsers}
            loading={uLoading}
            onClick={() => list("user")}
            subtitle="Total users"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <KpiCard
            title="Projects"
            value={totalProjects}
            loading={pLoading}
            onClick={() => list("project")}
            subtitle="Active projects"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <KpiCard
            title="Tech stacks"
            value={totalTech}
            loading={tLoading}
            onClick={() => list("techStack")}
            subtitle="Registered technologies"
          />
        </Grid>

        <Grid item xs={12} md={5}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Availability rate
              </Typography>
              <Stack spacing={1}>
                <LinearProgress
                  variant="determinate"
                  value={availabilityPct}
                  sx={{ height: 10, borderRadius: 5 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {aLoading || eLoading
                    ? "Calculating…"
                    : `${availabilityPct}% available (${availableEmployees}/${totalEmployees})`}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="subtitle1">Recent projects</Typography>
                <Button size="small" onClick={() => list("project")}>See all</Button>
              </Stack>
              {rpLoading ? (
                <Typography variant="body2" color="text.secondary">Loading…</Typography>
              ) : projects.length === 0 ? (
                <Typography variant="body2" color="text.secondary">No projects yet.</Typography>
              ) : (
                <List dense>
                  {projects.map((p) => (
                    <ListItem key={p.id} disableGutters>
                      <ListItemText
                        primary={p.name}
                        secondary={
                          p.createdAt ? new Date(p.createdAt).toLocaleDateString() : undefined
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardSummary;
