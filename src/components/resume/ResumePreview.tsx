import { ResumeData } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { Copy, Download, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResumePreviewProps {
  data: ResumeData;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString + "-01");
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

export const ResumePreview = ({ data }: ResumePreviewProps) => {
  const { toast } = useToast();

  const generatePlainText = () => {
    let text = "";

    // Header
    text += `${data.personalInfo.fullName.toUpperCase()}\n`;
    const contactParts = [
      data.personalInfo.phone,
      data.personalInfo.email,
      data.personalInfo.linkedin,
      data.personalInfo.portfolio,
    ].filter(Boolean);
    text += contactParts.join(" | ") + "\n\n";

    // Career Objective
    if (data.careerObjective) {
      text += "CAREER OBJECTIVE\n";
      text += "-".repeat(40) + "\n";
      text += data.careerObjective + "\n\n";
    }

    // Skills
    if (data.skills.technical.length > 0 || data.skills.soft.length > 0) {
      text += "SKILLS\n";
      text += "-".repeat(40) + "\n";
      if (data.skills.technical.length > 0) {
        text += `Technical: ${data.skills.technical.join(", ")}\n`;
      }
      if (data.skills.soft.length > 0) {
        text += `Soft Skills: ${data.skills.soft.join(", ")}\n`;
      }
      text += "\n";
    }

    // Work Experience
    if (data.workExperience.length > 0) {
      text += "WORK EXPERIENCE\n";
      text += "-".repeat(40) + "\n";
      data.workExperience.forEach((exp) => {
        text += `${exp.position}\n`;
        text += `${exp.company} | ${formatDate(exp.startDate)} - ${
          exp.current ? "Present" : formatDate(exp.endDate)
        }\n`;
        exp.description.forEach((desc) => {
          if (desc.trim()) {
            text += `- ${desc}\n`;
          }
        });
        text += "\n";
      });
    }

    // Projects
    if (data.projects.length > 0) {
      text += "PROJECTS\n";
      text += "-".repeat(40) + "\n";
      data.projects.forEach((project) => {
        text += `${project.title}\n`;
        if (project.technologies) {
          text += `Technologies: ${project.technologies}\n`;
        }
        if (project.description) {
          text += `- ${project.description}\n`;
        }
        if (project.link) {
          text += `Link: ${project.link}\n`;
        }
        text += "\n";
      });
    }

    // Education
    if (data.education.length > 0) {
      text += "EDUCATION\n";
      text += "-".repeat(40) + "\n";
      data.education.forEach((edu) => {
        text += `${edu.degree} in ${edu.field}\n`;
        text += `${edu.institution} | ${formatDate(edu.startDate)} - ${formatDate(
          edu.endDate
        )}`;
        if (edu.gpa) {
          text += ` | GPA: ${edu.gpa}`;
        }
        text += "\n\n";
      });
    }

    // Certifications
    if (data.certifications.length > 0) {
      text += "CERTIFICATIONS\n";
      text += "-".repeat(40) + "\n";
      data.certifications.forEach((cert) => {
        text += `${cert.name} - ${cert.issuer} (${formatDate(cert.date)})\n`;
        if (cert.link) {
          text += `Credential: ${cert.link}\n`;
        }
      });
    }

    return text;
  };

  const handleCopy = async () => {
    const text = generatePlainText();
    await navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "Your ATS-friendly resume has been copied.",
    });
  };

  const handleDownload = () => {
    const text = generatePlainText();
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.personalInfo.fullName || "resume"}_resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded!",
      description: "Your resume has been downloaded as a text file.",
    });
  };

  const hasContent =
    data.personalInfo.fullName ||
    data.careerObjective ||
    data.skills.technical.length > 0 ||
    data.workExperience.length > 0 ||
    data.projects.length > 0 ||
    data.education.length > 0;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Live Preview</h3>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={!hasContent}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          <Button size="sm" onClick={handleDownload} disabled={!hasContent}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 bg-muted/30">
        <div className="resume-preview max-w-[800px] mx-auto min-h-[1000px]">
          {!hasContent ? (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Start filling the form to see your resume preview</p>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Header */}
              <div className="text-center border-b pb-4">
                <h1 className="text-2xl font-bold tracking-wide uppercase text-foreground">
                  {data.personalInfo.fullName || "Your Name"}
                </h1>
                <p className="text-sm text-muted-foreground mt-2">
                  {[
                    data.personalInfo.phone,
                    data.personalInfo.email,
                    data.personalInfo.linkedin,
                    data.personalInfo.portfolio,
                  ]
                    .filter(Boolean)
                    .join(" | ")}
                </p>
              </div>

              {/* Career Objective */}
              {data.careerObjective && (
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-primary border-b border-primary/20 pb-1 mb-2">
                    Career Objective
                  </h2>
                  <p className="text-sm leading-relaxed">{data.careerObjective}</p>
                </div>
              )}

              {/* Skills */}
              {(data.skills.technical.length > 0 ||
                data.skills.soft.length > 0) && (
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-primary border-b border-primary/20 pb-1 mb-2">
                    Skills
                  </h2>
                  {data.skills.technical.length > 0 && (
                    <p className="text-sm mb-1">
                      <span className="font-medium">Technical:</span>{" "}
                      {data.skills.technical.join(", ")}
                    </p>
                  )}
                  {data.skills.soft.length > 0 && (
                    <p className="text-sm">
                      <span className="font-medium">Soft Skills:</span>{" "}
                      {data.skills.soft.join(", ")}
                    </p>
                  )}
                </div>
              )}

              {/* Work Experience */}
              {data.workExperience.length > 0 && (
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-primary border-b border-primary/20 pb-1 mb-2">
                    Work Experience
                  </h2>
                  {data.workExperience.map((exp) => (
                    <div key={exp.id} className="mb-3">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-semibold text-sm">{exp.position}</h3>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(exp.startDate)} -{" "}
                          {exp.current ? "Present" : formatDate(exp.endDate)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground italic">
                        {exp.company}
                      </p>
                      <ul className="mt-1 space-y-0.5">
                        {exp.description.map(
                          (desc, i) =>
                            desc.trim() && (
                              <li key={i} className="text-sm flex">
                                <span className="mr-2">-</span>
                                <span>{desc}</span>
                              </li>
                            )
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Projects */}
              {data.projects.length > 0 && (
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-primary border-b border-primary/20 pb-1 mb-2">
                    Projects
                  </h2>
                  {data.projects.map((project) => (
                    <div key={project.id} className="mb-3">
                      <h3 className="font-semibold text-sm">{project.title}</h3>
                      {project.technologies && (
                        <p className="text-xs text-muted-foreground">
                          Technologies: {project.technologies}
                        </p>
                      )}
                      {project.description && (
                        <p className="text-sm mt-0.5">- {project.description}</p>
                      )}
                      {project.link && (
                        <p className="text-xs text-primary mt-0.5">
                          Link: {project.link}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Education */}
              {data.education.length > 0 && (
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-primary border-b border-primary/20 pb-1 mb-2">
                    Education
                  </h2>
                  {data.education.map((edu) => (
                    <div key={edu.id} className="mb-2">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-semibold text-sm">
                          {edu.degree} {edu.field && `in ${edu.field}`}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {edu.institution}
                        {edu.gpa && ` | GPA: ${edu.gpa}`}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Certifications */}
              {data.certifications.length > 0 && (
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-primary border-b border-primary/20 pb-1 mb-2">
                    Certifications
                  </h2>
                  {data.certifications.map((cert) => (
                    <div key={cert.id} className="mb-1">
                      <p className="text-sm">
                        <span className="font-medium">{cert.name}</span> -{" "}
                        {cert.issuer} ({formatDate(cert.date)})
                      </p>
                      {cert.link && (
                        <p className="text-xs text-primary">
                          Credential: {cert.link}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
