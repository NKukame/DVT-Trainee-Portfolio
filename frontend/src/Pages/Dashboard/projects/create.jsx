import { Create } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";

export const CreateProject = () => {
    const {
        saveButtonProps,
        refineCore: { formLoading },
        register,
        control,
        formState: { errors },
    } = useForm();

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
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
                
            </Box>
        </Create>
    );
};
