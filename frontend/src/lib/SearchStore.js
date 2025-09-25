import {create} from "zustand";
import {getAllProjects} from "./ApiCalls";

export const useSearchStore = create((set) => ({
    projectsWithTechStackNames: [],
    setProjectsWithTechStackNames: async (page, query, params, isAvailable) => {
        
        const {projectsWithTechStack} = await getAllProjects(page, query, params, isAvailable);
        set({projectsWithTechStackNames: projectsWithTechStack});
    }

})); 