import { Edit } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";

export const EditProject = () => {
    const {
        saveButtonProps,
        refineCore: { query },
        register,
        control,
        formState: { errors },
    } = useForm();

    const projectData = query?.data?.data;

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    {...register("id", {
                        required: "This field is required",
                    })}
                    error={!!errors?.id}
                    helperText={errors?.id?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="text"
                    label="Id"
                    name="id"
                    disabled
                />
                <TextField
                    {...register("name", {
                        required: "This field is required",
                    })}
                    error={!!errors?.name}
                    helperText={errors?.name?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="text"
                    label="Name"
                    name="name"
                />
                <TextField
                    {...register("description", {
                        required: "This field is required",
                    })}
                    error={!!errors?.description}
                    helperText={errors?.description?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="text"
                    label="Description"
                    name="description"
                />
                <TextField
                    {...register("github", {
                        required: "This field is required",
                    })}
                    error={!!errors?.github}
                    helperText={errors?.github?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="text"
                    label="Github"
                    name="github"
                />
                <TextField
                    {...register("demo", {
                        required: "This field is required",
                    })}
                    error={!!errors?.demo}
                    helperText={errors?.demo?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="text"
                    label="Demo"
                    name="demo"
                />
                <TextField
                    {...register("screenshot", {
                        required: "This field is required",
                    })}
                    error={!!errors?.screenshot}
                    helperText={errors?.screenshot?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="text"
                    label="Screenshot"
                    name="screenshot"
                />
                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
                <TextField
                    {...register("createdAt", {
                        required: "This field is required",
                    })}
                    error={!!errors?.createdAt}
                    helperText={errors?.createdAt?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    label="Created At"
                    name="createdAt"
                />

                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
                <TextField
                    {...register("updatedAt", {
                        required: "This field is required",
                    })}
                    error={!!errors?.updatedAt}
                    helperText={errors?.updatedAt?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    label="Updated At"
                    name="updatedAt"
                />
            </Box>
        </Edit>
    );
};
