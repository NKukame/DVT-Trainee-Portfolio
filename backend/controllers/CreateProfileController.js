import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createProfileController(req, res){
  console.log("createProfileController called");

  const titleMap = {
  "Mr": "MR",
  "Mrs": "MRS",
  "Ms": "MS",
  "Dr": "DR"
};

const roleMap = {
  "Developer": "DEVELOPER",
  "Designer": "DESIGNER",
  "Project Manager": "PROJECT_MANAGER",
  "Team Lead": "TEAM_LEAD",
  "Senior Developer": "SENIOR_DEVELOPER"
};
const departmentMap = {
  "Engineering": "ENGINEERING",
  "Design": "DESIGN",
  "Marketing": "MARKETING",
  "Sales": "SALES",
  "HR": "HR"
};
  try{
    const { basicInfo, skills, career, testimonials, links, status } = req.body;

    console.log(req.body);
    

    const employee = await prisma.employee.create({
      data: {
        title: basicInfo.title || "MR",
        name: basicInfo.firstName,
        birthday: basicInfo.birthday,
        surname: basicInfo.lastName,
        bio: basicInfo.introductionDescription,
        role: roleMap[basicInfo.role] || "DEVELOPER",
        location: basicInfo.location,
        email: basicInfo.email,
        phone: basicInfo.phone,
        github: links.github,
        linkedIn: links.linkedin,
        portfolio: links.portfolio,
        department: departmentMap[career.department] || "ENGINEERING",
        company: career.careerEntries && career.careerEntries[0]?.company ? career.careerEntries[0].company : "",
      },
    });

    return res.status(201).json({ message: "Profile created", employeeId: employee.id });
  }catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create profile" });
  }
  
  
}
