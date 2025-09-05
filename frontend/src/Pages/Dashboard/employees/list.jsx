import React from "react";
import { useMany } from "@refinedev/core";
import { useDataGrid, EditButton, ShowButton,List,DeleteButton } from "@refinedev/mui";

import { DataGrid } from "@mui/x-data-grid";

export const EmployeeList = () => {
  const { dataGridProps } = useDataGrid({
    resource: "employee",
    pagination: { current: 1, pageSize: 5 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
    syncWithLocation: true,
    meta: { 
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
            project: true
          }
        }
      }
    }
  });

  // Remove the generic type annotation <GridColDef[]>
  const columns = React.useMemo(() => [
    {
      field: "photoUrl",
      headerName: "Avatar",
      renderCell: ({ row }) => (
        <img src={row.photoUrl} alt="" style={{ width: "50px", height: "50px" }} />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "surname",
      headerName: "Surname",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
    },
    {
      field: "experience",
      headerName: "Experience",
      flex: 1,
    },
    {
      field: "projects",
      headerName: "Projects",
      renderCell: function render({ row }) {
        return row.projects.length;
      },
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: function render({ row }) {
        return (
          <div>
            <ShowButton hideText recordItemId={row.id} />
            <EditButton hideText recordItemId={row.id} />
            <DeleteButton hideText size="small" recordItemId={row.id} />
          </div>
        );
      },
      width: 150,
    },
    {
      field: "delete",
      headerName: "Delete",
      renderCell: function render({ row }) {
        return (
          <div>

            <DeleteButton size="small" recordItemId={row.id} />
          </div>
        );
      },
      width: 150,
    },

  ], []);

  return (
    <div style={{ width: "100%" }}>
    <List sx={{ maxWidth: "none", width: "100%" }}>
    <DataGrid
    {...dataGridProps}
    columns={columns}
    sx={{ width: "100%" }}
    autoHeight
    />
    </List>
    </div>
    );
};