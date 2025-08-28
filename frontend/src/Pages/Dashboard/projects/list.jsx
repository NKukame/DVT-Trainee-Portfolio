import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
    DateField,
} from "@refinedev/mui";
import { DataGrid } from "@mui/x-data-grid";

export const ListProject = () => {
    const { dataGridProps } = useDataGrid();

    const columns = React.useMemo(() => [
            {
                field: "id",
                headerName: "Id",
                minWidth: 50,
            },
            {
                field: "name",
                flex: 1,
                headerName: "Name",
                minWidth: 200,
            },
            {
                field: "description",
                flex: 1,
                headerName: "Description",
                minWidth: 200,
            },
            {
                field: "github",
                flex: 1,
                headerName: "Github",
                minWidth: 200,
            },
            {
                field: "demo",
                flex: 1,
                headerName: "Demo",
                minWidth: 200,
            },
            {
                field: "screenshot",
                flex: 1,
                headerName: "Screenshot",
                minWidth: 200,
            },
            {
                field: "createdAt",
                flex: 1,
                headerName: "Created At",
                minWidth: 250,
                renderCell: ({ value }) => <DateField value={value} />,
            },
            {
                field: "updatedAt",
                flex: 1,
                headerName: "Updated At",
                minWidth: 250,
                renderCell: ({ value }) => <DateField value={value} />,
            },
            {
                field: "actions",
                headerName: "Actions",
                sortable: false,
                renderCell: ({ row }) => (
                        <>
                            <EditButton hideText recordItemId={row.id} />
                            <ShowButton hideText recordItemId={row.id} />
                        </>
                    ),
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },
            {
                field: "delete",
                headerName: "Delete",
                sortable: false,
                renderCell: ({ row }) => (
                        <>
                            <DeleteButton size="small" recordItemId={row.id} />
                        </>
                    ),
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },
        ],
        [],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
