import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/resume/StepIndicator";
import { PersonalInfoForm } from "@/components/resume/PersonalInfoForm";
import { SkillsForm } from "@/components/resume/SkillsForm";
import { ExperienceForm } from "@/components/resume/ExperienceForm";
import { ProjectsForm } from "@/components/resume/ProjectsForm";
import { EducationForm } from "@/components/resume/EducationForm";
import { CertificationsForm } from "@/components/resume/CertificationsForm";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { ResumeData } from "@/types/resume";
import {
  User,
  Lightbulb,
  Briefcase,
  Folder,
  GraduationCap,
  Award,
  ChevronLeft,
  ChevronRight,
  FileText,
  Sparkles,
} from "lucide-react";

const initialData: ResumeData = {
  personalInfo: {
    fullName: "",
    phone: "",
    email: "",
    linkedin: "",
    portfolio: "",
    targetRole: "",
    experienceLevel: "",
  },
  careerObjective: "",
  skills: {
    technical: [],
    soft: [],
  },
  workExperience: [],
  projects: [],
  education: [],
  certifications: [],
};

const steps = [
  { id: 1, title: "Personal", icon: <User className="w-4 h-4" /> },
  { id: 2, title: "Skills", icon: <Lightbulb className="w-4 h-4" /> },
  { id: 3, title: "Experience", icon: <Briefcase className="w-4 h-4" /> },
  { id: 4, title: "Projects", icon: <Folder className="w-4 h-4" /> },
  { id: 5, title: "Education", icon: <GraduationCap className="w-4 h-4" /> },
  { id: 6, title: "Certificates", icon: <Award className="w-4 h-4" /> },
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [showPreview, setShowPreview] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onChange={(data) =>
              setResumeData({ ...resumeData, personalInfo: data })
            }
          />
        );
      case 2:
        return (
          <SkillsForm
            careerObjective={resumeData.careerObjective}
            skills={resumeData.skills}
            onCareerObjectiveChange={(value) =>
              setResumeData({ ...resumeData, careerObjective: value })
            }
            onSkillsChange={(skills) =>
              setResumeData({ ...resumeData, skills })
            }
          />
        );
      case 3:
        return (
          <ExperienceForm
            experiences={resumeData.workExperience}
            onChange={(experiences) =>
              setResumeData({ ...resumeData, workExperience: experiences })
            }
          />
        );
      case 4:
        return (
          <ProjectsForm
            projects={resumeData.projects}
            onChange={(projects) =>
              setResumeData({ ...resumeData, projects })
            }
          />
        );
      case 5:
        return (
          <EducationForm
            education={resumeData.education}
            onChange={(education) =>
              setResumeData({ ...resumeData, education })
            }
          />
        );
      case 6:
        return (
          <CertificationsForm
            certifications={resumeData.certifications}
            onChange={(certifications) =>
              setResumeData({ ...resumeData, certifications })
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-foreground">ResumeAI</h1>
                <p className="text-xs text-muted-foreground">
                  ATS-Optimized Resume Builder
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? "Edit" : "Preview"}
              </Button>
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>100% ATS Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
          {/* Form Section */}
          <div
            className={`flex flex-col bg-card rounded-2xl shadow-elegant overflow-hidden ${
              showPreview ? "hidden lg:flex" : "flex"
            }`}
          >
            {/* Step Indicator */}
            <div className="p-6 border-b bg-muted/30">
              <StepIndicator steps={steps} currentStep={currentStep} />
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-auto p-6">{renderForm()}</div>

            {/* Navigation */}
            <div className="p-6 border-t bg-muted/30">
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={currentStep === steps.length}
                  className="gap-2 gradient-primary"
                >
                  {currentStep === steps.length ? "Finish" : "Next"}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div
            className={`bg-card rounded-2xl shadow-elegant overflow-hidden ${
              showPreview ? "flex" : "hidden lg:flex"
            } flex-col`}
          >
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
