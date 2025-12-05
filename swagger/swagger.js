const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Event Planner API",
      version: "1.0.0",
      description: "API documentation for the Event Planner project.",
    },
  },
  apis: ["./routes/*.js"],
};

module.exports = swaggerJsdoc(options);
