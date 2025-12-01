import CodeBlock from "@/components/Docs/CodeBlock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Installation | DevstackBackend Docs",
  description: "Get started with DevstackBackend in minutes",
};

export default function InstallationPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Installation</h1>
        <p className="text-lg text-muted-foreground">
          Get DevstackBackend up and running in your project in less than 5 minutes.
        </p>
      </div>

      {/* Prerequisites */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Node.js</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <Badge className="mb-2">v16.0.0+</Badge>
              <p className="text-muted-foreground">
                Node.js 16 or higher required
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">MongoDB</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <Badge className="mb-2">v4.0+</Badge>
              <p className="text-muted-foreground">
                Local or cloud MongoDB instance
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">npm/yarn</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <Badge className="mb-2">Latest</Badge>
              <p className="text-muted-foreground">
                Package manager of your choice
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Installation Steps */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Installation Steps</h2>

        <div className="space-y-6">
          {/* Step 1 */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Terminal className="h-5 w-5 text-primary" />
                Step 1: Install the Package
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Install DevstackBackend via npm or yarn:
              </p>
              <CodeBlock
                language="bash"
                code="npm install devstackbackend"
              />
              <p className="text-sm text-muted-foreground">Or with yarn:</p>
              <CodeBlock
                language="bash"
                code="yarn add devstackbackend"
              />
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Terminal className="h-5 w-5 text-primary" />
                Step 2: Create Environment File
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Create a <code className="bg-muted px-2 py-1 rounded">.env</code> file in your project root:
              </p>
              <CodeBlock
                language="bash"
                filename=".env"
                code={`# Database
MONGO_URI=mongodb://localhost:27017/myapp

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Email (for OTP and Email services)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Push Notifications (optional)
VAPID_PUBLIC_KEY=your-vapid-public-key
VAPID_PRIVATE_KEY=your-vapid-private-key

# Payments - Stripe (optional)
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_PUBLIC_KEY=pk_test_your-stripe-public-key

# Payments - Razorpay (optional)
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret`}
              />
              
              <Card className="border-l-4 border-l-yellow-500 bg-yellow-500/5">
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Important</h4>
                      <p className="text-sm text-muted-foreground">
                        Never commit your <code className="bg-muted px-2 py-1 rounded">.env</code> file to version control. 
                        Add it to your <code className="bg-muted px-2 py-1 rounded">.gitignore</code> file.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Terminal className="h-5 w-5 text-primary" />
                Step 3: Initialize Your Server
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Create your main server file (e.g., <code className="bg-muted px-2 py-1 rounded">index.js</code> or <code className="bg-muted px-2 py-1 rounded">server.js</code>):
              </p>
              <CodeBlock
                language="javascript"
                filename="index.js"
                code={`import { startServer, startSignup, startSignin } from "devstackbackend";

// Initialize server with MongoDB
const { app } = await startServer({
  mongoUri: process.env.MONGO_URI,
  port: 3000
});

// Add authentication
startSignup(app, process.env.JWT_SECRET);
startSignin(app, process.env.JWT_SECRET);

console.log("Server running on http://localhost:3000");
console.log("Authentication endpoints:");
console.log("   POST /signup");
console.log("   POST /signin");`}
              />
            </CardContent>
          </Card>

          {/* Step 4 */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Terminal className="h-5 w-5 text-primary" />
                Step 4: Update package.json
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Add ES modules support and start script to your <code className="bg-muted px-2 py-1 rounded">package.json</code>:
              </p>
              <CodeBlock
                language="json"
                filename="package.json"
                code={`{
  "name": "my-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "devstackbackend": "^1.0.17",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}`}
              />
            </CardContent>
          </Card>

          {/* Step 5 */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Terminal className="h-5 w-5 text-primary" />
                Step 5: Start Your Server
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Run your server:
              </p>
              <CodeBlock
                language="bash"
                code="npm start"
              />
              <p className="text-sm text-muted-foreground">Or for development with auto-reload:</p>
              <CodeBlock
                language="bash"
                code="npm run dev"
              />
              
              <Card className="border-l-4 border-l-green-500 bg-green-500/5">
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Success!</h4>
                      <p className="text-sm text-muted-foreground">
                        Your backend is now running with authentication endpoints ready to use.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Test */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Quick Test</h2>
        <p className="text-muted-foreground mb-4">
          Test your authentication endpoint:
        </p>
        <CodeBlock
          language="bash"
          code={`curl -X POST http://localhost:3000/signup \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "secure123"
  }'`}
        />
      </section>

      {/* Service Configuration */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Additional Service Setup</h2>
        <p className="text-muted-foreground mb-4">
          DevstackBackend includes 11+ services. Here's how to enable additional services:
        </p>

        <div className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Email Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                For Gmail, you need an App Password. Follow these steps:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Go to your Google Account settings</li>
                <li>Enable 2-Factor Authentication</li>
                <li>Generate an App Password for "Mail"</li>
                <li>Use the generated password in <code className="bg-muted px-2 py-1 rounded">EMAIL_PASS</code></li>
              </ol>
              <a
                href="https://support.google.com/accounts/answer/185833"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm mt-2 inline-block"
              >
                Learn more about App Passwords →
              </a>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Push Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Generate VAPID keys for push notifications:
              </p>
              <CodeBlock
                language="bash"
                code="npx web-push generate-vapid-keys"
              />
              <p className="text-sm text-muted-foreground mt-3">
                Copy the generated keys to your <code className="bg-muted px-2 py-1 rounded">.env</code> file.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Payment Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Get your API keys from payment providers:
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>Stripe:</strong>{" "}
                  <a
                    href="https://dashboard.stripe.com/apikeys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Get Stripe API keys →
                  </a>
                </li>
                <li>
                  <strong>Razorpay:</strong>{" "}
                  <a
                    href="https://dashboard.razorpay.com/app/keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Get Razorpay API keys →
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Next Steps */}
      <section>
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Now that you have DevstackBackend installed, explore the services:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <a
                href="/docs/authentication"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                → Authentication Setup
              </a>
              <a
                href="/docs/database"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                → Database CRUD
              </a>
              <a
                href="/docs/email"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                → Email Services
              </a>
              <a
                href="/docs/file-upload"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                → File Upload
              </a>
              <a
                href="/examples"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                → View Complete Examples
              </a>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
