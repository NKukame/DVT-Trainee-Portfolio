import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dvtLogo from "../assets/DVT_Iogin_logo.png";
import { Mail, ArrowLeft } from "lucide-react";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); 
  const [errors, setErrors] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    special: false
  });

  const checkPasswordCriteria = (password) => {
    const criteria = {
      length: password.length === 7,
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    setPasswordCriteria(criteria);
    return criteria;
  };

  const navigate = useNavigate();

  const allowedDomains = ["dvtsoftware.com"];

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
    let criteria = checkPasswordCriteria (newPassword);

    if (!newPassword) {
      newErrors.password = "Password is required";
    } else if (!criteria.length || !criteria.special) {
      newErrors.password = "Password does not meet requirements";
  
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
    checkPasswordCriteria(password);


    if(error.password) {
      const criteria = checkPasswordCriteria(password);
      if(password.length >0 && criteria.length || criteria.special) {
        setErrors(prev => ({
          ...prev, password: ""}));
      }
    }
  };
  const handleConfirmPasswordChange = (e) => {
    const confirmPwd = e.target.value;
    setConfirmPassword(confirmPwd);

    if(error.confirmPassword && confirmPwd === newPassword) {
      setErrors(prev => ({
        ...prev, confirmPassword: ""}));
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (validateEmail()) {
      // In a real app, this would send a reset link to the email
      setStep(2);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (validatePassword()) {
      // In a real app, this would update the user's password
      setStep(4);
      
      // Simulate updating the password in localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.email === email) {
        storedUser.password = newPassword;
        localStorage.setItem("user", JSON.stringify(storedUser));
      }
    }
  };

  const resendEmail = () => {
    // In a real app, this would resend the reset link
    alert("Reset link has been resent to " + email);
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
              
              <button type="submit" className="reset-btn">Reset password</button>
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
            
            <button className="open-email-btn" onClick={() => setStep(3)}>
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
            
            <form onSubmit={handlePasswordSubmit} className="forgot-form">
              <div className="form-field">
                <h6>Password</h6>
                <div className="password-input-container">
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => {
                      validatePassword();
                      setNewPassword(e.target.value);
                    }}
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
                    onChange={(e) => {
                      validatePassword();
                      setConfirmPassword(e.target.value);
                    }}
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
              
              <button type="submit" className="reset-btn">Reset password</button>
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
