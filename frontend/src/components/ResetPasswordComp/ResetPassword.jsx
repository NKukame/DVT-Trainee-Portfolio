import { useState } from "react";
import { useNavigate } from "react-router";
import "./Login.css";

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router";
// import "./Login.css";
 
function ResetPassword() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState("request"); 
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
 
 
  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
   
      setStep("reset");
    }
  }, [searchParams]);
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
 
    if (e.target.name === 'password') {
      const password = e.target.value;
      console.log('Password:', password);
      console.log('Length >= 8:', password.length >= 8);
      console.log('Has special char:', /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password));
    }
 
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
  };
 
  const validateEmail = () => {
    let newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  
  const validatePassword = () => {
    let newErrors = {};
   
   
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      const hasMinLength = formData.password.length >= 8;
      const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password);
     
      if (!hasMinLength && !hasSpecialChar) {
        newErrors.password = "Password must be at least 8 characters and contain a special character";
      } else if (!hasMinLength) {
        newErrors.password = "Password must be at least 8 characters";
      } else if (!hasSpecialChar) {
        newErrors.password = "Password must contain at least one special character";
      }
    }
 
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
   
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const requestPasswordReset = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;
 
    setLoading(true);
    setMessage("");
    setErrors({});
 
    try {
      const response = await fetch('http://localhost:3000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email
        }),
      });
 
      const data = await response.json();
 
      if (response.ok) {
        setMessage("If that email exists in our system, a reset link has been sent to your email address. Please check your inbox and spam folder.");
        
        setFormData(prev => ({ ...prev, email: "" }));
      } else {
        setErrors({ general: data.error || "Failed to send reset email" });
      }
    } catch (error) {
      console.error('Error requesting password reset:', error);
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };
 
  const resetPassword = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;
 
    const token = searchParams.get('token');
    if (!token) {
      setErrors({ general: "Invalid or missing reset token" });
      return;
    }
 
    setLoading(true);
    setMessage("");
    setErrors({});
 
    try {
      const response = await fetch('http://localhost:3000/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          newPassword: formData.password
        }),
      });
 
      const data = await response.json();
 
      if (response.ok) {
        setMessage("Password has been reset successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setErrors({ general: data.error || "Failed to reset password" });
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };
 

  const getPasswordRequirements = () => {
    const hasMinLength = formData.password.length >= 8;
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password);
    const isValid = hasMinLength && hasSpecialChar;
   
    console.log('Password Requirements Check:', {
      password: formData.password,
      length: formData.password.length,
      hasMinLength,
      hasSpecialChar,
      isValid
    });
   
    return {
      hasMinLength,
      hasSpecialChar,
      isValid
    };
  };
 
  return (
    <>
      <div className="LoginApp">
        <div className="login-container" style={{ minHeight: "400px" }}>
          <div className="form-container sign-in" style={{ width: "100%", left: "0" }}>
           
            {step === "request" && (
              <form onSubmit={requestPasswordReset}>
                <h1>Reset Password</h1>
                <p>Enter your email address to receive a password reset link</p>
               
                {errors.general && <p className="error">{errors.general}</p>}
                {message && <p className="success-message">{message}</p>}
               
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.email && <p className="error">{errors.email}</p>}
               
               
              {Loading ? <div className="form-loader"></div> : 
                <button type="submit" className="reset-btn">Reset password</button>
              }
 
                <Link to="/" style={{ marginTop: "15px" }}>Back to Login</Link>
              </form>
            )}
 
            {step === "reset" && (
              <form onSubmit={resetPassword}>
                <h1>Create New Password</h1>
                <p>Enter your new password below</p>
               
                {errors.general && <p className="error">{errors.general}</p>}
                {message && <p className="success-message">{message}</p>}
               
                <input
                  type="password"
                  name="password"
                  placeholder="New Password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.password && <p className="error">{errors.password}</p>}
               
                {/* Password requirements checklist */}
                {formData.password && (
                  <div style={{ fontSize: "12px", margin: "10px 0", textAlign: "left" }}>
                    <div style={{ color: getPasswordRequirements().hasMinLength ? "green" : "red" }}>
                      {getPasswordRequirements().hasMinLength ? "✓" : "✗"} Must be at least 8 characters
                    </div>
                    <div style={{ color: getPasswordRequirements().hasSpecialChar ? "green" : "red" }}>
                      {getPasswordRequirements().hasSpecialChar ? "✓" : "✗"} Must contain one special character
                    </div>
                  </div>
                )}
               
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
               
                <button
                  type="submit"
                  disabled={loading || !getPasswordRequirements().isValid || !formData.confirmPassword || (formData.confirmPassword !== formData.password)}
                  style={{
                    opacity: (loading || !getPasswordRequirements().isValid || !formData.confirmPassword || (formData.confirmPassword !== formData.password)) ? 0.6 : 1,
                    cursor: (loading || !getPasswordRequirements().isValid || !formData.confirmPassword || (formData.confirmPassword !== formData.password)) ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
               
                <Link to="/" style={{ marginTop: "15px" }}>Back to Login</Link>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
 
export default ResetPassword;