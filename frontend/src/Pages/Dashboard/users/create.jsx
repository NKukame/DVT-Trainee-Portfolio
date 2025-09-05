import { Create, useAutocomplete } from "@refinedev/mui";
import { Box, TextField, Autocomplete } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export const CreateUser = () => {
    const {
        saveButtonProps,
        refineCore: { formLoading },
        register,
        control,
        formState: { errors },
    } = useForm();

    const { autocompleteProps: employeeAutocompleteProps } = useAutocomplete({
        resource: "employee",
    });

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    {...register("email", {
                        required: "This field is required",
                    })}
                    error={!!errors?.email}
                    helperText={errors?.email?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="email"
                    label="Email"
                    name="email"
                />
                <TextField
                    {...register("password", {
                        required: "This field is required",
                    })}
                    error={!!errors?.password}
                    helperText={errors?.password?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="text"
                    label="Password"
                    name="password"
                />
                <TextField
                    {...register("role", {
                        required: "This field is required",
                    })}
                    error={!!errors?.role}
                    helperText={errors?.role?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="text"
                    label="Role"
                    name="role"
                />
                <Controller
                    control={control}
                    name="employeeId"
                    rules={{ required: "This field is required" }}
                    defaultValue={null}
                    render={({ field }) => (
                        <Autocomplete
                            {...employeeAutocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value?.id ?? value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    employeeAutocompleteProps?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            (item?.id ?? item)?.toString(),
                                    )?.name ?? ""
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                option?.id?.toString() ===
                                    (value?.id ?? value)?.toString()
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Employee"
                                    margin="normal"
                                    variant="outlined"
                                    error={!!errors?.employeeId}
                                    helperText={errors?.employeeId?.message}
                                    required
                                />
                            )}
                        />
                    )}
                />
            </Box>
        </Create>
    );
};
