import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Database, Mail, FileUp, Shield, Gauge, Bell, CreditCard, FileText, User, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Documentation | DevstackBackend",
  description: "Complete guide to using DevstackBackend",
};

const services = [
  {
    icon: Lock,
    title: "Authentication",
    description: "JWT-based authentication with signup and signin",
    href: "/docs/authentication",
  },
  {
    icon: User,
    title: "Profile Management",
    description: "Secure user profile management with JWT protection",
    href: "/docs/profile",
  },
  {
    icon: Database,
    title: "Database CRUD",
    description: "Auto-generated RESTful APIs for your models",
    href: "/docs/database",
  },
  {
    icon: Mail,
    title: "Email Services",
    description: "OTP verification and transactional emails",
    href: "/docs/email",
  },
  {
    icon: FileUp,
    title: "File Upload",
    description: "Secure file handling with validation",
    href: "/docs/file-upload",
  },
  {
    icon: Shield,
    title: "Rate Limiting",
    description: "Protect your APIs from abuse",
    href: "/docs/rate-limiting",
  },
  {
    icon: Gauge,
    title: "Caching",
    description: "In-memory caching with TTL and LRU",
    href: "/docs/caching",
  },
  {
    icon: Bell,
    title: "Push Notifications",
    description: "Web Push API with VAPID authentication",
    href: "/docs/push-notifications",
  },
  {
    icon: CreditCard,
    title: "Payment Integration",
    description: "Stripe and Razorpay support",
    href: "/docs/payments",
  },
  {
    icon: FileText,
    title: "Logging",
    description: "Comprehensive request and error logging",
    href: "/docs/logging",
  },
];

export default function DocsPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Documentation</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Welcome to DevstackBackend documentation. Learn how to integrate 11+ production-ready services into your Node.js application.
        </p>
        
        <div className="bg-muted/50 border border-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3">Quick Start</h2>
          <p className="text-muted-foreground mb-4">
            Get started in less than 5 minutes:
          </p>
          <pre className="bg-background p-4 rounded-lg mb-4 overflow-x-auto">
            <code className="text-sm">npm install devstackbackend</code>
          </pre>
          <Button asChild>
            <Link href="/docs/installation">
              View Installation Guide
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Available Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <Link key={service.href} href={service.href}>
              <Card className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg h-full">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                      <service.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Need Help?</h2>
        <p className="text-muted-foreground mb-4">
          Join our community or check out examples to see DevstackBackend in action.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/examples">View Examples</Link>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://github.com/yourusername/devstackbackend" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
