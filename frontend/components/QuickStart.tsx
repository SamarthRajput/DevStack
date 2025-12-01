import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal } from "lucide-react";

const QuickStart = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get started in minutes
          </h2>
          <p className="text-lg text-muted-foreground">
            Install the package and set up your backend with just a few lines of code
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Terminal className="h-5 w-5 text-primary" />
                1. Install the package
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">npm install devstackbackend</code>
              </pre>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Terminal className="h-5 w-5 text-primary" />
                2. Set up your environment variables
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`MONGO_URI=mongodb://localhost:27017/myapp
JWT_SECRET=your-super-secret-jwt-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password`}
              </pre>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Terminal className="h-5 w-5 text-primary" />
                3. Initialize your server
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`import { startServer, startSignup, startSignin } from "devstackbackend";

const { app } = await startServer({
  mongoUri: process.env.MONGO_URI,
  port: 3000
});

startSignup(app, process.env.JWT_SECRET);
startSignin(app, process.env.JWT_SECRET);`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QuickStart;
