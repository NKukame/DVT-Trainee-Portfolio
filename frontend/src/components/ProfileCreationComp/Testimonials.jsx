import { useState } from "react";
import { Upload } from "lucide-react";
import "./Form.css"; 

function Testimonials() {
  const [clientEntries, setClientEntries] = useState([""]); 

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
    
    if (clientEntries.length === 1 && index === 0 && clientEntries[0].trim() === "") {
      return; 
    }

    const updatedEntries = clientEntries.filter((_, i) => i !== index);

    if (updatedEntries.length === 0) {
      setClientEntries([""]);
    } else {
      setClientEntries(updatedEntries);
    }
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
            
            {(clientEntries.length > 1 || (clientName.trim() !== "")) && (
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
        <label htmlFor="clients-label"> 
          Testimonials
        </label>

        <div className="testimonial-upload-container">

            <div className="testimonial-upload">
                <Upload size={30} className="career-projects-upload-icon" />
                <button>Upload Testimonial</button>
            </div>

        </div>

      </div>
    </div>
  );
}

export default Testimonials;