import React, { useEffect, useState } from "react";
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
    } else if (data.profilePic.image) {
      setPreviewUrl(data.profilePic.image);
    } else if (data.profilePic instanceof File) {
      const url = URL.createObjectURL(data.profilePic);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [data.profilePic]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Save both the file name and the base64 image string
        onChange({
          ...data,
          profilePic: {
            name: file.name,
            image: event.target?.result,
          },
        });
      };
      reader.onerror = (err) => {
        console.error("Error reading file:", err);
      };
      reader.readAsDataURL(file);
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

            <div className="skills-dual-input">
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
                  <option value="MR">Mr</option>
                  <option value="MRS">Mrs</option>
                  <option value="MS">Ms</option>
                  <option value="DR">Dr</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="assessment-end">
                  Birthday<span className="required-asterisk">*</span>
                </label>
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  value={data.birthday || ""}
                  onChange={handleChange}
                  required
                  style={{ font: "inherit" }}
                  max="2008-12-31"
                />
              </div>
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
                <option value="0-1 Years">0-1 Years</option>
                <option value="1-2 Years">1-2 Years</option>
                <option value="3-4 Years">3-4 Years</option>
                <option value="4-5 Years">4-5 Years</option>
                <option value="5+ Years">5+ Years</option>
              </select>
            </div>

            <div className="skills-dual-input">
              <div className="form-group">
                <label htmlFor="role">
                  Company<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  placeholder="Company"
                  onChange={handleChange}
                  value={data.company || ""}
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">
                  Role<span className="required-asterisk">*</span>
                </label>
                <select
                  name="role"
                  id="role"
                  onChange={handleChange}
                  value={data.role || ""}
                  className="role-select"
                >
                  <option value="" disabled>
                    Role
                  </option>
                  <option value="DEVELOPER">Developer</option>
                  <option value="DESIGNER">Designer</option>
                  <option value="PROJECT_MANAGER">Project Manager</option>
                  <option value="TEAM_LEAD">Team Lead</option>
                  <option value="SENIOR_DEVELOPER">Senior Developer</option>
                  <option value="FULLSTACK_DEVELOPER">Full Stack Developer</option>
                  <option value="FRONTEND_DEVELOPER">Frontend Developer</option>
                  <option value="BACKEND_DEVELOPER">Backend Developer</option>
                  <option value="UX_UI_DESIGNER">UX/UI Designer</option>
                  <option value="JUNIOR_DEVELOPER">Junior Developer</option>
                  <option value="TESTER">Tester</option>
                  <option value="PRODUCT_OWNER">Product Owner</option>
                  <option value="SCRUM_MASTER">Scrum Master</option>
                  <option value="DELIVERY_MANAGER">Delivery Manager</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="location">
                Location<span className="required-asterisk">*</span>
              </label>
              {/* <input
                type="text"
                id="location"
                name="location"
                required
                placeholder="Location"
                onChange={handleChange}
                value={data.location || ""}
              /> */}
              <select
                  id="location"
                  name="location"
                  required
                  value={data.location || ""}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Your Location
                  </option>

                  {/* South Africa */}
                  <optgroup label="South Africa">
                    <option value="Johannesburg">Johannesburg</option>
                    <option value="Cape Town">Cape Town</option>
                    <option value="Durban">Durban</option>
                    <option value="Pretoria">Pretoria</option>
                    <option value="Port Elizabeth">Port Elizabeth</option>
                    <option value="Bloemfontein">Bloemfontein</option>
                    <option value="Nelspruit">Nelspruit</option>
                  </optgroup>

                  {/* United Kingdom */}
                  <optgroup label="United Kingdom">
                    <option value="London">London</option>
                    <option value="Manchester">Manchester</option>
                    <option value="Birmingham">Birmingham</option>
                    <option value="Liverpool">Liverpool</option>
                    <option value="Leeds">Leeds</option>
                    <option value="Glasgow">Glasgow</option>
                    <option value="Edinburgh">Edinburgh</option>
                  </optgroup>

                  {/* Kenya */}
                  <optgroup label="Kenya">
                    <option value="Nairobi">Nairobi</option>
                    <option value="Mombasa">Mombasa</option>
                    <option value="Kisumu">Kisumu</option>
                    <option value="Nakuru">Nakuru</option>
                    <option value="Eldoret">Eldoret</option>
                  </optgroup>

                  {/* Netherlands */}
                  <optgroup label="Netherlands">
                    <option value="Amsterdam">Amsterdam</option>
                    <option value="Rotterdam">Rotterdam</option>
                    <option value="The Hague">The Hague</option>
                    <option value="Utrecht">Utrecht</option>
                    <option value="Eindhoven">Eindhoven</option>
                    <option value="Maastricht">Maastricht</option>
                  </optgroup>

                  {/* United Arab Emirates */}
                  <optgroup label="United Arab Emirates">
                    <option value="Dubai">Dubai</option>
                    <option value="Abu Dhabi">Abu Dhabi</option>
                    <option value="Sharjah">Sharjah</option>
                    <option value="Ajman">Ajman</option>
                    <option value="Fujairah">Fujairah</option>
                    <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                  </optgroup>

                  {/* Ireland */}
                  <optgroup label="Ireland">
                    <option value="Dublin">Dublin</option>
                    <option value="Cork">Cork</option>
                    <option value="Galway">Galway</option>
                    <option value="Limerick">Limerick</option>
                    <option value="Waterford">Waterford</option>
                  </optgroup>
                </select>
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
