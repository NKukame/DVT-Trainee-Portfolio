import { Eye, EyeClosed, Mail, Lock } from "lucide-react";

export default function AuthForm({
  formData,
  isSignUp,
  setIsSignUp,
  handleSubmit,
  handleChange,
  isPasswordVisible,
  setIsPasswordVisible,
  loading,
}) {
  const toggleForm = () => {
    setIsSignUp((isSign) => !isSign);
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
          {loading ? (
            <div className="form-loader"></div>
          ) : (
            <button type="submit" className="main-btn">
              {isSignUp ? "SIGN UP" : "SIGN IN"}
            </button>
          )}
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
