import { Database, Lock, HardDrive, Zap, Code, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Database,
    title: "PostgreSQL Database",
    description: "Powerful relational database with real-time subscriptions and automatic backups.",
  },
  {
    icon: Lock,
    title: "Authentication",
    description: "Built-in auth with social providers, magic links, and JWT tokens out of the box.",
  },
  {
    icon: HardDrive,
    title: "File Storage",
    description: "Scalable object storage with CDN integration for fast global delivery.",
  },
  {
    icon: Zap,
    title: "Serverless Functions",
    description: "Deploy backend logic instantly with auto-scaling serverless compute.",
  },
  {
    icon: Code,
    title: "REST & GraphQL APIs",
    description: "Auto-generated APIs with full TypeScript support and OpenAPI specs.",
  },
  {
    icon: Globe,
    title: "Edge Network",
    description: "Global edge deployment for ultra-low latency from anywhere in the world.",
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
            A complete backend platform that scales from prototype to production without the complexity.
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
