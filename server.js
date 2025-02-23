import express from "express";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const routesPath = path.resolve("routes");

app.use(express.json());

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

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✔ Connected to MongoDB"))
  .catch((err) => console.error("✖ MongoDB connection error:", err));

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
