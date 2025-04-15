// import './styles.css';
// import './Login.css';
// import Header from './components/Header';
// import { Link } from 'react-router-dom';
import dvtLogo from "./assets/DVT_Iogin_logo.png";
import LockIcon from '@mui/icons-material/Lock';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";

function Signup() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Load saved credentials on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      // Only pre-fill the email, don't pre-fill password for security
      setFormData((prevData) => ({
        ...prevData,
        // email: storedUser.email
      }));
    }
  }, []);

  const allowedDomains = ["dvtsoftware.com"];

  // email domain validation
  const validateEmailDomain = (email) => {
    const domain = email.split("@")[1];
    return domain && allowedDomains.includes(domain);
  };

  const validationForm = () => {
    let newErrors = {};

    if (isSignUp) {
      if (!formData.name) newErrors.name = "Name is required";
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

  const handleChange = (e) => {
    if (e.target.value.includes('@')){
      e.target.name = "email";
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when user starts typing
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSignup = () => {
    if (validationForm()) {
      // Check if email already exists
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.email === formData.email ) {
        setErrors({ email: "This email or username is already registered" });
        return;
      }

      // Save new user
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
      );
      alert("User registered successfully!");
      setIsSignUp(false);
      navigate("/Login");
      // Clear form except email for login
      setFormData(prev => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));
    }
  };

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    
    if (!storedUser) {
      setErrors({ login: "No registered user found. Please sign up first." });
      return;
    }

    if (formData.email === "" &&  formData.name === "") {
      setErrors({ email: "Email or Username is required " });
      return;
    }

    if (formData.password === "") {
      setErrors({ password: "Password is required" });
      return;
    }

    if (
      storedUser &&
      (formData.email === storedUser.email || formData.name === storedUser.name) &&
      formData.password === storedUser.password
    ) {
      alert("Login successful!");
      // Save login status if needed
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      // Check if email or username is incorrect
      if (formData.email !== storedUser.email || formData.name.trim().toLocaleLowerCase() !== storedUser.name.trim().toLocaleLowerCase()) {
        console.log(formData.email ,storedUser.name)
        setErrors({ email: "Email or Username not found" });
      } else {
        setErrors({ password: "Incorrect password" });
      }
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
  }

  return (
    <>
    <Header />
    <div className="LoginApp">
      <div className={`login-container ${isSignUp ? "active" : ""}`}>
        {/* Sign Up Form */}
        <div className="form-container sign-up">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>

            <h6>Name</h6>
            <input
              type="text"
              name="name"
              placeholder="Username"
              value={formData.name}
              onChange={handleChange}
              className={getInputClass("name")}

              // className={errors.name ? "error-border" : ""}
            />
            {errors.name && <p className="error-in">{errors.name}</p>}
            <h6>Email</h6>
            <input
              type="email"
              name="email"
              placeholder=" Enter email address"
              value={formData.email}
              onChange={handleChange}
              className={getInputClass("email")}
            />
            {errors.email && <p className="error-in">{errors.email}</p>}

            
            <h6>Password</h6>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className={getInputClass("password")}
            />
            {errors.password && <p className="error-in">{errors.password}</p>}
            <h6>Confirm Password</h6>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={getInputClass("confirmPassword")}
            />
            {errors.confirmPassword && <p className="error-in">{errors.confirmPassword}</p>}

            <button className="submit" type="submit">Sign Up</button>
            <p className="signInBlack">Already have an account?<Link to="#" onClick={() =>{
               setIsSignUp(false)
               setFormData(prev => ({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
              }))
              setErrors({})
               }}>Log In</Link></p>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in">
          <form onSubmit={handleSubmit}>
            <h1>Welcome</h1>
          
            <h4>Welcome back! Please enter your DVT credentials.</h4>
            <h6>Email/Username</h6>
            <input
              type="text"
              name="name"
              placeholder="Enter email or username"
              value={formData.email || formData.name}
              onChange={handleChange}
              className={getInputClass("email")}
            />
            {errors.email && <p className="error">{errors.email}</p>}
     
            <label for="pwd">Password</label>
            <div className="password-container">
              <input  
              className="password-input"
              type="password"
              name="password"
              placeholder="Password" 
              value={formData.password}
              onChange={handleChange}
              classname={getInputClass("password")}
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" className="password-icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            </div>
            
            
            {errors.password && <p className="error">{errors.password}</p>}
            {errors.login && <p className="error">{errors.login}</p>}

            <Link to="#">Forgot Your Password?</Link>
            <button type="submit">Sign In</button>
          </form>
        </div>

        {/* Toggle Container */}
        <div className="toggle-login-container">
          <div className="login-toggle">
            <div className="toggle-panel toggle-left">
              <img src={dvtLogo} alt="dvt"/>
              <div>
              <p>Smart People</p> 
              <p>Smart Solutions</p>
            
              </div>
              
              {/* <div>
                <button className="hidden" onClick={() => setIsSignUp(false)}>
                Sign In
              </button></div> */}
              
            </div>
            <div className="toggle-panel toggle-right">
            <img src={dvtLogo} alt="dvt"/>
              <div>
              <p>Smart People</p> 
              <p>Smart Solutions</p>
              </div>
              <div>
              <button className="hidden" onClick={() =>
                {setIsSignUp(true)  
                  setFormData(prev => ({
                    email: "",
                    password: "",
                  
                  }))
                  setErrors({})
                }}
                >
                Sign Up
              </button>

              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Signup;

