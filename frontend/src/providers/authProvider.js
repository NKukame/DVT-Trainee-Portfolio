

export const authProvider = {
    check: async () => {
      // When logging in, we'll obtain an access token from our API and store it in the local storage.
      // Now let's check if the token exists in the local storage.
      // In the later steps, we'll be implementing the login and logout methods.
      const token = localStorage.getItem("token");

      return { authenticated: Boolean(token) };
    },
    login: async ({ email, password }) => { throw new Error("Not implemented"); },
    logout: async () => {
      localStorage.removeItem("token");
      return { success: true, redirectTo: "/" };
  },
    onError: async (error) => { throw new Error("Not implemented"); },
    // optional methods
    register: async (params) => { throw new Error("Not implemented"); },
    forgotPassword: async (params) => { throw new Error("Not implemented"); },
    updatePassword: async (params) => { throw new Error("Not implemented"); },
    getIdentity: async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      const userId = JSON.parse(localStorage.getItem("userId"));
      
      if (!token || !userId) {
        return null;
      }

      try {
        const response = await fetch(`http://localhost:3000/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
    
        if (response.status < 200 || response.status > 299) {
          return null;
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching user identity:', error);
        return null;
      }
    },
    getPermissions: async () => { throw new Error("Not implemented"); },
};