const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Event Planner API",
      version: "1.0.0",
      description: "API documentation for the Event Planner project.",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string", example: "6932452b51b2b0f2a4de2614" },
            name: { type: "string", example: "Alice Johnson" },
            email: { type: "string", example: "alice.johnson@example.com" },
          },
        },
        Event: {
          type: "object",
          properties: {
            _id: { type: "string", example: "6932452b51b2b0f2a4de2615" },
            title: { type: "string", example: "Birthday Party" },
            date: { type: "string", example: "2025-12-25" },
            location: { type: "string", example: "New York" },
          },
        },
      },
    },
    paths: {
      "/users": {
        get: {
          summary: "Get all users",
          responses: {
            200: {
              description: "List of users",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/User" },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Create a new user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          responses: {
            201: {
              description: "User created",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" },
                },
              },
            },
          },
        },
      },
      "/users/{id}": {
        get: {
          summary: "Get user by ID",
          parameters: [
            {
              in: "path",
              name: "id",
              schema: { type: "string" },
              required: true,
              description: "User ID",
            },
          ],
          responses: {
            200: { description: "User found", content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } },
            404: { description: "User not found" },
          },
        },
        put: {
          summary: "Update user by ID",
          parameters: [
            { in: "path", name: "id", schema: { type: "string" }, required: true },
          ],
          requestBody: {
            required: true,
            content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } },
          },
          responses: {
            200: { description: "User updated", content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } },
            404: { description: "User not found" },
          },
        },
        delete: {
          summary: "Delete user by ID",
          parameters: [
            { in: "path", name: "id", schema: { type: "string" }, required: true },
          ],
          responses: { 204: { description: "User deleted" }, 404: { description: "User not found" } },
        },
      },
      "/events": {
        get: {
          summary: "Get all events",
          responses: {
            200: {
              description: "List of events",
              content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Event" } } } },
            },
          },
        },
        post: {
          summary: "Create a new event",
          requestBody: {
            required: true,
            content: { "application/json": { schema: { $ref: "#/components/schemas/Event" } } },
          },
          responses: {
            201: { description: "Event created", content: { "application/json": { schema: { $ref: "#/components/schemas/Event" } } } },
          },
        },
      },
      "/events/{id}": {
        get: {
          summary: "Get event by ID",
          parameters: [
            { in: "path", name: "id", schema: { type: "string" }, required: true },
          ],
          responses: {
            200: { description: "Event found", content: { "application/json": { schema: { $ref: "#/components/schemas/Event" } } } },
            404: { description: "Event not found" },
          },
        },
        put: {
          summary: "Update event by ID",
          parameters: [
            { in: "path", name: "id", schema: { type: "string" }, required: true },
          ],
          requestBody: {
            required: true,
            content: { "application/json": { schema: { $ref: "#/components/schemas/Event" } } },
          },
          responses: {
            200: { description: "Event updated", content: { "application/json": { schema: { $ref: "#/components/schemas/Event" } } } },
            404: { description: "Event not found" },
          },
        },
        delete: {
          summary: "Delete event by ID",
          parameters: [
            { in: "path", name: "id", schema: { type: "string" }, required: true },
          ],
          responses: { 204: { description: "Event deleted" }, 404: { description: "Event not found" } },
        },
      },
    },
  },
  apis: [],
};

module.exports = swaggerJsdoc(options);
