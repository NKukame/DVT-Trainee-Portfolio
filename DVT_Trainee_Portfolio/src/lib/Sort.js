export default class Sort{
  #data;
  #projects;

  constructor(data){

    this.#data = data.filter(project =>{ return project.project_id === undefined });
    this.#projects = data.filter(project =>{ return project.project_id !== undefined });
  }

  sortByEmployeeName(){
    return this.#data.sort((a, b) => a.name.localeCompare(b.name));
  };

  sortByEmployeeUsername(){
    return this.#data.sort((a, b) => a.username.localeCompare(b.username));
  };

  sortByProjectTitle(){
    return this.#projects.sort((a, b) => a.title.localeCompare(b.title));
  };

  sortByProjectCreationDate(){
    return this.#projects.sort((a, b) => new Date(a.created_on) - new Date(b.created_on));
  };

  sortBySkills(){
    return this.#data.sort((a, b) => b.skills.length - a.skills.length);
  };
}