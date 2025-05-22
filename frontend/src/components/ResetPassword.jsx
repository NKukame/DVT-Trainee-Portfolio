import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Header from "./components/Header";

function ResetPassword() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState("request"); // "request", "verify", "reset"
  const [resetCode, setResetCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleCodeChange = (e) => {
    setResetCode(e.target.value);
    if (errors.code) {
      setErrors(prev => ({ ...prev, code: "" }));
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
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const requestPasswordReset = (e) => {
    e.preventDefault();
    if (validateEmail()) {
      // Check if the email exists in our "database"
      const storedUser = JSON.parse(localStorage.getItem("user"));
      
      if (!storedUser || storedUser.email !== formData.email) {
        setErrors({ email: "No account found with this email address" });
        return;
      }
      
      // Generate a random 6-digit code (in a real app, this would be sent via email)
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedCode(code);
      
      // In a real application, you would send this code to the user's email
      // For demo purposes, we'll just show it
      setMessage(`For demo purposes: Your reset code is ${code}`);
      setStep("verify");
    }
  };

  const verifyCode = (e) => {
    e.preventDefault();
    if (!resetCode.trim()) {
      setErrors({ code: "Please enter the verification code" });
      return;
    }
    
    if (resetCode === generatedCode) {
      setStep("reset");
      setMessage("");
    } else {
      setErrors({ code: "Invalid verification code" });
    }
  };

  const resetPassword = (e) => {
    e.preventDefault();
    if (validatePassword()) {
      // Update the user's password in localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        storedUser.password = formData.password;
        localStorage.setItem("user", JSON.stringify(storedUser));
        
        setMessage("Password has been reset successfully!");
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="LoginApp">
        <div className="login-container" style={{ minHeight: "400px" }}>
          <div className="form-container sign-in" style={{ width: "100%", left: "0" }}>
            {step === "request" && (
              <form onSubmit={requestPasswordReset}>
                <h1>Reset Password</h1>
                <p>Enter your email address to receive a password reset code</p>
                
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}
                
                <button type="submit">Send Reset Code</button>
                <Link to="/" style={{ marginTop: "15px" }}>Back to Login</Link>
              </form>
            )}

            {step === "verify" && (
              <form onSubmit={verifyCode}>
                <h1>Verify Code</h1>
                {message && <p className="success-message">{message}</p>}
                <p>Enter the verification code sent to your email</p>
                
                <input
                  type="text"
                  name="code"
                  placeholder="Verification Code"
                  value={resetCode}
                  onChange={handleCodeChange}
                />
                {errors.code && <p className="error">{errors.code}</p>}
                
                <button type="submit">Verify Code</button>
              </form>
            )}

            {step === "reset" && (
              <form onSubmit={resetPassword}>
                <h1>Create New Password</h1>
                {message && <p className="success-message">{message}</p>}
                
                <input
                  type="password"
                  name="password"
                  placeholder="New Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="error">{errors.password}</p>}
                
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                
                <button type="submit">Reset Password</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;