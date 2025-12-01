"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, Database, Mail, FileUp, Shield, Gauge, Bell, CreditCard, FileText, User, Server } from "lucide-react";

const docLinks = [
  {
    title: "Getting Started",
    items: [
      { href: "/docs", label: "Introduction", icon: Server },
      { href: "/docs/installation", label: "Installation", icon: null },
    ],
  },
  {
    title: "Core Services",
    items: [
      { href: "/docs/authentication", label: "Authentication", icon: Lock },
      { href: "/docs/profile", label: "Profile Management", icon: User },
      { href: "/docs/database", label: "Database CRUD", icon: Database },
    ],
  },
  {
    title: "Communication",
    items: [
      { href: "/docs/email", label: "Email Services", icon: Mail },
      { href: "/docs/push-notifications", label: "Push Notifications", icon: Bell },
    ],
  },
  {
    title: "File & Media",
    items: [
      { href: "/docs/file-upload", label: "File Upload", icon: FileUp },
    ],
  },
  {
    title: "Performance & Security",
    items: [
      { href: "/docs/rate-limiting", label: "Rate Limiting", icon: Shield },
      { href: "/docs/caching", label: "Caching", icon: Gauge },
      { href: "/docs/logging", label: "Logging", icon: FileText },
    ],
  },
  {
    title: "Payments",
    items: [
      { href: "/docs/payments", label: "Payment Integration", icon: CreditCard },
    ],
  },
];

export default function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
      <div className="space-y-6">
        {docLinks.map((section) => (
          <div key={section.title}>
            <h3 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wider">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        pathname === item.href
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
