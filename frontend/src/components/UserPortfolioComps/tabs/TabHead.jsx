function TabHead({ activeTab, setActiveTab }) {
  return (
    <>
      <section className="tab-head-container">
        <button
          id="overview"
          onClick={() => setActiveTab("overview")}
          className={activeTab === "overview" ? "tab active" : "tab"}
        >
          Overview
        </button>
        <button
          id="projects"
          onClick={() => setActiveTab("projects")}
          className={activeTab === "projects" ? "tab active" : "tab"}
        >
          Projects
        </button>
        <button
          id="skills"
          onClick={() => setActiveTab("skills")}
          className={activeTab === "skills" ? "tab active" : "tab"}
        >
          Skills Breakdown
        </button>
      </section>
    </>
  );
}

export default TabHead;
