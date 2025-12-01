import { Database, Lock, HardDrive, Zap, Code, Globe, Mail, FileUp, Shield, Gauge, Bell, CreditCard } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Lock,
    title: "Authentication",
    description: "Signup/Signin with JWT, bcrypt password hashing, and email uniqueness validation.",
  },
  {
    icon: Database,
    title: "Database CRUD",
    description: "Dynamic model creation with automatic RESTful APIs, pagination, filtering, and sorting.",
  },
  {
    icon: Mail,
    title: "Email Services",
    description: "OTP verification, transactional emails, bulk emails, and template support with Nodemailer.",
  },
  {
    icon: FileUp,
    title: "File Upload",
    description: "Single/multiple file uploads with validation, size limits, and MIME type filtering.",
  },
  {
    icon: Shield,
    title: "Rate Limiting",
    description: "Protect APIs from abuse with configurable rate limits and automatic cleanup.",
  },
  {
    icon: Gauge,
    title: "Cache Service",
    description: "In-memory caching with TTL and LRU eviction for improved performance.",
  },
  {
    icon: Bell,
    title: "Push Notifications",
    description: "Web Push API with VAPID authentication for browser push notifications.",
  },
  {
    icon: CreditCard,
    title: "Payment Integration",
    description: "Unified payment gateway supporting both Stripe and Razorpay.",
  },
  {
    icon: Code,
    title: "Logging Service",
    description: "Comprehensive request/error logging with file output and custom formatters.",
  },
  {
    icon: Zap,
    title: "Express + MongoDB",
    description: "Production-ready server setup with CORS, JSON parsing, and MongoDB connection.",
  },
  {
    icon: Lock,
    title: "Profile Management",
    description: "JWT-protected user profile with secure password updates and data retrieval.",
  },
  {
    icon: Globe,
    title: "Production Ready",
    description: "Built with industry best practices, Zod validation, and comprehensive error handling.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything you need to build
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            11+ production-ready services to accelerate your backend development. No more boilerplate code.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-border bg-gradient-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
