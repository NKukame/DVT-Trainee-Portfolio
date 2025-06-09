import React, { useEffect, useState } from "react";
import "./Form.css";
import { Camera } from "lucide-react";

function BasicInfo({ data, onChange }) {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!data.profilePic) {
      setPreviewUrl(null);
      return;
    }
    if (typeof data.profilePic === "string") {
      setPreviewUrl(data.profilePic);
    } else if (data.profilePic instanceof File) {
      const url = URL.createObjectURL(data.profilePic);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [data.profilePic]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange({
        ...data,
        profilePic: file,
      });
    }
  };

  const handleRemoveProfilePic = () => {
    onChange({
      ...data,
      profilePic: null,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="basic-info-container">
      <form action="" className="basic-info-form">
        <div className="top-form-container">
          <div className="left-form-group">
            <div className="form-group">
              <div className="profile-picture-form">
                {previewUrl ? (
                  <>
                    <img
                      src={previewUrl}
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
              {previewUrl && (
                <button
                  className="remove-profile-pic-btn"
                  type="button"
                  onClick={handleRemoveProfilePic}
                >
                  Remove
                </button>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="title">Title</label>
              <select
                name="title"
                id="title"
                onChange={handleChange}
                value={data.title || ""}
              >
                <option value="" disabled>
                  Title
                </option>
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
                onChange={handleChange}
                value={data.firstName || ""}
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
                onChange={handleChange}
                value={data.lastName || ""}
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
                onChange={handleChange}
                value={data.email || ""}
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
                onChange={handleChange}
                value={data.phone || ""}
              />
            </div>

            <div className="form-group">
              <label htmlFor="experience">
                Experience<span className="required-asterisk">*</span>
              </label>
              <select
                name="experience"
                id=""
                onChange={handleChange}
                value={data.experience || ""}
              >
                <option value="" disabled>
                  Years
                </option>
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
                onChange={handleChange}
                value={data.role || ""}
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
                onChange={handleChange}
                value={data.location || ""}
              />
            </div>
          </div>
        </div>

        <div className="footer-form-container">
          <div className="form-group">
            <label htmlFor="introduction">Introduction</label>
            <textarea
              name="introductionDescription"
              id="introductionDescription"
              placeholder="Enter A Brief Introduction About Yourself"
              onChange={handleChange}
              value={data.introductionDescription || ""}
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BasicInfo;
