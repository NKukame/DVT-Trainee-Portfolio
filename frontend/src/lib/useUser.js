import { create } from 'zustand';


export const useUserStore = create((set) => ({
    user: {
        testEmployee: {

        },
        name: "",
        email: "",
        profilePicture: null,
        role: "",
    },
    loading: false,
    error: null,

    // fetch current user from backend
    fetchUser: async () => {
        set({ loading: true, error: null });
        try {
            console.log("Fetching user...");
            const token = JSON.parse(localStorage.getItem("token"));
            console.log("Token:", token);
            const res = await fetch("http://localhost:3000/api/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) throw new Error("Not authenticated");

            const data = await res.json();
            console.log(data);
            set({
                user: {
                    testEmployee: data,
                    name: data.name,
                    email: data.email,
                    profilePicture: data.photoUrl,
                    role: data.user_role
                }, loading: false
            });
        } catch (err) {
            set({ user: null, loading: false, error: err.message });
        }
    },

    // clear user on logout
    logout: () => {
        localStorage.removeItem("token");
        set({ user: null });
    },
}));