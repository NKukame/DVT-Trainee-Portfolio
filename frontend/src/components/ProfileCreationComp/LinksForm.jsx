function LinksForm({ data, onChange }) {
  // This component handles the links form for LinkedIn, GitHub, and Portfolio.
  // It receives `data` and `onChange` props to manage the state of the form.
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="links-form">
      <form className="links-form-group">
        <div className="form-group">
          <label htmlFor="links-label">LinkedIn</label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={data.linkedin || ""}
            onChange={handleChange}
            placeholder="Insert Link"
          />
        </div>
        <div className="form-group">
          <label htmlFor="links-label">GitHub</label>
          <input
            type="url"
            id="github"
            name="github"
            value={data.github || ""}
            onChange={handleChange}
            placeholder="Insert Link"
          />
        </div>
        <div className="form-group">
          <label htmlFor="links-label">Portfolio</label>
          <input
            type="url"
            id="portfolio"
            name="portfolio"
            value={data.portfolio || ""}
            onChange={handleChange}
            placeholder="Insert Link"
          />
        </div>
      </form>
    </div>
  );
}

export default LinksForm;
