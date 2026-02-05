import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, MessageCircle, ArrowLeft, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "therapy",
    title: "Therapy",
    description: "Licensed clinical therapy for mental health treatment",
    icon: Heart,
  },
  {
    id: "support-sessions",
    title: "Support Sessions",
    description: "Structured guidance for goals and life transitions",
    icon: MessageCircle,
  },
];

const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming"
];

const seekingCareOptions = [
  { value: "veteran", label: "Veteran" },
  { value: "active-duty", label: "Active Duty Service Member" },
  { value: "family", label: "Family Member" },
  { value: "partner", label: "Spouse/Partner" },
];

const GetStarted = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get("service");
  
  const [step, setStep] = useState(preselectedService ? 2 : 1);
  const [selectedService, setSelectedService] = useState<string | null>(preselectedService);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    seekingCare: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleServiceSelect = (serviceId: string) => {
    if (serviceId === "therapy") {
      window.open("https://client.valorwell.org", "_blank");
      return;
    }
    setSelectedService(serviceId);
    setStep(2);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI only - no actual submission
    setSubmitted(true);
  };

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.state &&
    formData.seekingCare;

  if (submitted) {
    return (
      <Layout>
        <section className="section-padding hero-gradient">
          <div className="container-narrow text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Thank You!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              We've received your information and will be in touch soon to help
              you get started with {services.find((s) => s.id === selectedService)?.title}.
            </p>
            <Button asChild variant="outline">
              <Link to="/">Return Home</Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO 
        title="Get Started"
        description="Begin your mental health journey with ValorWell. Choose therapy or support sessions designed for veterans and military families. CHAMPVA accepted."
        canonical="/get-started"
      />
      <section className="section-padding hero-gradient">
        <div className="container-narrow">
          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Get Started
                </h1>
                <p className="text-lg text-muted-foreground">
                  Choose the type of support that best fits your needs.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {services.map((service) => (
                  <Card
                    key={service.id}
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1",
                      selectedService === service.id && "ring-2 ring-primary"
                    )}
                    onClick={() => handleServiceSelect(service.id)}
                  >
                    <CardHeader className="text-center">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <service.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Information Form */}
          {step === 2 && (
            <div className="animate-fade-in max-w-xl mx-auto">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to service selection
              </button>

              <Card>
                <CardHeader>
                  <CardTitle>Tell Us About Yourself</CardTitle>
                  <CardDescription>
                    This information helps us connect you with the right support for{" "}
                    {services.find((s) => s.id === selectedService)?.title}.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (optional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Select
                        value={formData.state}
                        onValueChange={(value) =>
                          handleInputChange("state", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="seekingCare">Who is seeking care? *</Label>
                      <Select
                        value={formData.seekingCare}
                        onValueChange={(value) =>
                          handleInputChange("seekingCare", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {seekingCareOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={!isFormValid}
                    >
                      Submit
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default GetStarted;
