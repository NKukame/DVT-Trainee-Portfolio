import { useState } from "react";
import { Upload, Save, X } from "lucide-react";
import "./Form.css";

function Testimonials() {
  const [clientEntries, setClientEntries] = useState([""]);
  const [showModal, setShowModal] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialText, setTestimonialText] = useState("");
  const [testimonialReference, setTestimonialReference] = useState("");
  const [testimonialCompany, setTestimonialCompany] = useState("");

  // Function to handle changes in any client input field
  const handleChange = (index, event) => {
    const { value } = event.target;
    const updatedEntries = [...clientEntries];
    updatedEntries[index] = value;

    setClientEntries(updatedEntries);

    if (index === clientEntries.length - 1) {
      if (value.trim() !== "") {
        setClientEntries([...updatedEntries, ""]);
      }
    }
  };

  // Function to handle removing a client entry
  const handleRemoveEntry = (index) => {
    if (
      clientEntries.length === 1 &&
      index === 0 &&
      clientEntries[0].trim() === ""
    ) {
      return;
    }

    const updatedEntries = clientEntries.filter((_, i) => i !== index);

    if (updatedEntries.length === 0) {
      setClientEntries([""]);
    } else {
      setClientEntries(updatedEntries);
    }
  };

  const handleSaveTestimonial = () => {
    if (!testimonialText.trim()) return; // Optionally require text

    setTestimonials([
      ...testimonials,
      {
        text: testimonialText,
        reference: testimonialReference,
        company: testimonialCompany,
      },
    ]);
    setShowModal(false);
    setTestimonialText("");
    setTestimonialReference("");
    setTestimonialCompany("");
  };

  return (
    <div className="testimonials-form">
      <div className="form-group">
        <label htmlFor="clients-label">
          Clients<span className="required-asterisk">*</span>
        </label>

        {clientEntries.map((clientName, index) => (
          <div key={index} className="client-input-row">
            <input
              type="text"
              id={`client-${index}`}
              name="client"
              required={index === 0}
              placeholder="Client Name"
              value={clientName}
              onChange={(e) => handleChange(index, e)}
            />

            {(clientEntries.length > 1 || clientName.trim() !== "") && (
              <button
                type="button"
                className="remove-client-button"
                onClick={() => handleRemoveEntry(index)}
              >
                &times;
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="testimonials-form-container">
        <div className="form-group">
          <label htmlFor="clients-label">Testimonials</label>

          <div className="testimonial-insertion-container">
            <div className="testimonial-upload-container">
              <div className="testimonial-upload">
                <Upload size={30} className="career-projects-upload-icon" />
                <button type="button" onClick={() => setShowModal(true)}>
                  Upload Testimonial
                </button>
              </div>
            </div>

            {testimonials.map((t, idx) => (
              <div className="testimonial-upload-container" key={idx}>
                <div className="testimonial-uploaded-input">
                  <p>"{t.text}"</p>
                  <div className="testimonial-uploaded-input-author">
                    <h4>{t.reference}</h4>
                    <p>{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className="career-upload-modal-overlay"
          onClick={(e) => {
            if (e.target.classList.contains("career-upload-modal-overlay")) {
              setShowModal(false);
            }
          }}
        >
          <div className="career-upload-modal testimonial-modal">
            <div className="form-group">
              <h3>Testimonial</h3>
              <textarea
                id="testimonial-text"
                name="testimonial-text"
                placeholder="Enter Testimonial"
                value={testimonialText}
                onChange={(e) => setTestimonialText(e.target.value)}
              ></textarea>
            </div>
            <div className="career-project-bottom-section">
              <div className="form-group">
                <label htmlFor="project-link">Reference</label>
                <input
                  type="text"
                  id="testimonial-reference"
                  name="testimonial-reference"
                  placeholder="Insert Reference"
                  value={testimonialReference}
                  onChange={(e) => setTestimonialReference(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="github-link">Company</label>
                <input
                  type="text"
                  id="testimonial-company"
                  name="testimonial-company"
                  placeholder="Insert Company"
                  value={testimonialCompany}
                  onChange={(e) => setTestimonialCompany(e.target.value)}
                />
              </div>
            </div>
            <div className="career-modal-button-section">
              <button
                onClick={() => setShowModal(false)}
                className="career-modal-close-button"
              >
                <X size={15} />
                Close
              </button>
              <button
                className="career-modal-submit-button"
                onClick={handleSaveTestimonial}
              >
                <Save size={15} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Testimonials;
