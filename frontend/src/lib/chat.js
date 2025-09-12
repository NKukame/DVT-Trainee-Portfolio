// src/lib/ai-tools.ts
import { OpenAI } from "openai";
import { dataProvider } from "../providers/dataProvider";

const client = new OpenAI({
  baseURL: "https://api.deepinfra.com/v1/openai",
  apiKey: import.meta.env.VITE_DEEPINFRA_API_KEY,
  dangerouslyAllowBrowser: true,
});

const tools = [
  {
    type: "function",
    function: {
      name: "find_employee_by_name",
      description: "Find employees by name, surname, or email",
      parameters: {
        type: "object",
        properties: {
          searchTerm: { type: "string", description: "Name, surname, or email to search for" }
        },
        required: ["searchTerm"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_employee_profile",
      description: "Get complete employee profile with skills, projects, education, etc.",
      parameters: {
        type: "object",
        properties: {
          employeeId: { type: "string", description: "Employee ID" }
        },
        required: ["employeeId"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "search_employees_by_skills",
      description: "Find employees with specific technical skills or roles",
      parameters: {
        type: "object",
        properties: {
          techSkill: { type: "string", description: "Technology or skill name (e.g., 'React', 'Python')" },
          role: { type: "string", description: "Employee role (e.g., 'DEVELOPER', 'DESIGNER')" },
          department: { type: "string", description: "Department (e.g., 'ENGINEERING', 'DESIGN')" }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_project_details",
      description: "Get project information including team members and tech stack",
      parameters: {
        type: "object",
        properties: {
          projectId: { type: "string", description: "Project ID" },
          projectName: { type: "string", description: "Project name" }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_available_employees",
      description: "Find employees who are currently available for projects",
      parameters: {
        type: "object",
        properties: {
          role: { type: "string", description: "Specific role needed (optional)" },
          techSkill: { type: "string", description: "Required tech skill (optional)" }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "create_employee_profile",
      description: "Create a new employee profile",
      parameters: {
        type: "object",
        properties: {
          title: { type: "string", enum: ["MR", "MRS", "MS", "DR"] },
          name: { type: "string", description: "First name" },
          surname: { type: "string", description: "Last name" },
          email: { type: "string", description: "Email address" },
          role: { type: "string", enum: ["DEVELOPER", "DESIGNER", "PROJECT_MANAGER", "TEAM_LEAD", "SENIOR_DEVELOPER", "FULLSTACK_DEVELOPER", "FRONTEND_DEVELOPER", "BACKEND_DEVELOPER", "UX_UI_DESIGNER", "JUNIOR_DEVELOPER", "TESTER", "PRODUCT_OWNER", "SCRUM_MASTER", "DELIVERY_MANAGER"] },
          department: { type: "string", enum: ["ENGINEERING", "DESIGN", "MARKETING", "SALES", "HR"] },
          company: { type: "string", description: "Company name" },
          bio: { type: "string", description: "Employee bio" },
          phone: { type: "string", description: "Phone number (optional)" },
          github: { type: "string", description: "GitHub username (optional)" },
          linkedIn: { type: "string", description: "LinkedIn profile (optional)" }
        },
        required: ["title", "name", "surname", "email", "role", "department", "company", "bio"]
      }
    }
  }
];

// Tool execution functions
async function find_employee_by_name(searchTerm) {
  try {
    const filters = [
      { field: "name", operator: "contains", value: searchTerm },
      { field: "surname", operator: "contains", value: searchTerm },
      { field: "email", operator: "contains", value: searchTerm }
    ];

    // Try multiple searches
    const results = [];
    for (const filter of filters) {
      const result = await dataProvider.getList({
        resource: "employee",
        // filters: [filter],
        pagination: { current: 1, pageSize: 10 },
      });
      results.push(...result.data);
    }

    // Remove duplicates by ID
    const uniqueEmployees = results.filter((emp, index, self) => 
      index === self.findIndex(e => e.id === emp.id)
    );

    return JSON.stringify({
      success: true,
      employees: uniqueEmployees.map(emp => ({
        id: emp.id,
        name: `${emp.title} ${emp.name} ${emp.surname}`,
        email: emp.email,
        role: emp.role,
        department: emp.department,
        company: emp.company
      })),
      count: uniqueEmployees.length
    });
  } catch (error) {
    return JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : "Employee search failed"
    });
  }
}

async function get_employee_profile(employeeId) {
  try {
    const employee = await dataProvider.getOne({
      resource: "employee",
      id: employeeId,
    });

    // Get related data
    const [techStack, softSkills, projects, testimonials, education, certificates, career] = await Promise.all([
      dataProvider.getList({
        resource: "employeeTechStack",
        filters: [{ field: "employeeId", operator: "eq", value: employeeId }],
        pagination: { current: 1, pageSize: 100 },
      }),
      dataProvider.getList({
        resource: "employeeSoftSkill", 
        filters: [{ field: "employeeId", operator: "eq", value: employeeId }],
        pagination: { current: 1, pageSize: 100 },
      }),
      dataProvider.getList({
        resource: "projectMember",
        filters: [{ field: "employeeId", operator: "eq", value: employeeId }],
        pagination: { current: 1, pageSize: 100 },
      }),
      dataProvider.getList({
        resource: "testimonial",
        filters: [{ field: "employeeId", operator: "eq", value: employeeId }],
        pagination: { current: 1, pageSize: 100 },
      }),
      dataProvider.getList({
        resource: "education",
        filters: [{ field: "employeeId", operator: "eq", value: employeeId }],
        pagination: { current: 1, pageSize: 100 },
      }),
      dataProvider.getList({
        resource: "certificate",
        filters: [{ field: "employeeId", operator: "eq", value: employeeId }],
        pagination: { current: 1, pageSize: 100 },
      }),
      dataProvider.getList({
        resource: "career",
        filters: [{ field: "employeeId", operator: "eq", value: employeeId }],
        pagination: { current: 1, pageSize: 100 },
      }),
    ]);

    return JSON.stringify({
      success: true,
      employee: {
        ...employee.data,
        techStack: techStack.data,
        softSkills: softSkills.data,
        projects: projects.data,
        testimonials: testimonials.data,
        education: education.data,
        certificates: certificates.data,
        career: career.data
      }
    });
  } catch (error) {
    return JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : "Failed to get employee profile"
    });
  }
}

async function search_employees_by_skills(techSkill, role, department) {
  try {
    let filters = [];
    
    if (role) filters.push({ field: "role", operator: "eq", value: role });
    if (department) filters.push({ field: "department", operator: "eq", value: department });

    const employees = await dataProvider.getList({
      resource: "employee",
      filters,
      pagination: { current: 1, pageSize: 100 },
    });

    let filteredEmployees = employees.data;

    // If techSkill is specified, filter by tech stack
    if (techSkill) {
      const employeesWithSkill = [];
      for (const emp of employees.data) {
        const techStackResult = await dataProvider.getList({
          resource: "employeeTechStack",
          filters: [{ field: "employeeId", operator: "eq", value: emp.id }],
          pagination: { current: 1, pageSize: 100 },
        });
        
        // Check if any of their tech stack includes the skill
        const hasSkill = techStackResult.data.some((ts) => 
          ts.techStack?.name?.toLowerCase().includes(techSkill.toLowerCase())
        );
        
        if (hasSkill) {
          employeesWithSkill.push(emp);
        }
      }
      filteredEmployees = employeesWithSkill;
    }

    return JSON.stringify({
      success: true,
      employees: filteredEmployees.map(emp => ({
        id: emp.id,
        name: `${emp.title} ${emp.name} ${emp.surname}`,
        email: emp.email,
        role: emp.role,
        department: emp.department,
        company: emp.company,
        experience: emp.experience
      })),
      count: filteredEmployees.length,
      searchCriteria: { techSkill, role, department }
    });
  } catch (error) {
    return JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : "Skills search failed"
    });
  }
}

async function get_project_details(projectId, projectName) {
  try {
    let project;
    
    if (projectId) {
      project = await dataProvider.getOne({
        resource: "project",
        id: projectId,
      });
    } else if (projectName) {
      const projects = await dataProvider.getList({
        resource: "project",
        filters: [{ field: "name", operator: "eq", value: projectName }],
        pagination: { current: 1, pageSize: 1 },
      });
      project = { data: projects.data[0] };
    } else {
      throw new Error("Either projectId or projectName is required");
    }

    if (!project.data) {
      return JSON.stringify({
        success: false,
        error: "Project not found"
      });
    }

    // Get project members, tech stack, and industries
    const [members, techStack, industries] = await Promise.all([
      dataProvider.getList({
        resource: "projectMember",
        filters: [{ field: "projectId", operator: "eq", value: project.data.id }],
        pagination: { current: 1, pageSize: 100 },
      }),
      dataProvider.getList({
        resource: "projectTechStack",
        filters: [{ field: "projectId", operator: "eq", value: project.data.id }],
        pagination: { current: 1, pageSize: 100 },
      }),
      dataProvider.getList({
        resource: "projectIndustry",
        filters: [{ field: "projectId", operator: "eq", value: project.data.id }],
        pagination: { current: 1, pageSize: 100 },
      }),
    ]);

    return JSON.stringify({
      success: true,
      project: {
        ...project.data,
        members: members.data,
        techStack: techStack.data,
        industries: industries.data
      }
    });
  } catch (error) {
    return JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : "Failed to get project details"
    });
  }
}

async function get_available_employees(role, techSkill) {
  try {
    // Get available employees
    const availability = await dataProvider.getList({
      resource: "availability",
      filters: [{ field: "available", operator: "eq", value: true }],
      pagination: { current: 1, pageSize: 100 },
    });

    const availableEmployeeIds = availability.data.map((a) => a.employeeId);
    
    if (availableEmployeeIds.length === 0) {
      return JSON.stringify({
        success: true,
        employees: [],
        count: 0,
        message: "No employees are currently marked as available"
      });
    }

    // Get employee details for available employees
    let filters = [
      { field: "id", operator: "in", value: availableEmployeeIds }
    ];
    
    if (role) {
      filters.push({ field: "role", operator: "eq", value: role });
    }

    const employees = await dataProvider.getList({
      resource: "employee",
      filters,
      pagination: { current: 1, pageSize: 100 },
    });

    let filteredEmployees = employees.data;

    // Filter by tech skill if specified
    if (techSkill) {
      const employeesWithSkill = [];
      for (const emp of employees.data) {
        const techStackResult = await dataProvider.getList({
          resource: "employeeTechStack",
          filters: [{ field: "employeeId", operator: "eq", value: emp.id }],
          pagination: { current: 1, pageSize: 100 },
        });
        
        const hasSkill = techStackResult.data.some((ts) => 
          ts.techStack?.name?.toLowerCase().includes(techSkill.toLowerCase())
        );
        
        if (hasSkill) {
          employeesWithSkill.push(emp);
        }
      }
      filteredEmployees = employeesWithSkill;
    }

    return JSON.stringify({
      success: true,
      employees: filteredEmployees.map(emp => ({
        id: emp.id,
        name: `${emp.title} ${emp.name} ${emp.surname}`,
        email: emp.email,
        role: emp.role,
        department: emp.department,
        company: emp.company,
        experience: emp.experience,
        github: emp.github,
        linkedIn: emp.linkedIn
      })),
      count: filteredEmployees.length,
      searchCriteria: { role, techSkill }
    });
  } catch (error) {
    return JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : "Failed to get available employees"
    });
  }
}

