import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Certification } from "@/types/resume";
import { Plus, Trash2, Award, Link } from "lucide-react";

interface CertificationsFormProps {
  certifications: Certification[];
  onChange: (certifications: Certification[]) => void;
}

export const CertificationsForm = ({
  certifications,
  onChange,
}: CertificationsFormProps) => {
  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      date: "",
      link: "",
    };
    onChange([...certifications, newCert]);
  };

  const updateCertification = (
    id: string,
    field: keyof Certification,
    value: string
  ) => {
    onChange(
      certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    );
  };

  const removeCertification = (id: string) => {
    onChange(certifications.filter((cert) => cert.id !== id));
  };

  return (
    <div className="form-section">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Certifications
        </h2>
        <p className="text-muted-foreground">
          Add relevant certifications to boost your credibility (optional)
        </p>
      </div>

      <div className="space-y-6">
        {certifications.map((cert, index) => (
          <Card key={cert.id} className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-warning" />
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Certification {index + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCertification(cert.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-warning" />
                    Certification Name
                  </Label>
                  <Input
                    placeholder="AWS Certified Solutions Architect"
                    value={cert.name}
                    onChange={(e) =>
                      updateCertification(cert.id, "name", e.target.value)
                    }
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Issuing Organization</Label>
                    <Input
                      placeholder="Amazon Web Services"
                      value={cert.issuer}
                      onChange={(e) =>
                        updateCertification(cert.id, "issuer", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Date Obtained</Label>
                    <Input
                      type="month"
                      value={cert.date}
                      onChange={(e) =>
                        updateCertification(cert.id, "date", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Link className="w-4 h-4 text-warning" />
                    Credential Link (Optional)
                  </Label>
                  <Input
                    placeholder="https://www.credly.com/badges/..."
                    value={cert.link}
                    onChange={(e) =>
                      updateCertification(cert.id, "link", e.target.value)
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
          onClick={addCertification}
          className="w-full h-14 border-dashed"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Certification
        </Button>

        {certifications.length === 0 && (
          <p className="text-center text-muted-foreground text-sm">
            No certifications added. This section is optional.
          </p>
        )}
      </div>
    </div>
  );
};
