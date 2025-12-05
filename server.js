// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");
const mongodb = require("./data/database");
const eventRoutes = require("./routes/eventRoute");
const userRoutes = require("./routes/userRoute");
const errorHandler = require("./errors/error");

const app = express();
const PORT = process.env.PORT || 3000;


// Initialize DB
mongodb.initDb((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  } else {
    console.log("Database initialized successfully");

    // Start server ONLY after DB connects
    app.listen(PORT, () => {
      console.log(`Event Planner API running on port ${PORT}`);
    });
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Event Planner API is running.",
  });
});

// Routes
app.use("/events", eventRoutes);
app.use("/users", userRoutes);

// Global error handler
app.use(errorHandler);
