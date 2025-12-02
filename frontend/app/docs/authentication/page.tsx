
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, CheckCircle, AlertCircle } from "lucide-react";
import CodeBlock from "@/components/Docs/CodeBlock";

export const metadata = {
  title: "Authentication | DevstackBackend Docs",
  description: "Implement secure JWT authentication with signup and signin",
};

export default function AuthenticationPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Authentication</h1>
            <p className="text-muted-foreground">Secure JWT-based authentication</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge>Core Service</Badge>
          <Badge variant="outline">JWT</Badge>
          <Badge variant="outline">Bcrypt</Badge>
        </div>
      </div>

      {/* Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <p className="text-muted-foreground mb-4">
          The Authentication service provides secure user signup and signin with JWT token generation, 
          bcrypt password hashing, and email validation. It&apos;s production-ready with built-in security best practices.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>JWT tokens with 1-day expiry</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Bcrypt password hashing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Email uniqueness validation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Zod schema validation</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Security</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Passwords are hashed using bcrypt with automatic salt generation. 
              JWT tokens are signed with your secret key and include user information 
              for stateless authentication.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Setup */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Setup</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">1. Environment Variables</h3>
            <p className="text-muted-foreground mb-3">
              Add the following to your <code className="bg-muted px-2 py-1 rounded text-sm">.env</code> file:
            </p>
            <CodeBlock
              language="bash"
              code={`# Database
MONGO_URI=mongodb://localhost:27017/myapp

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production`}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">2. Initialize Service</h3>
            <CodeBlock
              language="javascript"
              code={`import { startServer, startSignup, startSignin } from "devstackbackend";

// Start server
const { app } = await startServer({
  mongoUri: process.env.MONGO_URI,
  port: 3000
});

// Initialize authentication
startSignup(app, process.env.JWT_SECRET);
startSignin(app, process.env.JWT_SECRET);

console.log("Authentication endpoints ready!");`}
            />
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">API Endpoints</h2>

        <div className="space-y-6">
          {/* Signup Endpoint */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Badge className="font-mono">POST</Badge>
                <code className="text-base font-normal">/signup</code>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Request Body</h4>
                <CodeBlock
                  language="json"
                  code={`{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123"
}`}
                />
              </div>

              <div>
                <h4 className="font-semibold mb-2">Response (200 OK)</h4>
                <CodeBlock
                  language="json"
                  code={`{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}`}
                />
              </div>

              <div>
                <h4 className="font-semibold mb-2">Error Responses</h4>
                <CodeBlock
                  language="json"
                  code={`// 400 Bad Request - Validation Error
{
  "error": "Validation Error",
  "message": "Invalid email format"
}

// 400 Bad Request - Email Exists
{
  "error": "Email already exists"
}`}
                />
              </div>
            </CardContent>
          </Card>

          {/* Signin Endpoint */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Badge className="font-mono">POST</Badge>
                <code className="text-base font-normal">/signin</code>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Request Body</h4>
                <CodeBlock
                  language="json"
                  code={`{
  "email": "john@example.com",
  "password": "secure123"
}`}
                />
              </div>

              <div>
                <h4 className="font-semibold mb-2">Response (200 OK)</h4>
                <CodeBlock
                  language="json"
                  code={`{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}`}
                />
              </div>

              <div>
                <h4 className="font-semibold mb-2">Error Responses</h4>
                <CodeBlock
                  language="json"
                  code={`// 401 Unauthorized - Invalid Credentials
{
  "error": "Invalid email or password"
}

// 404 Not Found - User Not Found
{
  "error": "User not found"
}`}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Frontend Integration */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Frontend Integration</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Sign Up</h3>
            <CodeBlock
              language="javascript"
              code={`async function signup(name, email, password) {
  try {
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const { token, user } = await response.json();
    
    // Store token (localStorage, cookie, etc.)
    localStorage.setItem("authToken", token);
    
    return { token, user };
  } catch (error) {
    console.error("Signup failed:", error.message);
    throw error;
  }
}`}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Sign In</h3>
            <CodeBlock
              language="javascript"
              code={`async function signin(email, password) {
  try {
    const response = await fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const { token, user } = await response.json();
    
    // Store token
    localStorage.setItem("authToken", token);
    
    return { token, user };
  } catch (error) {
    console.error("Signin failed:", error.message);
    throw error;
  }
}`}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">React Example</h3>
            <CodeBlock
              language="jsx"
              code={`import { useState } from "react";

function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // Store token and redirect
      localStorage.setItem("authToken", data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}`}
            />
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Best Practices</h2>
        
        <div className="space-y-4">
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Use strong JWT secrets</h4>
                  <p className="text-sm text-muted-foreground">
                    Generate a strong random secret for production: <code className="bg-muted px-2 py-1 rounded">openssl rand -base64 32</code>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Store tokens securely</h4>
                  <p className="text-sm text-muted-foreground">
                    Use httpOnly cookies in production or secure storage mechanisms. Avoid localStorage for sensitive apps.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Implement password policies</h4>
                  <p className="text-sm text-muted-foreground">
                    Add frontend validation for password strength (min 8 chars, uppercase, numbers, special chars).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Never expose JWT secret</h4>
                  <p className="text-sm text-muted-foreground">
                    Keep your JWT_SECRET in environment variables and never commit it to version control.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Data Model */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">User Data Model</h2>
        <CodeBlock
          language="javascript"
          code={`{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "John Doe",
  email: "john@example.com",
  password: "$2b$10$rK8qTX...", // Hashed with bcrypt
  createdAt: "2025-12-02T01:30:00.000Z",
  updatedAt: "2025-12-02T01:30:00.000Z"
}`}
        />
      </section>

      {/* Next Steps */}
      <section>
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Now that you have authentication set up, you can:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary">→</span>
                <a href="/docs/profile" className="text-primary hover:underline">
                  Add Profile Management to let users update their information
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">→</span>
                <a href="/docs/email" className="text-primary hover:underline">
                  Implement Email OTP for verification
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">→</span>
                <a href="/docs/database" className="text-primary hover:underline">
                  Create protected CRUD endpoints with Database Service
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
