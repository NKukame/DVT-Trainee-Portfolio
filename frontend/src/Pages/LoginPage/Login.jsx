import dvtLogo from "../../assets/DVT_Iogin_logo.png";
import OffRememberMeIcon from "../../assets/OffRemeber-me-icon.png";
import OnRememberMeIcon from "../../assets/OnRemember-me-icon.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import "./Login.css";
import { Eye, EyeClosed, Mail, Lock } from "lucide-react";
import axios from 'axios';
import AuthForm from "./MobileLogin";

function Signup() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedCredentials = JSON.parse(
      localStorage.getItem("rememberedCredentials") || "null"
    );

    if (rememberedCredentials?.email) {
      setFormData((prevData) => ({
        ...prevData,
        email: rememberedCredentials.email || "",
      }));
      setRememberMe(true);

      const token = localStorage.getItem("token");
      if (token && rememberedCredentials.token) {
        navigate("/home");
      }
    }
  }, [navigate]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (storedUser) {
      setFormData((prevData) => ({
        ...prevData,
      }));
    }
  }, []);

  const allowedDomains = ["dvtsoftware.com", "gmail.com"];

  const validateEmailDomain = (email) => {
    const domain = email.split("@")[1];
    return domain && allowedDomains.includes(domain);
  };

  const validationForm = () => {
    let newErrors = {};

    if (isSignUp) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirm Password is required";
      } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = "Confirm Password does not match";
      }
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    } else if (!validateEmailDomain(formData.email)) {
      newErrors.email = `Allowed domains are ${allowedDomains.join(", ")}`;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (
      !/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(formData.password)
    ) {
      newErrors.password =
        "Password must contain at least one special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when user starts typing
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleRememberMeToggle = () => {
    setRememberMe(!rememberMe);
  };

  const handleSignup = async () => {
    if (validationForm()) {
      setLoading(true);
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      if (storedUser && storedUser.email === formData.email) {
        setErrors({ email: "This email or username is already registered" });
        setLoading(false);
        return;
      }
      try {
        const userRegistered = await axios.post(
          "http://localhost:3000/register",
          {
            email: formData.email,
            password: formData.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const user_id = userRegistered.data.id;

        console.log("the user ", userRegistered);
        if (userRegistered.status === 201) {
          setIsSignUp(false);
          setFormData((prev) => ({
            ...prev,
            password: "",
            confirmPassword: "",
          }));
          localStorage.setItem("user", JSON.stringify(user_id));
          navigate("/profile-creation");
        } else {
          setErrors({ email: "Registration failed" });
        }
      } catch (err) {
        setErrors({ email: 'Registration failed' });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogin = async () => {
    if (!formData.email) {
      setErrors({ email: "Email or Username is required" });
      return;
    }

    if (!formData.password) {
      setErrors({ password: "Password is required" });
      return;
    }

    setLoading(true);

    try {
      const token = await axios.post(
        "http://localhost:3000/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", JSON.stringify(token.data.token));

      if (rememberMe) {
        localStorage.setItem(
          "rememberedCredentials",
          JSON.stringify({
            email: formData.email,
            token: tokenData,
          })
        );
      } else {
        localStorage.removeItem("rememberedCredentials");
      }

      navigate("/home");
    } catch (error) {
      if (error.response && error.response.data) {
        const err = error.response.data;
        if (err.error === "Incorrect email") {
          setErrors({ email: "Email not found" });
        } else if (err.error === "Incorrect password") {
          setErrors({ password: "Incorrect password" });
        } else {
          setErrors({ login: err.error || "Login failed" });
        }
      } else {
        console.error("Login error:", error);
        setErrors({ login: "Something went wrong. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  const getInputClass = (field) => {
    return errors[field] ? "error-border" : "";
  };

  // Eye icon toggle function
  const handleToggle = (event, isPassword) => {
    if (isPassword) {
      event.currentTarget.closest("div").querySelector("input").type = "text";
    } else {
      event.currentTarget.closest("div").querySelector("input").type = "password";
    }
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Confirm Password Eye icon toggle function
  const handleConfirmPasswordToggle = (event, isPassword) => {
    if (isPassword) {
      event.currentTarget.closest("div").querySelector("input").type = 'text';
    } else {
      event.currentTarget.closest("div").querySelector("input").type = 'password';
    }
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <>
      <AuthForm
        formData={formData}
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isPasswordVisible={isPasswordVisible}
        setIsPasswordVisible={setIsPasswordVisible}
        loading={loading}
        errors={errors}
        setErrors={setErrors}
      />
      <div className="LoginApp">
        <div className={`login-container ${isSignUp ? "login-active" : ""}`}>
          {/* Sign Up Form */}
          <div className="form-container sign-up">
            <form onSubmit={handleSubmit}>
              <h1>Create Account</h1>

              <div className="sign-up-form">
                <h6>Email</h6>
                <div className="email-input-container-signup">
                  <input
                    type="email"
                    name="email"
                    placeholder=" Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    className={getInputClass("email")}
                  />
                  <Mail className="mail-icon-signup" strokeWidth={1} size={"20px"} />
                </div>
                {errors.email ? (<p className="signup-error">{errors.email}</p>) : <p className="signup-error"></p>}

                <h6>Password</h6>
                <div className="password-container-signup">
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    className={getInputClass("password")}
                  />
                  <Lock className="lock-icon-password" strokeWidth={1} size={"20px"} />
                  {isPasswordVisible ? 
                    <Eye className="eye-icon-signup" strokeWidth="1" size={"20px"} onClick={(event) => {
                      handleToggle(event, false)
                    }} /> :
                    <EyeClosed className="eyeclosed-icon-signup" strokeWidth="1" size={"20px"} onClick={(event) => {
                      handleToggle(event, true);
                    }} />
                  }
                </div>
                {errors.password ? (<p className="signup-error">{errors.password}</p>) : <p className="signup-error"></p>}

                <h6>Confirm Password</h6>
                <div className="password-container-signup">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password "
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={getInputClass("confirmPassword")}
                  />
                  <Lock className="lock-icon-confirm" strokeWidth={1} size={"20px"} />
                  {isConfirmPasswordVisible ? 
                    <Eye className="eye-icon-signup" strokeWidth="1" size={"20px"} onClick={(event) => {
                      handleConfirmPasswordToggle(event, false)
                    }} /> :
                    <EyeClosed className="eyeclosed-icon-signup" strokeWidth="1" size={"20px"} onClick={(event) => {
                      handleConfirmPasswordToggle(event, true);
                    }} />
                  }
                </div>
                {errors.confirmPassword ? (<p className="signup-error">{errors.confirmPassword}</p>) : <p className="signup-error"></p>}
              </div>

            {loading ? <div className="form-loader"></div> :
              <button type="submit">Sign Up</button>}

            <p className="signInBlack" style={{ color: "#257A99", fontWeight: "500", fontSize:"10px" }}>Already have an account? <Link to="#" style={{ fontWeight: "500", fontSize:"10px" }} onClick={() =>{
                 setIsSignUp(false)
                 setFormData(prev => ({
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }))
                setErrors({})
                 }}> Sign in </Link></p>
          </form>
        </div>

          {/* Sign In Form */}
          <div className="login-container-form">
            <div className="form-container sign-in">
              <form onSubmit={handleSubmit}>
                <h1>Welcome</h1>

                <h4>Welcome back! Please enter your DVT credentials.</h4>

                <div className="sign-in-h6">
                  <h6>Email </h6>

                  <div className="email-input-container">
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleChange}
                      className={getInputClass("email") + " email-input"}
                    />
                    <Mail className="mail-icon" strokeWidth={1} size={"20px"} />
                  </div>
                  {errors.email ? (
                    <p className="login-error">{errors.email}</p>
                  ) : (
                    <p className="login-error"></p>
                  )}

                  <h6>Password</h6>
                  <div className="password-container">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className={getInputClass("password") + " password-input"}
                    />
                    {isPasswordVisible ? (
                      <Eye
                        className="eye-icon password-icon"
                        strokeWidth="1"
                        size={"20px"}
                        onClick={(event) => {
                          handleToggle(event, false);
                        }}
                      />
                    ) : (
                      <EyeClosed
                        className="eyeclosed-icon password-icon"
                        strokeWidth="1"
                        size={"20px"}
                        onClick={(event) => {
                          handleToggle(event, true);
                        }}
                      />
                    )}

                    <Lock className="lock-icon" strokeWidth={1} size={"20px"} />
                  </div>
                  {errors.password ? (
                    <p className="login-error">{errors.password}</p>
                  ) : (
                    <p className="login-error"></p>
                  )}
                  {errors.login ? (
                    <p className="login-error">{errors.login}</p>
                  ) : (
                    <p className="login-error"></p>
                  )}

                  <div className="remember-me-container">
                    <div className="remember-me">
                      <div className="toggle-switch">
                        <input
                          className="toggle-input"
                          id="toggle"
                          type="checkbox"
                          checked={rememberMe}
                          onChange={handleRememberMeToggle}
                        />
                        <label
                          className="toggle-label"
                          htmlFor="toggle"
                        ></label>
                      </div>
                      <p>Remember me</p>
                    </div>
                    <Link
                      to="/forgot-password"
                      style={{
                        color: "#257A99",
                        fontWeight: "500",
                        fontSize: "10px",
                      }}
                    >
                      {" "}
                      Forgot Your Password?
                    </Link>
                  </div>
                </div>
                {loading ? (
                  <div className="form-loader"></div>
                ) : (
                  <button type="submit">Sign In</button>
                )}
              </form>
            </div>
          </div>

          {/* Toggle Container */}
          <div className="toggle-login-container">
            <div className="login-toggle">
              <div className="toggle-panel toggle-left">
                <img src={dvtLogo} alt="dvt" />
                <div>
                  <p>Smart People</p> 
                  <p>Smart Solutions</p>
                </div>
              </div>
              <div className="toggle-panel toggle-right">
                <img src={dvtLogo} alt="dvt" />
                <div>
                  <p>Smart People</p> 
                  <p>Smart Solutions</p>
                </div>
                <div>
                  <button className="hidden" onClick={() => {
                    setIsSignUp(true);
                    setFormData(prev => ({
                      email: "",
                      password: "",
                    }));
                    setErrors({});
                  }}>
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile form toggle - only visible on mobile */}
        <div className="mobile-form-toggle">
          {!isSignUp ? (
            <p>
              Don't have an account?{" "}
              <a
                href="#"
                onClick={() => {
                  setIsSignUp(true);
                  setFormData(prev => ({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  }));
                  setErrors({});
                }}
              >
                Sign up
              </a>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <a
                href="#"
                onClick={() => {
                  setIsSignUp(false);
                  setFormData(prev => ({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  }));
                  setErrors({});
                }}
              >
                Sign in
              </a>
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Signup;