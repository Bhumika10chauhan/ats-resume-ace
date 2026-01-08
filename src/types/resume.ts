export interface PersonalInfo {
  fullName: string;
  phone: string;
  email: string;
  linkedin: string;
  portfolio: string;
  targetRole: string;
  experienceLevel: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  link: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  careerObjective: string;
  skills: {
    technical: string[];
    soft: string[];
  };
  workExperience: WorkExperience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
}
