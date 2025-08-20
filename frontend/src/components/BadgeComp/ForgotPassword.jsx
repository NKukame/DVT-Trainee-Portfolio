import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import dvtLogo from "../../assets/DVT_Iogin_logo.png";
import { Mail, ArrowLeft } from "lucide-react";
import "./ForgotPassword.css";
import axios from "axios";
import { useEffect } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [step, setStep] = useState(1); 
  const [errors, setErrors] = useState({});
  const [Loading, setLoading] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    special: false
  });
  
  useEffect(() => {
    console.log(queryParams.get("token"));
    if (queryParams.get("token")) {
      setStep(3); 
    }
  }, [queryParams]);


  const checkPasswordCriteria = (password) => {
    const criteria = {
      length: password.length >= 8, 
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) 
    };

    setPasswordCriteria(criteria);
    return criteria;
  };

  const navigate = useNavigate();

  const allowedDomains = ["dvtsoftware.com", "gmail.com"];

  // Email domain validation
  const validateEmailDomain = (email) => {
    const domain = email.split("@")[1];
    return domain && allowedDomains.includes(domain);
  };

  const validateEmail = () => {
    let newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email is invalid";
    } else if (!validateEmailDomain(email)) {
      newErrors.email = `Allowed domains are ${allowedDomains.join(", ")}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    let newErrors = {};
    let criteria = checkPasswordCriteria(newPassword);

    if (!newPassword) {
      newErrors.password = "Password is required";
    // } else if (!criteria.length && !criteria.special) {
    //   newErrors.password = "Password must be at least 8 characters and contain a special character";
    } else if (!criteria.length) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!criteria.special) {
      newErrors.password = "Password must contain a special character";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    const criteria = checkPasswordCriteria(password);

    
    if (errors.password && password.length > 0 && (criteria.length && criteria.special)) {
      setErrors(prev => ({
        ...prev, 
        password: ""
      }));
    }
  };

  
  const handleConfirmPasswordChange = (e) => {
    const confirmPwd = e.target.value;
    setConfirmPassword(confirmPwd);


    if (errors.confirmPassword && confirmPwd === newPassword) {
      setErrors(prev => ({
        ...prev, 
        confirmPassword: ""
      }));
    }
  };

  const handleEmailSubmit = async(e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    try {
      
      console.log("=== EMAIL SUBMIT DEBUG ===");
      console.log("Raw email input:", `"${email}"`);
      console.log("Email length:", email.length);
      console.log("Email trimmed:", `"${email.trim()}"`);
      console.log("Email normalized:", `"${email.trim().toLowerCase()}"`);
      console.log("Allowed domains:", allowedDomains);
      console.log("Email domain:", email.split("@")[1]);
      console.log("Domain validation passed:", validateEmailDomain(email));
      
      const payload = { email: email.trim().toLowerCase() };
      console.log("Payload being sent:", JSON.stringify(payload, null, 2));
      setLoading(true);
      const response = await axios.post("http://localhost:3000/forgot-password", 
        payload,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      
      console.log("SUCCESS - Response:", response.data);
      setStep(2);
      
    } catch (error) {
      console.log("=== ERROR DEBUG ===");
      console.error("Full error object:", error);
      console.error("Error message:", error.message);
      console.error("Error response:", error.response);
      console.error("Error response status:", error.response?.status);
      console.error("Error response data:", error.response?.data);
      setLoading(false);
      if (error.response) {
        const errorMessage = error.response.data?.error || error.response.data?.message || "Failed to send reset email";
        
        if (error.response.status === 500) {
          setErrors({ email: "Server error. Please try again later." });
        } else if (error.response.status === 400) {
          setErrors({ email: errorMessage });
        } else {
          setErrors({ email: errorMessage });
        }
      } else if (error.request) {
        setErrors({ email: "Cannot connect to server. Please check your connection." });
      } else {
        setErrors({ email: `Request error: ${error.message}` });
      }
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;

    const token = queryParams.get("token");
    if (!token) {
      setErrors({ general: "Invalid or missing reset token" });
      return;
    }

    try {
      
      const response = await axios.post("http://localhost:3000/reset-password", {
        token: token,
        newPassword: newPassword
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        console.log("Password updated successfully:", response.data);
        setStep(4);
        
       
        setNewPassword("");
        setConfirmPassword("");
        setPasswordCriteria({ length: false, special: false });
        navigate("/");
        
      } else {
        setErrors({ general: response.data.error || "Failed to reset password" });
      }

    } catch (error) {
      console.error("Error resetting password:", error);
      
      if (error.response) {
       
        const errorMessage = error.response.data?.error || error.response.data?.message || "Failed to reset password";
        
        if (error.response.status === 400) {
          setErrors({ general: "Invalid or expired reset token" });
        } else if (error.response.status === 404) { 
          setErrors({ general: "User not found" });
        } else {
          setErrors({ general: errorMessage });
        }
      } else if (error.request) {
      
        setErrors({ general: "Network error. Please check your connection and try again." });
      } else {
       
        setErrors({ general: "An unexpected error occurred. Please try again." });
      }
    }
  };

  const resendEmail = async () => {
   
    try {
      const response = await axios.post("http://localhost:3000/forgot-password", 
        { email: email.trim().toLowerCase() },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      alert("Reset link has been resent to " + email);
    } catch (error) {
      console.error("Error resending email:", error);
      alert("Failed to resend email. Please try again.");
    }
  };

  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <div className="form-container-forgot-password">
            <h1>Forgot password?</h1>
            <h4>No worries, we'll send you reset instructions.</h4>
            
            <form onSubmit={handleEmailSubmit} className="forgot-form">
              <div className="form-field">
                <h6>Email</h6>
                <div className="email-input-container">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? "error-border" : ""}
                  />
                  <Mail className="mail-icon-forgot-password" strokeWidth={1} size={"20px"} />
                </div>
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>

              {Loading ? <div className="form-loader"></div> : 
                <button type="submit" className="reset-btn">Reset password</button>
              }
             
            </form>
            
            <div className="back-to-login">
              <ArrowLeft size={16} strokeWidth={2} color="black" />
              <Link to="/">Back to log in</Link>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="form-container-forgot-password">
            <h1>Check your email</h1>
            <h4>We sent a password reset link to<br />{email}</h4>
            
            <button className="open-email-btn" onClick={() => window.open(`mailto:${email}`)}>
              Open email app
            </button>
            
            <div className="resend-link">
              <p>Didn't receive the email? <a href="#" onClick={resendEmail}>Click to resend</a></p>
            </div>
            
            <div className="back-to-login">
              <ArrowLeft size={16} strokeWidth={2} color="black"/>
              <Link to="/">Back to log in</Link>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="form-container-forgot-password">
            <h1>Set new password</h1>
            <h4>Your new password must be different to<br />previously used passwords.</h4>
            
            {errors.general && <p className="error-message" style={{marginBottom: "15px", color: "red"}}>{errors.general}</p>}
            
            <form onSubmit={handlePasswordSubmit} className="forgot-form">
              <div className="form-field">
                <h6>Password</h6>
                <div className="password-input-container">
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={handlePasswordChange}
                    className={errors.password ? "error-border" : ""}
                  />
                </div>
                {errors.password && <p className="error-message">{errors.password}</p>}
              </div>
              
              <div className="form-field">
                <h6>Confirm password</h6>
                <div className="password-input-container">
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange} 
                    className={errors.confirmPassword ? "error-border" : ""}
                  />
                </div>
                {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
              </div>
              
              <div className="password-criteria">
                <div className={`criteria-item ${passwordCriteria.length ? "met" : ""}`}>
                  <div className="criteria-checkbox">
                    {passwordCriteria.length && "✓"}
                  </div>
                  <p>Must be at least 8 characters</p>
                </div>
                <div className={`criteria-item ${passwordCriteria.special ? "met" : ""}`}>
                  <div className="criteria-checkbox">
                    {passwordCriteria.special && "✓"}
                  </div>
                  <p>Must contain one special character</p>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="reset-btn"
                disabled={!passwordCriteria.length || !passwordCriteria.special || !confirmPassword || confirmPassword !== newPassword}
                style={{
                  opacity: (!passwordCriteria.length || !passwordCriteria.special || !confirmPassword || confirmPassword !== newPassword) ? 0.6 : 1,
                  cursor: (!passwordCriteria.length || !passwordCriteria.special || !confirmPassword || confirmPassword !== newPassword) ? 'not-allowed' : 'pointer'
                }}
              >
                Reset password
              </button>
            </form>
            
            <div className="back-to-login">
              <ArrowLeft size={16} strokeWidth={2} color="black"/>
              <Link to="/">Back to log in</Link>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="form-container-forgot-password">
            <h1>Password reset</h1>
            <h4>Your password has been successfully reset.<br />Click below to log in magically.</h4>
            
            <button className="continue-btn" onClick={() => navigate("/")}>
              Continue
            </button>
            
            <div className="back-to-login">
              <ArrowLeft size={16} strokeWidth={2} color="black"/>
              <Link to="/">Back to log in</Link>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="split-layout">
        <div className="left-panel">
          <div className="logo-container">
            <img src={dvtLogo} alt="DVT Logo" />
            <div className="tagline">
              <p>Smart People</p>
              <p>Smart Solutions</p>
            </div>
          </div>
        </div>
        <div className="right-panel">
          {renderSteps()}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;