import dvtLogo from "../../assets/DVT_Iogin_logo.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeClosed, Mail, Lock } from "lucide-react";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedCredentials = JSON.parse(
      localStorage.getItem("rememberedCredentials"),
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
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setFormData((prevData) => ({
        ...prevData,
      }));
    }
  }, []);

  const allowedDomains = ["dvtsoftware.com"];
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
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // (Removed misplaced code block that was outside of any function)

  const handleRememberMeToggle = () => {
    setRememberMe(!rememberMe);
  };

  const handleSignup = async () => {
    if (validationForm()) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.email === formData.email) {
        setErrors({ email: "This email or username is already registered" });
        return;
      }

      try {
        setLoading(true);

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
          },
        );

        if (userRegistered.status === 201) {
          setIsSignUp(false);
          setFormData((prev) => ({
            ...prev,
            password: "",
            confirmPassword: "",
          }));
          navigate("/profile-creation");
        } else {
          setErrors({ email: "Registration failed" });
          setLoading(false);
        }
      } catch (err) {
        setErrors({ email: "Registration failed" });
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

    try {
      setLoading(true);
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
        },
      );

      const tokenData = token.data.token;
      localStorage.setItem("token", JSON.stringify(tokenData));

      if (rememberMe) {
        localStorage.setItem(
          "rememberedCredentials",
          JSON.stringify({ email: formData.email, token: tokenData }),
        );
      } else {
        localStorage.removeItem("rememberedCredentials");
      }

      navigate("/home");
    } catch (error) {
      setLoading(false);
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
      event.currentTarget.closest("div").querySelector("input").type =
        "password";
    }
    setIsPasswordVisible(isPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setFormData({ email: "", password: "", confirmPassword: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign in or sign up logic
    if (isSignUp) {
      navigate("/profile-creation");
    } else {
      console.log("Sign In Data:", {
        email: formData.email,
        password: formData.password,
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card mobile-login">
        <div className="logo">
          <span className="logo-text">dvt</span>
        </div>
        <h2>{isSignUp ? "Create Account" : "Welcome Back"}</h2>
        <p>
          {isSignUp
            ? "Please fill in your details"
            : "Please login to your account"}
        </p>

        <form onSubmit={handleSubmit} className="mobile-login-form ">
          <label>Email</label>
          <div className="email-input-container mobile-login-input">
            <input
              type="text"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className={"email" + " email-input"}
            />
            <Mail className="mail-icon" strokeWidth={1} size={"20px"} />
          </div>

          <label>Password</label>
          <div className="password-container mobile-login-input">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={"password" + " password-input"}
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

          {isSignUp && (
            <div className="mobile-login-input">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={"mobile-login-input"}
              />
            </div>
          )}

          {!isSignUp && (
            <div className="options-row">
              <div className="remember">
                <div className="check">

                <input type="checkbox" />
                </div>
                <p className="remember-me">Remember me</p>
              </div>
              <a href="#">Forgot Password?</a>
            </div>
          )}

          <button type="submit" className="main-btn">
            {isSignUp ? "SIGN UP" : "SIGN IN"}
          </button>
        </form>

        <div className="toggle-text">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <span className="toggle-link" onClick={toggleForm}>
                Sign in
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span className="toggle-link" onClick={toggleForm}>
                Sign up
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
