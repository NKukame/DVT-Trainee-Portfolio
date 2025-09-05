import { useShow } from "@refinedev/core";
import {
    Show,
    TextFieldComponent as TextField,
    DateField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const ShowProject = () => {
    const { query } = useShow();
    const { data, isLoading } = query;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    Id
                </Typography>
                <TextField value={record?.id} />
                <Typography variant="body1" fontWeight="bold">
                    Name
                </Typography>
                <TextField value={record?.name} />
                <Typography variant="body1" fontWeight="bold">
                    Description
                </Typography>
                <TextField value={record?.description} />
                <Typography variant="body1" fontWeight="bold">
                    Github
                </Typography>
                <TextField value={record?.github} />
                <Typography variant="body1" fontWeight="bold">
                    Demo
                </Typography>
                <TextField value={record?.demo} />
                <Typography variant="body1" fontWeight="bold">
                    Screenshot
                </Typography>
                <TextField value={record?.screenshot} />
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
