import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Project } from "@/types/resume";
import { Plus, Trash2, Folder, Link, Wrench } from "lucide-react";

interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export const ProjectsForm = ({ projects, onChange }: ProjectsFormProps) => {
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: "",
      description: "",
      technologies: "",
      link: "",
    };
    onChange([...projects, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange(
      projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      )
    );
  };

  const removeProject = (id: string) => {
    onChange(projects.filter((project) => project.id !== id));
  };

  return (
    <div className="form-section">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Projects</h2>
        <p className="text-muted-foreground">
          Showcase your best work with project details and links
        </p>
      </div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <Card key={project.id} className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Project {index + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeProject(project.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Folder className="w-4 h-4 text-accent" />
                    Project Title
                  </Label>
                  <Input
                    placeholder="E-commerce Platform"
                    value={project.title}
                    onChange={(e) =>
                      updateProject(project.id, "title", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Built a full-stack e-commerce platform with user authentication, product catalog, shopping cart, and payment integration. Reduced checkout time by 30% through optimized UX."
                    value={project.description}
                    onChange={(e) =>
                      updateProject(project.id, "description", e.target.value)
                    }
                    className="min-h-[100px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    Include: problem solved, your solution, and measurable outcome
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-accent" />
                    Technologies Used
                  </Label>
                  <Input
                    placeholder="React, Node.js, PostgreSQL, Stripe, AWS"
                    value={project.technologies}
                    onChange={(e) =>
                      updateProject(project.id, "technologies", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Link className="w-4 h-4 text-accent" />
                    Project Link (GitHub / Live / Drive)
                  </Label>
                  <Input
                    placeholder="https://github.com/username/project"
                    value={project.link}
                    onChange={(e) =>
                      updateProject(project.id, "link", e.target.value)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addProject}
          className="w-full h-14 border-dashed"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Project
        </Button>

        {projects.length === 0 && (
          <p className="text-center text-muted-foreground text-sm">
            No projects added. Projects help showcase your practical skills.
          </p>
        )}
      </div>
    </div>
  );
};
