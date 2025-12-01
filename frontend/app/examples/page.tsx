import CodeBlock from "@/components/Docs/CodeBlock";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Examples | DevstackBackend",
  description: "Complete code examples and use cases",
};

export default function ExamplesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Examples</h1>
          <p className="text-lg text-muted-foreground">
            Real-world examples and use cases to get you started quickly.
          </p>
        </div>

        <Tabs defaultValue="complete" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="complete">Complete App</TabsTrigger>
            <TabsTrigger value="auth">Auth Flow</TabsTrigger>
            <TabsTrigger value="crud">CRUD API</TabsTrigger>
            <TabsTrigger value="realtime">Real-time</TabsTrigger>
          </TabsList>

          {/* Complete App */}
          <TabsContent value="complete" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Complete Backend Application</CardTitle>
                <CardDescription>
                  A full-featured backend with auth, database, email, and file uploads
                </CardDescription>
                <div className="flex gap-2 mt-2">
                  <Badge>Authentication</Badge>
                  <Badge>Database</Badge>
                  <Badge>Email</Badge>
                  <Badge>File Upload</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock
                  language="javascript"
                  filename="server.js"
                  code={`import {
  startServer,
  startSignup,
  startSignin,
  ProfileService,
  DatabaseService,
  EmailOtpService,
  FileUploadService,
  RateLimitService,
  CacheService,
  LoggingService
} from "devstackbackend";

// Initialize server
const { app } = await startServer({
  mongoUri: process.env.MONGO_URI,
  port: 3000
});

// Enable logging (recommended first)
LoggingService(app, {
  logRequests: true,
  logErrors: true,
  logToFile: true
});

// Enable rate limiting
RateLimitService(app, {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100
});

// Enable caching
const cacheService = CacheService(app, {
  defaultTTL: 3600000, // 1 hour
  maxSize: 1000
});

// Authentication
startSignup(app, process.env.JWT_SECRET);
startSignin(app, process.env.JWT_SECRET);
ProfileService(app, { jwtSecret: process.env.JWT_SECRET });

// Email OTP
EmailOtpService(app, {
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  otpExpiry: 5,
  resendCooldown: 60
});

// File uploads
FileUploadService(app, {
  uploadDir: "./uploads",
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedExtensions: [".jpg", ".png", ".pdf"]
});

// Database CRUD
const dbService = DatabaseService(app, {
  basePath: "/api",
  enableAutoId: true
});

// Register models
dbService.registerModel("Product", {
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  category: String,
  images: [String],
  inStock: { type: Boolean, default: true }
});

dbService.registerModel("Order", {
  userId: { type: String, required: true },
  products: [{ productId: String, quantity: Number }],
  total: Number,
  status: { type: String, default: "pending" }
});

// Custom cached endpoint
app.get("/api/stats", cacheService.middleware(300000), async (req, res) => {
  // Expensive calculation - cached for 5 minutes
  const Product = dbService.getModel("Product");
  const stats = {
    totalProducts: await Product.countDocuments(),
    categories: await Product.distinct("category")
  };
  res.json(stats);
});

console.log("✅ Server running on http://localhost:3000");
console.log("✅ All services enabled");`}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Auth Flow */}
          <TabsContent value="auth" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Complete Authentication Flow</CardTitle>
                <CardDescription>
                  Signup, signin, email verification, and profile management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Backend Setup</h3>
                  <CodeBlock
                    language="javascript"
                    code={`import {
  startServer,
  startSignup,
  startSignin,
  ProfileService,
  EmailOtpService
} from "devstackbackend";

const { app } = await startServer({
  mongoUri: process.env.MONGO_URI,
  port: 3000
});

// Auth
startSignup(app, process.env.JWT_SECRET);
startSignin(app, process.env.JWT_SECRET);
ProfileService(app, { jwtSecret: process.env.JWT_SECRET });

// Email verification
EmailOtpService(app, {
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  otpExpiry: 5
});`}
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Frontend: Complete Flow</h3>
                  <CodeBlock
                    language="javascript"
                    code={`// 1. Sign up
async function completeSignup(name, email, password) {
  try {
    // Step 1: Send OTP
    await fetch("/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    
    // Step 2: User enters OTP
    const otp = prompt("Enter OTP sent to your email:");
    
    // Step 3: Verify OTP
    const otpResponse = await fetch("/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp })
    });
    
    if (!otpResponse.ok) {
      throw new Error("Invalid OTP");
    }
    
    // Step 4: Create account
    const signupResponse = await fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    
    const { token, user } = await signupResponse.json();
    localStorage.setItem("authToken", token);
    
    return { token, user };
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
}

// 2. Sign in
async function signin(email, password) {
  const response = await fetch("/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  
  const { token, user } = await response.json();
  localStorage.setItem("authToken", token);
  return { token, user };
}

// 3. Get profile
async function getProfile() {
  const token = localStorage.getItem("authToken");
  const response = await fetch("/me", {
    headers: { "Authorization": \`Bearer \${token}\` }
  });
  return response.json();
}

// 4. Update profile
async function updateProfile(updates) {
  const token = localStorage.getItem("authToken");
  const response = await fetch("/me", {
    method: "PUT",
    headers: {
      "Authorization": \`Bearer \${token}\`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updates)
  });
  return response.json();
}`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CRUD API */}
          <TabsContent value="crud" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Complete CRUD API</CardTitle>
                <CardDescription>
                  Build a full REST API for a blog platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Backend: Define Models</h3>
                  <CodeBlock
                    language="javascript"
                    code={`import { startServer, DatabaseService } from "devstackbackend";

const { app } = await startServer({
  mongoUri: process.env.MONGO_URI,
  port: 3000
});

const dbService = DatabaseService(app, {
  basePath: "/api"
});

// Blog posts model
dbService.registerModel("Post", {
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  tags: [String],
  published: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 }
}, {
  path: "posts"
});

// Comments model
dbService.registerModel("Comment", {
  postId: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  approved: { type: Boolean, default: false }
}, {
  path: "comments"
});

// Now you have these endpoints automatically:
// GET    /api/posts
// GET    /api/posts/:id
// POST   /api/posts
// PUT    /api/posts/:id
// DELETE /api/posts/:id
// POST   /api/bulk/Post
// GET    /api/comments
// POST   /api/comments
// etc...`}
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Frontend: Use the API</h3>
                  <CodeBlock
                    language="javascript"
                    code={`// Create a post
async function createPost(post) {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post)
  });
  return response.json();
}

// Get all posts with filtering
async function getPosts(filters = {}) {
  const params = new URLSearchParams({
    page: filters.page || 1,
    limit: filters.limit || 10,
    sort: filters.sort || "-createdAt",
    ...(filters.author && { author: filters.author }),
    ...(filters.published !== undefined && { published: filters.published })
  });
  
  const response = await fetch(\`/api/posts?\${params}\`);
  return response.json();
}

// Search posts
async function searchPosts(query) {
  const response = await fetch(\`/api/posts?title_like=\${query}\`);
  return response.json();
}

// Update post
async function updatePost(id, updates) {
  const response = await fetch(\`/api/posts/\${id}\`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates)
  });
  return response.json();
}

// Delete post
async function deletePost(id) {
  const response = await fetch(\`/api/posts/\${id}\`, {
    method: "DELETE"
  });
  return response.json();
}

// Bulk operations
async function publishAllDrafts() {
  const response = await fetch("/api/bulk/Post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operation: "update",
      filter: { published: false },
      data: { published: true }
    })
  });
  return response.json();
}`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Real-time */}
          <TabsContent value="realtime" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Real-time Notifications</CardTitle>
                <CardDescription>
                  Implement push notifications for your app
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Backend Setup</h3>
                  <CodeBlock
                    language="javascript"
                    code={`import { startServer, PushNotificationService } from "devstackbackend";

const { app } = await startServer({
  mongoUri: process.env.MONGO_URI,
  port: 3000
});

// Initialize push notifications
const pushService = PushNotificationService({
  app,
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
  email: "mailto:admin@example.com"
});

// Send notification when new order is created
app.post("/api/orders", async (req, res) => {
  const order = await createOrder(req.body);
  
  // Send push notification
  await pushService.sendAll({
    title: "New Order!",
    body: \`Order #\${order.id} has been placed\`
  });
  
  res.json(order);
});`}
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Frontend: Service Worker</h3>
                  <CodeBlock
                    language="javascript"
                    filename="sw.js"
                    code={`// Service Worker
self.addEventListener('push', function(event) {
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: '/icon.png',
    badge: '/badge.png',
    vibrate: [200, 100, 200]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});`}
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Frontend: Subscribe</h3>
                  <CodeBlock
                    language="javascript"
                    code={`// Request permission and subscribe
async function subscribeToPush() {
  // Register service worker
  const registration = await navigator.serviceWorker.register('/sw.js');
  await navigator.serviceWorker.ready;
  
  // Request notification permission
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    throw new Error('Permission denied');
  }
  
  // Subscribe to push
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: VAPID_PUBLIC_KEY
  });
  
  // Send subscription to backend
  await fetch('/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscription)
  });
  
  console.log('Subscribed to push notifications!');
}

// Call on page load
subscribeToPush().catch(console.error);`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
