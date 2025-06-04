import React, { useState } from "react";
import "./Form.css";
import { Camera } from "lucide-react";

function BasicInfo() {
  const [profilePic, setProfilePic] = useState(null);
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };
  return (
    <div className="basic-info-container">
      <form action="" className="basic-info-form">
        <div className="top-form-container">
          <div className="left-form-group">
            <div className="form-group">
              <div className="profile-picture-form">
                {profilePic ? (
                  <>
                    <img
                      src={profilePic}
                      alt="Profile Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </>
                ) : (
                  <>
                    <Camera color="#404040" size={35} />
                    <input
                      type="file"
                      accept="image/*"
                      style={{ marginTop: "2px" }}
                      id="profilePic"
                      name="profilePic"
                      onChange={handleProfilePicChange}
                    />
                  </>
                )}
              </div>
              {profilePic && (
                <button
                  className="remove-profile-pic-btn"
                  type="button"
                  onClick={() => setProfilePic(null)}
                >
                  Remove
                </button>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="title">Title</label>
              <select name="titleDropDown" id="">
                <option value="" disabled>Title</option>
                <option value="mr">Mr.</option>
                <option value="mrs">Mrs.</option>
                <option value="ms">Ms.</option>
                <option value="sr">Dr.</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="firstName">
                Name<span className="required-asterisk">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                placeholder="Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">
                Last Name<span className="required-asterisk">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="right-form-group">
            <div className="form-group">
              <label htmlFor="email">
                Email Address<span className="required-asterisk">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="OSmith@dvtsoftware.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                Phone Number<span className="required-asterisk">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                placeholder="Phone Number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="experience">
                Experience<span className="required-asterisk">*</span>
              </label>
              <select name="experienceDropDown" id="">
                <option value="" disabled>Years</option>
                <option value="0-1">0-1 Years</option>
                <option value="1-2">1-2 Years</option>
                <option value="3-4">3-4 Years</option>
                <option value="4-5">4-5 Years</option>
                <option value="5">5+ Years</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="role">
                Role<span className="required-asterisk">*</span>
              </label>
              <input
                type="text"
                id="role"
                name="role"
                required
                placeholder="Role"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">
                Location<span className="required-asterisk">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                placeholder="Location"
              />
            </div>
          </div>
        </div>

        <div className="footer-form-container">
          <div className="form-group">
            <label htmlFor="introduction">Introduction</label>
            <textarea
              name="introduction-form"
              id="introduction-form"
              placeholder="Enter A Brief Introduction About Yourself"
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BasicInfo;
