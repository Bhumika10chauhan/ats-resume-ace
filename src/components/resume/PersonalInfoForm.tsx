import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PersonalInfo } from "@/types/resume";
import { User, Phone, Mail, Linkedin, Globe, Briefcase } from "lucide-react";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export const PersonalInfoForm = ({ data, onChange }: PersonalInfoFormProps) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="form-section">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Personal Information</h2>
        <p className="text-muted-foreground">Enter your basic contact details</p>
      </div>

      <div className="grid gap-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Full Name *
            </Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={data.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              Phone Number *
            </Label>
            <Input
              id="phone"
              placeholder="+1 (555) 123-4567"
              value={data.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="h-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@email.com"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="h-11"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="linkedin" className="flex items-center gap-2">
              <Linkedin className="w-4 h-4 text-primary" />
              LinkedIn (Optional)
            </Label>
            <Input
              id="linkedin"
              placeholder="linkedin.com/in/johndoe"
              value={data.linkedin}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolio" className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              Portfolio (Optional)
            </Label>
            <Input
              id="portfolio"
              placeholder="johndoe.com"
              value={data.portfolio}
              onChange={(e) => handleChange("portfolio", e.target.value)}
              className="h-11"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="targetRole" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary" />
              Target Job Role *
            </Label>
            <Input
              id="targetRole"
              placeholder="Software Engineer"
              value={data.targetRole}
              onChange={(e) => handleChange("targetRole", e.target.value)}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experienceLevel" className="flex items-center gap-2">
              Experience Level *
            </Label>
            <Select
              value={data.experienceLevel}
              onValueChange={(value) => handleChange("experienceLevel", value)}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fresher">Fresher</SelectItem>
                <SelectItem value="1-2">1-2 Years</SelectItem>
                <SelectItem value="3-5">3-5 Years</SelectItem>
                <SelectItem value="5-10">5-10 Years</SelectItem>
                <SelectItem value="10+">10+ Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
