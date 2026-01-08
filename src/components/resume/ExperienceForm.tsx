import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { WorkExperience } from "@/types/resume";
import { Plus, Trash2, Building, Briefcase } from "lucide-react";

interface ExperienceFormProps {
  experiences: WorkExperience[];
  onChange: (experiences: WorkExperience[]) => void;
}

export const ExperienceForm = ({ experiences, onChange }: ExperienceFormProps) => {
  const addExperience = () => {
    const newExp: WorkExperience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: [""],
    };
    onChange([...experiences, newExp]);
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    onChange(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const removeExperience = (id: string) => {
    onChange(experiences.filter((exp) => exp.id !== id));
  };

  const updateDescription = (id: string, descIndex: number, value: string) => {
    onChange(
      experiences.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              description: exp.description.map((d, i) =>
                i === descIndex ? value : d
              ),
            }
          : exp
      )
    );
  };

  const addDescriptionPoint = (id: string) => {
    onChange(
      experiences.map((exp) =>
        exp.id === id
          ? { ...exp, description: [...exp.description, ""] }
          : exp
      )
    );
  };

  const removeDescriptionPoint = (id: string, descIndex: number) => {
    onChange(
      experiences.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              description: exp.description.filter((_, i) => i !== descIndex),
            }
          : exp
      )
    );
  };

  return (
    <div className="form-section">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Work Experience
        </h2>
        <p className="text-muted-foreground">
          Add your work history in reverse chronological order (most recent first)
        </p>
      </div>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <Card key={exp.id} className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Experience {index + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeExperience(exp.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-primary" />
                      Company Name
                    </Label>
                    <Input
                      placeholder="Acme Corporation"
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(exp.id, "company", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      Position
                    </Label>
                    <Input
                      placeholder="Software Engineer"
                      value={exp.position}
                      onChange={(e) =>
                        updateExperience(exp.id, "position", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) =>
                        updateExperience(exp.id, "startDate", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={exp.endDate}
                      disabled={exp.current}
                      onChange={(e) =>
                        updateExperience(exp.id, "endDate", e.target.value)
                      }
                    />
                    <div className="flex items-center gap-2 mt-2">
                      <Checkbox
                        id={`current-${exp.id}`}
                        checked={exp.current}
                        onCheckedChange={(checked) =>
                          updateExperience(exp.id, "current", checked)
                        }
                      />
                      <Label
                        htmlFor={`current-${exp.id}`}
                        className="text-sm cursor-pointer"
                      >
                        Currently working here
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Key Responsibilities & Achievements</Label>
                  {exp.description.map((desc, descIndex) => (
                    <div key={descIndex} className="flex gap-2">
                      <Textarea
                        placeholder="Developed and maintained web applications using React and Node.js, improving performance by 40%"
                        value={desc}
                        onChange={(e) =>
                          updateDescription(exp.id, descIndex, e.target.value)
                        }
                        className="min-h-[60px]"
                      />
                      {exp.description.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            removeDescriptionPoint(exp.id, descIndex)
                          }
                          className="shrink-0 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addDescriptionPoint(exp.id)}
                    className="mt-2"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Bullet Point
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addExperience}
          className="w-full h-14 border-dashed"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Work Experience
        </Button>

        {experiences.length === 0 && (
          <p className="text-center text-muted-foreground text-sm">
            No work experience added. This section is optional for freshers.
          </p>
        )}
      </div>
    </div>
  );
};
