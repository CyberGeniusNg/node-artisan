import express from "express";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import os from "os";

// Load environment variables from multiple possible locations
const loadEnvConfig = () => {
  // Try loading from current working directory first
  const cwdEnvPath = path.join(process.cwd(), '.env');
  // Try loading from user's home directory second
  const homeEnvPath = path.join(os.homedir(), '.node-artisan.env');

  if (fs.existsSync(cwdEnvPath)) {
    dotenv.config({ path: cwdEnvPath });
    console.log('✨ Using .env file from current directory');
  } else if (fs.existsSync(homeEnvPath)) {
    dotenv.config({ path: homeEnvPath });
    console.log('✨ Using .node-artisan.env from home directory');
  } else {
    console.log('ℹ️  No .env file found. Using default configuration.');
    console.log('📝 You can create a .env file in your project directory');
    console.log('   or .node-artisan.env in your home directory with:');
    console.log('   MONGODB_URI=your_mongodb_connection_string');
    console.log('   PORT=your_preferred_port');
    console.log('   JWT_SECRET=your_jwt_secret');
  }
};

loadEnvConfig();

// Environment variable validation
const requiredEnvVars = ['PORT', 'MONGODB_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(env => !process.env[env]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars.join(', '));
  console.error('Please check your .env file');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;
const routesPath = path.resolve("routes");

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import authentication routes
import authRoutes from "./routes/auth.routes.js";
app.use("/api/auth", authRoutes);

// Auto-load all other routes
fs.readdirSync(routesPath).forEach((file) => {
  if (file.endsWith(".routes.js") && file !== "auth.routes.js") {
    import(`./routes/${file}`).then((module) => {
      const route = module.default;
      const routeName = file.replace(".routes.js", "");
      app.use(`/api/${routeName}`, route);
      console.log(`✔ Route registered: /api/${routeName}`);
    });
  }
});

// MongoDB Connection
const connectDB = async () => {
  try {
    // Allow users to specify their MongoDB URI, with a fallback to localhost
    const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/node_artisan";
    await mongoose.connect(mongoURI);
    console.log("✨ MongoDB Connected Successfully!");
    console.log(`📊 Database URL: ${mongoURI}`);
  } catch (error) {
    console.error("✖ MongoDB connection error:", error.message);
    console.error("ℹ️  Make sure you have set the correct MONGODB_URI in your .env file");
    process.exit(1);
  }
};

// Create server initialization function
const initServer = () => {
  const server = app.listen(PORT, () => {
    console.log('🚀 Node Artisan Server Started');
    console.log(`🔗 Server URL: http://localhost:${PORT}`);
    console.log('📝 API Documentation: http://localhost:${PORT}/api-docs');
  });
  return server;
};

// Determine how the server is being used
if (import.meta.url === url.pathToFileURL(process.argv[1]).href) {
  // Running directly (npm start)
  console.log('💫 Starting Node Artisan in standalone mode...');
  connectDB();
  initServer();
} else {
  // Being used as a dependency in another project
  console.log('📦 Node Artisan initialized as a module');
  console.log('💡 To start the server, call:');
  console.log('   await connectDB();');
  console.log('   initServer();');
}

// Export for module usage
export { app, connectDB, initServer };

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Node Artisan API" });
});
