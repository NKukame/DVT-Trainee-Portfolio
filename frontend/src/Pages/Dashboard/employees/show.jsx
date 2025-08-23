import { useOne } from "@refinedev/core";

export const EmployeeShow = () => {
    const { data, isLoading } = useOne({ resource: "employee", id: "b193f6cc-3650-4004-ae7a-3a07a0a705b4" });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <div>Employee name: {data?.data.name}</div>;
};