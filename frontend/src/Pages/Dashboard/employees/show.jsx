import { useShow } from "@refinedev/core";

export const EmployeeShow = () => {
    const {
        query: { data, isLoading },
      } = useShow();
      console.log(data);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <div>Employee name: {data?.data.name}</div>;
};