const API_URL = 'http://localhost:3000';

export const authProvider = {
    check: async () => {
      const token = localStorage.getItem("token");
      return { authenticated: Boolean(token) };
    },
    
    login: async ({ email, password }) => {
      try {
        const response = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          localStorage.setItem("token", JSON.stringify(data.token));
          localStorage.setItem("userId", JSON.stringify(data.user.id));
          localStorage.setItem("userRole", JSON.stringify(data.user.role));
          return { success: true, redirectTo: "/home" };
        }
        
        return { success: false, error: { message: data.message || 'Login failed' } };
      } catch (error) {
        return { success: false, error: { message: 'Network error' } };
      }
    },
    
    logout: async () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
      return { success: true, redirectTo: "/" };
    },
    
    onError: async (error) => {
      if (error?.status === 401) {
        return { logout: true, redirectTo: "/" };
      }
      return {};
    },
    
    register: async ({ email, password, role = 'USER' }) => {
      try {
        const response = await fetch(`${API_URL}/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, role })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          return { success: true, redirectTo: "/" };
        }
        
        return { success: false, error: { message: data.message || 'Registration failed' } };
      } catch (error) {
        return { success: false, error: { message: 'Network error' } };
      }
    },
    
    forgotPassword: async ({ email }) => {
      try {
        const response = await fetch(`${API_URL}/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          return { success: true, message: 'Password reset email sent' };
        }
        
        return { success: false, error: { message: data.message || 'Failed to send reset email' } };
      } catch (error) {
        return { success: false, error: { message: 'Network error' } };
      }
    },
    
    updatePassword: async ({ password, token }) => {
      try {
        const response = await fetch(`${API_URL}/reset-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password, token })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          return { success: true, redirectTo: "/" };
        }
        
        return { success: false, error: { message: data.message || 'Password update failed' } };
      } catch (error) {
        return { success: false, error: { message: 'Network error' } };
      }
    },

    getIdentity: async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      const userId = JSON.parse(localStorage.getItem("userId"));
      
      if (!token || !userId) {
        return null;
      }

      try {
        const response = await fetch(`${API_URL}/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const userData = await response.json();
          return userData;
        }
        return null;
      } catch (error) {
        console.error('Error fetching user identity:', error);
        return null;
      }
    },
    
    getPermissions: async () => {
      const userRole = JSON.parse(localStorage.getItem("userRole"));
      return userRole ? [userRole] : [];
    },
};

// Helper function to get auth headers
export const getAuthHeaders = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return token ? { Authorization: `Bearer ${token}` } : {};
};