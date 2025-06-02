import "./Form.css";

function LinksForm() {
  return (
    <div className="links-form">
      <form className="links-form-group">
        <div className="form-group">
          <label htmlFor="links-label">
            LinkedIn
          </label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            placeholder="Insert Link"
          />
        </div>
        <div className="form-group">
          <label htmlFor="links-label">
            GitHub
          </label>
          <input
            type="url"
            id="github"
            name="github"
            placeholder="Insert Link"
          />
        </div>
        <div className="form-group">
          <label htmlFor="links-label">
            Portfolio
          </label>
          <input
            type="url"
            id="portfolio"
            name="portfolio"
            required
            placeholder="Insert Link"
          />
        </div>
      </form>
    </div>
  );
}

export default LinksForm;
