import dvtLogo from "./assets/DVT_Iogin_logo.png";
import OffRememberMeIcon from "./assets/OffRemeber-me-icon.png";
import OnRememberMeIcon from "./assets/OnRemember-me-icon.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { Eye, EyeClosed, Mail, Lock, Weight } from "lucide-react";
import { use } from "react";

function Signup() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

// State to manage password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedCredentials = JSON.parse(
      localStorage.getItem("rememberedCredentials"));

      if(rememberedCredentials) {
        setFormData((prevData) => ({
          ...prevData,
          email: rememberedCredentials.email || "",
        name: rememberedCredentials.name || "",
        password: rememberedCredentials.password || ""
        }));

        setRememberMe(true);
      }
  }, []);


  // Load saved credentials on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setFormData((prevData) => ({
        ...prevData,
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

  const handleRememberMeToggle = () =>{
    setRememberMe(!rememberMe);

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
      navigate("/");
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

      if (rememberMe) {
        localStorage.setItem("rememberedCredentials", JSON.stringify({
          email: formData.email,
          name: formData.name,
          password: formData.password
        }));
      } else {

        localStorage.removeItem("rememberedCredentials");

      }


      alert("Login successful!");
      // Save login status if needed
      localStorage.setItem("isLoggedIn", "true");
      navigate("/home");
    } else {
      // Check if email or username is incorrect
      if ( formData.name.toLocaleLowerCase() !== storedUser.name.toLocaleLowerCase() && formData.email.toLocaleLowerCase() !== storedUser.email.toLocaleLowerCase()) {
        console.log(formData.email ,storedUser.name)
        setErrors({ email: "Email or Username not found" });
      } else {
        setErrors({ password: "Incorrect password" });
      }
    }
  };

  // Handle form submission
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

// Eye icon toggle function
  const handleToggle = (event, isPassword) => {
    if(isPassword){
      event.currentTarget.closest("div").querySelector("input").type = 'text'
    }
    else{
      event.currentTarget.closest("div").querySelector("input").type = 'password'
    }
    setIsPasswordVisible(isPassword)
  };
      
  

  return (
    <>
    {/* <Header /> */}
    <div className="LoginApp">
      <div className={`login-container ${isSignUp ? "active" : ""}`}>
        {/* Sign Up Form */}
        <div className="form-container sign-up">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>

            <div className="sign-up-form">
                 <h6>Name</h6>
                <div className="username-container">
                      <input
                        type="text"
                        name="name"
                        placeholder="username"
                        value={formData.name}
                        onChange={handleChange}
                        className={getInputClass("name")}/>
                      {errors.name && <p className="signup-error">{errors.name}</p>}
                      {/* <Mail className="mail-icon-signup" strokeWidth={1} size={"20px"}/> */}
                </div>
        
            <h6>Email</h6>
            <input
              type="email"
              name="email"
              placeholder=" Enter email address"
              value={formData.email}
              onChange={handleChange}
              className={getInputClass("email")}
            />
             
            {/* <Mail className="mail-icon" strokeWidth={1} size={"20px"}/> */}
          {errors.email ? (<p className="signup-error">{errors.email}</p>) : <p className="signup-error"></p>}

            
            <h6> Password</h6>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className={getInputClass("password")}
            />
            
            {errors.password ? (<p className="signup-error">{errors.password}</p>) : <p className="signup-error"></p>}
            <h6>Confirm Password</h6>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={getInputClass("confirmPassword")}
            />
            {errors.confirmPassword ? (<p className="signup-error">{errors.confirmPassword}</p>) : <p className="signup-error"></p>}

            </div>
            <button className="submit" type="submit">Sign Up</button>
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
            <h6 >Email or Username</h6>

                    <div className="email-input-container">
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter email or username"
                          value={formData.email || formData.name}
                          onChange={handleChange}
                          className={getInputClass("email")+" email-input"}
                    />
                    <Mail className="mail-icon" strokeWidth={1} size={"20px"}/>
                    </div>
                    {errors.email ? (<p className="login-error">{errors.email}</p>) : <p className="login-error"></p>}

                    <h6 >Password</h6>
                    <div className="password-container">
                      <input  
                      // className="password-input"
                      type="password"
                      name="password"
                      placeholder="Password" 
                      value={formData.password}
                      onChange={handleChange}
                      classname={getInputClass("password")+" password-input"}
                    />
                    {isPasswordVisible ? < Eye className="eye-icon password-icon" strokeWidth="1" size={"20px"} onClick={(event)=>{
                      handleToggle(event, false)
                    }}/>:

                    <EyeClosed className="eyeclosed-icon password-icon" strokeWidth="1"  size={"20px"} onClick={(event)=>{
                      handleToggle(event, true);
                    }} />
                    }

                    <Lock className="lock-icon"  strokeWidth={1} size={"20px"}/>
                    
                    </div>
                    {errors.password ? (<p className="login-error">{errors.password}</p>) : <p className="login-error"></p>}
                    {errors.login ? (<p className="login-error">{errors.login}</p>) : <p className="login-error"></p>}

                    
                <div className="remember-me-container">
                     <div className="remember-me">
                        <div class="toggle-switch">
                          <input class="toggle-input" id="toggle" type="checkbox" checked={rememberMe}
                          onChange={handleRememberMeToggle}/>
                          <label class="toggle-label" for="toggle"></label>
                        </div>
                        <p>Remember me</p>
                     </div>
                        <Link to="/forgot-password" style={{ color: "#257A99", fontWeight: "500", fontSize:"10px" }}> Forgot Your Password?</Link>
                </div> 
            </div>    
          
            <button type="submit">Sign In</button>

          </form>
        </div>
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


