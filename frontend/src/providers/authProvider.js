

export const authProvider = {
    check: async () => {
      // When logging in, we'll obtain an access token from our API and store it in the local storage.
      // Now let's check if the token exists in the local storage.
      // In the later steps, we'll be implementing the login and logout methods.
      const token = localStorage.getItem("token");

      return { authenticated: Boolean(token) };
    },
    login: async ({ email, password }) => { throw new Error("Not implemented"); },
    logout: async () => { throw new Error("Not implemented"); },
    onError: async (error) => { throw new Error("Not implemented"); },
    // optional methods
    register: async (params) => { throw new Error("Not implemented"); },
    forgotPassword: async (params) => { throw new Error("Not implemented"); },
    updatePassword: async (params) => { throw new Error("Not implemented"); },
    getIdentity: async () => { throw new Error("Not implemented"); },
    getPermissions: async () => { throw new Error("Not implemented"); },
};