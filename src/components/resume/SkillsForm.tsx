import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Code, Users } from "lucide-react";

interface SkillsFormProps {
  careerObjective: string;
  skills: {
    technical: string[];
    soft: string[];
  };
  onCareerObjectiveChange: (value: string) => void;
  onSkillsChange: (skills: { technical: string[]; soft: string[] }) => void;
}

export const SkillsForm = ({
  careerObjective,
  skills,
  onCareerObjectiveChange,
  onSkillsChange,
}: SkillsFormProps) => {
  const [technicalInput, setTechnicalInput] = useState("");
  const [softInput, setSoftInput] = useState("");

  const addSkill = (type: "technical" | "soft") => {
    const input = type === "technical" ? technicalInput : softInput;
    if (input.trim()) {
      const newSkills = {
        ...skills,
        [type]: [...skills[type], input.trim()],
      };
      onSkillsChange(newSkills);
      if (type === "technical") {
        setTechnicalInput("");
      } else {
        setSoftInput("");
      }
    }
  };

  const removeSkill = (type: "technical" | "soft", index: number) => {
    const newSkills = {
      ...skills,
      [type]: skills[type].filter((_, i) => i !== index),
    };
    onSkillsChange(newSkills);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent,
    type: "technical" | "soft"
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(type);
    }
  };

  return (
    <div className="form-section">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Career Objective & Skills
        </h2>
        <p className="text-muted-foreground">
          Define your career goals and showcase your abilities
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="objective">Career Objective *</Label>
          <Textarea
            id="objective"
            placeholder="A motivated and detail-oriented software developer seeking to leverage 2+ years of experience in full-stack development to contribute to innovative projects and drive business growth..."
            value={careerObjective}
            onChange={(e) => onCareerObjectiveChange(e.target.value)}
            className="min-h-[120px] resize-none"
          />
          <p className="text-xs text-muted-foreground">
            2-3 sentences highlighting your goals and what you bring to the
            role
          </p>
        </div>

        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <Code className="w-4 h-4 text-primary" />
            Technical Skills
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add a skill (e.g., JavaScript, React, Python)"
              value={technicalInput}
              onChange={(e) => setTechnicalInput(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, "technical")}
              className="h-11"
            />
            <Button
              type="button"
              onClick={() => addSkill("technical")}
              size="icon"
              className="h-11 w-11 shrink-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 min-h-[40px]">
            {skills.technical.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-3 py-1.5 text-sm flex items-center gap-1.5"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill("technical", index)}
                  className="hover:text-destructive transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            {skills.technical.length === 0 && (
              <span className="text-muted-foreground text-sm">
                No technical skills added yet
              </span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Soft Skills
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add a skill (e.g., Leadership, Communication)"
              value={softInput}
              onChange={(e) => setSoftInput(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, "soft")}
              className="h-11"
            />
            <Button
              type="button"
              onClick={() => addSkill("soft")}
              size="icon"
              className="h-11 w-11 shrink-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 min-h-[40px]">
            {skills.soft.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-3 py-1.5 text-sm flex items-center gap-1.5"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill("soft", index)}
                  className="hover:text-destructive transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            {skills.soft.length === 0 && (
              <span className="text-muted-foreground text-sm">
                No soft skills added yet
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
