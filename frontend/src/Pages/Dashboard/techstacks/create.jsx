import { Create } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";

export const CreateTechStack = () => {
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
                    {...register("category", {
                        required: "This field is required",
                    })}
                    error={!!errors?.category}
                    helperText={errors?.category?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="text"
                    label="Category"
                    name="category"
                />
            </Box>
        </Create>
    );
};