async function create_employee_profile(profileData) {
  try {
    const employee = await dataProvider.create({
      resource: "employee",
      variables: profileData
    });

    // Create availability record (default to available)
    await dataProvider.create({
      resource: "availability",
      variables: {
        employeeId: employee.data.id,
        available: true,
        client: "DVT" // Default client
      }
    });

    return JSON.stringify({
      success: true,
      employee: employee.data,
      message: `Employee profile created for ${profileData.name} ${profileData.surname}`
    });
  } catch (error) {
    return JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : "Failed to create employee profile"
    });
  }
}

export async function chatWithAI(message) {
  try {
    const response = await client.chat.completions.create({
      model: "meta-llama/Meta-Llama-3.1-70B-Instruct",
      messages: [{ role: "user", content: message }],
      tools,
      tool_choice: "auto",
    });

    console.log(response);
    const toolCalls = response.choices[0].message.tool_calls;
    if (toolCalls) {
      const toolResults = [];
      
      for (const toolCall of toolCalls) {
        const { name, arguments: args } = toolCall.function;
        const parsedArgs = JSON.parse(args);
        
        let result;
        switch (name) {
          case 'find_employee_by_name':
            result = await find_employee_by_name(parsedArgs.searchTerm);
            break;
          case 'get_employee_profile':
            result = await get_employee_profile(parsedArgs.employeeId);
            break;
          case 'search_employees_by_skills':
            result = await search_employees_by_skills(parsedArgs.techSkill, parsedArgs.role, parsedArgs.department);
            break;
          case 'get_project_details':
            result = await get_project_details(parsedArgs.projectId, parsedArgs.projectName);
            break;
          case 'get_available_employees':
            result = await get_available_employees(parsedArgs.role, parsedArgs.techSkill);
            break;
          case 'create_employee_profile':
            result = await create_employee_profile(parsedArgs);
            break;
          default:
            result = JSON.stringify({
              success: false,
              error: `Unknown function: ${name}`
            });
        }
        
        toolResults.push({
          tool_call_id: toolCall.id,
          role: "tool",
          content: result,
        });
      }
      
      const finalResponse = await client.chat.completions.create({
        model: "meta-llama/Meta-Llama-3.1-70B-Instruct",
        messages: [
          { role: "user", content: message },
          response.choices[0].message,
          ...toolResults,
        ],
      });

      console.log(finalResponse);
      
      return finalResponse.choices[0].message.content;
    }
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI Chat Error:", error);
    return `Sorry, I encountered an error: ${error instanceof Error ? error.message : "Unknown error"}`;
  }
}