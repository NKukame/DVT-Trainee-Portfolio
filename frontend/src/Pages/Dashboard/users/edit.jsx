import { Edit, useAutocomplete } from "@refinedev/mui";
import { Box, TextField, Autocomplete } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export const EditUser = () => {
    const {
        saveButtonProps,
        refineCore: { query },
        register,
        control,
        formState: { errors },
    } = useForm();

    const userData = query?.data?.data;

    const { autocompleteProps: employeeAutocompleteProps } = useAutocomplete({
        resource: "employee",
        defaultValue: userData?.employeeId,
    });

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
