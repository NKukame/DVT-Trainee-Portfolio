import "./Form.css";
import { SquarePen } from "lucide-react";

function SubmitForm({ basicInfo, skills, career, testimonials, links, status }){

    return (
        <div className="submit-form-container">

            <div className="basic-info-submit-section">

                <div className="submit-form-header">
                    <h3>Basic Information</h3>
                    <SquarePen className="submit-icon" color="#084677" size={17}/>
                </div>

                <div className="submit-form-text-section">

                    <div className="submit-right-form-section">

                        <div className="submit-form-group">
                            <label className="form-label">Title</label>
                            <p className="form-value">{basicInfo?.title || "-"}</p>
                        </div>   

                        <div className="submit-form-group">
                            <label className="form-label">Name</label>
                            <p className="form-value">{basicInfo?.firstName || "-"}</p>
                        </div>  

                        <div className="submit-form-group">
                            <label className="form-label">Last Name</label>
                            <p className="form-value">{basicInfo?.lastName || "-"}</p>
                        </div>   

                        <div className="submit-form-group">
                            <label className="form-label">Email</label>
                            <p className="form-value">{basicInfo?.email || "-"}.</p>
                        </div>   

                        <div className="submit-form-group">
                            <label className="form-label">Cellphone</label>
                            <p className="form-value">{basicInfo?.phone || "-"}</p>
                        </div>  

                        <div className="submit-form-group">
                            <label className="form-label">Introduction</label>
                            <p className="form-value">{basicInfo?.introductionDescription || "-"}</p>
                        </div>   

                    </div>

                    <div className="submit-left-form-section">

                        <div className="submit-form-group">
                            <label className="form-label">Role</label>
                            <p className="form-value">{basicInfo?.role || "-"}</p>
                        </div>

                        <div className="submit-form-group">
                            <label className="form-label">Experience</label>
                            <p className="form-value">{basicInfo?.experience || "-"}</p>
                        </div>

                        <div className="submit-form-group">
                            <label className="form-label">Location</label>
                            <p className="form-value">{basicInfo?.location || "-"}</p>
                        </div>

                    </div>

                </div>
            </div>

            <div className="submit-form-line"></div>

        </div>
    );

}

export default SubmitForm;