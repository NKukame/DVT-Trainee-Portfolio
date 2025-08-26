import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
    EmailField,
    DateField,
} from "@refinedev/mui";
import { DataGrid } from "@mui/x-data-grid";
import { useMany } from "@refinedev/core";

export const ListUser = () => {
    const { dataGridProps } = useDataGrid();

    const { data: employeeData, isLoading: employeeIsLoading } = useMany({
        resource: "employee",
        ids: dataGridProps?.rows?.map((item) => item?.employeeId) ?? [],
        queryOptions: {
            enabled: !!dataGridProps?.rows,
        },
    });

    const columns = React.useMemo(
        () => [
            {
                field: "id",
                headerName: "Id",
                minWidth: 50,
            },
            {
                field: "email",
                flex: 1,
                headerName: "Email",
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <EmailField value={value} />;
                },
            },
            {
                field: "password",
                flex: 1,
                headerName: "Password",
                minWidth: 200,
            },
            {
                field: "role",
                flex: 1,
                headerName: "Role",
                minWidth: 200,
            },
            {
                field: "employeeId",
                flex: 1,
                headerName: "Employee",
                minWidth: 300,
                renderCell: function render({ value }) {
                    return employeeIsLoading ? (
                        <>Loading...</>
                    ) : (
                        employeeData?.data?.find((item) => item.id === value)
                            ?.name
                    );
                },
            },
            {
                field: "createdAt",
                flex: 1,
                headerName: "Created At",
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "updatedAt",
                flex: 1,
                headerName: "Updated At",
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "actions",
                headerName: "Actions",
                sortable: false,
                renderCell: function render({ row }) {
                    return (
                        <>
                            <EditButton hideText recordItemId={row.id} />
                            <ShowButton hideText recordItemId={row.id} />
                        </>
                    );
                },
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },
            {
                field: "delete",
                headerName: "Delete",
                sortable: false,
                renderCell: function render({ row }) {
                    return <DeleteButton size="small" recordItemId={row.id} />;
                },

            },
        ],
        [employeeData?.data],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
