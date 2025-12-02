import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Pricing | DevstackBackend",
  description: "Choose the right plan for your project",
};

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for developers and prototypes",
    features: [
      "All 11+ services included",
      "Unlimited API endpoints",
      "JWT authentication",
      "Email services (OTP + General)",
      "File uploads",
      "Rate limiting",
      "Caching",
      "Community support",
      "MIT License",
      "Full source code access",
    ],
  },
  {
    name: "Pro Support",
    price: "$49",
    description: "For production applications",
    features: [
      "Everything in Free",
      "Priority email support",
      "Private Discord channel",
      "Custom integrations help",
      "Code review assistance",
      "Performance optimization tips",
      "Monthly 1-on-1 call",
      "Early access to new features",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale deployments",
    features: [
      "Everything in Pro",
      "Custom feature development",
      "On-premise deployment support",
      "SLA guarantee (99.9% uptime)",
      "24/7 premium support",
      "Dedicated account manager",
      "Training for your team",
      "White-label options",
      "Compliance certifications",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Open source and forever free. Optional support plans for teams who need extra help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-border bg-card ${
                plan.popular ? "border-primary shadow-xl scale-105" : ""
              } transition-all duration-300 hover:shadow-lg`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && plan.price !== "$0" && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full"
                  asChild
                >
                  {plan.price === "$0" ? (
                    <Link href="/docs">Get Started Free</Link>
                  ) : plan.price === "Custom" ? (
                    <a href="mailto:support@devstackbackend.com">Contact Sales</a>
                  ) : (
                    <a href="mailto:support@devstackbackend.com">Get Started</a>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="bg-muted/30 rounded-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Is it really free?</h3>
              <p className="text-muted-foreground">
                Yes! DevstackBackend is open source under the MIT license. You can use it for free in any project, commercial or personal.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What&apos;s included in support plans?</h3>
              <p className="text-muted-foreground">
                Support plans give you direct access to the maintainers for help with implementation, troubleshooting, and custom features.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-muted-foreground">
                Yes, all support plans are month-to-month with no long-term commitment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
