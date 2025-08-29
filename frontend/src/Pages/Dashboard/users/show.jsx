import { useShow, useOne } from "@refinedev/core";
import {
    Show,
    TextFieldComponent as TextField,
    EmailField,
    DateField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const ShowUser = () => {
    const { query } = useShow();
    const { data, isLoading } = query;

    const record = data?.data;

    const { data: employeeData, isLoading: employeeIsLoading } = useOne({
        resource: "employee",
        id: record?.employeeId || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    Id
                </Typography>
                <TextField value={record?.id} />
                <Typography variant="body1" fontWeight="bold">
                    Email
                </Typography>
                <EmailField value={record?.email} />
                <Typography variant="body1" fontWeight="bold">
                    Password
                </Typography>
                <TextField value={record?.password} />
                <Typography variant="body1" fontWeight="bold">
                    Role
                </Typography>
                <TextField value={record?.role} />
                <Typography variant="body1" fontWeight="bold">
                    Employee
                </Typography>

                {employeeIsLoading ? (
                    <>Loading...</>
                ) : (
                    <>{employeeData?.data?.name}</>
                )}
                <Typography variant="body1" fontWeight="bold">
                    Created At
                </Typography>
                <DateField value={record?.createdAt} />
                <Typography variant="body1" fontWeight="bold">
                    Updated At
                </Typography>
                <DateField value={record?.updatedAt} />
            </Stack>
        </Show>
    );
};
