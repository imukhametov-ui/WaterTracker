
export const swaggerDocument = {
  openapi: "3.0.3",
  info: {
    title: "WaterTracker API",
    version: "1.0.0",
    description: "REST API for tracking daily water consumption",
  },
  servers: [
    {
      url: "http://[::1]:3001",
      description: "Local development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      RegisterRequest: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: {
            type: "string",
            minLength: 2,
            maxLength: 100,
            example: "Test User",
          },
          email: {
            type: "string",
            format: "email",
            example: "testuser@example.com",
          },
          password: {
            type: "string",
            minLength: 8,
            maxLength: 72,
            format: "password",
          },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", format: "password" },
        },
      },
      User: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string" },
          email: { type: "string", format: "email" },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      WaterRecord: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          userId: { type: "string", format: "uuid" },
          amount: {
            type: "integer",
            minimum: 1,
            example: 250,
            description: "Amount of water in milliliters",
          },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      WaterRecordRequest: {
        type: "object",
        required: ["amount"],
        properties: {
          amount: {
            type: "integer",
            minimum: 1,
            example: 250,
          },
        },
      },
    },
  },

  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Authentication"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegisterRequest",
              },
            },
          },
        },
        responses: {
          "201": { description: "User registered successfully" },
          "400": { description: "Invalid registration data" },
          "409": { description: "Email already registered" },
          "500": { description: "Internal server error" },
        },
      },
    },

    "/api/auth/login": {
      post: {
        tags: ["Authentication"],
        summary: "Log in and receive JWT",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginRequest",
              },
            },
          },
        },
        responses: {
          "200": { description: "Login successful" },
          "400": { description: "Invalid login data" },
          "401": { description: "Invalid email or password" },
          "500": { description: "Internal server error" },
        },
      },
    },

    "/api/auth/me": {
      get: {
        tags: ["Authentication"],
        summary: "Get current authenticated user",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Current user",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: {
                      $ref: "#/components/schemas/User",
                    },
                  },
                },
              },
            },
          },
          "401": { description: "Unauthorized" },
          "500": { description: "Internal server error" },
        },
      },
    },

    "/api/water-records": {
      post: {
        tags: ["Water Records"],
        summary: "Create a water consumption record",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/WaterRecordRequest",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Water record created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    waterRecord: {
                      $ref: "#/components/schemas/WaterRecord",
                    },
                  },
                },
              },
            },
          },
          "400": { description: "Invalid water record data" },
          "401": { description: "Unauthorized" },
          "500": { description: "Internal server error" },
        },
      },

      get: {
        tags: ["Water Records"],
        summary: "Get water consumption history",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Water records retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    waterRecords: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/WaterRecord",
                      },
                    },
                  },
                },
              },
            },
          },
          "401": { description: "Unauthorized" },
          "500": { description: "Internal server error" },
        },
      },
    },

    "/api/water-records/today": {
      get: {
        tags: ["Water Records"],
        summary: "Get total water consumption for today",
        description: "Calculates today's water consumption in UTC.",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Daily water total retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    date: {
                      type: "string",
                      format: "date",
                      example: "2026-11-22",
                    },
                    totalAmount: {
                      type: "integer",
                      minimum: 0,
                      example: 550,
                    },
                  },
                },
              },
            },
          },
          "401": { description: "Unauthorized" },
          "500": { description: "Internal server error" },
        },
      },
    },

    "/api/water-records/{id}": {
      patch: {
        tags: ["Water Records"],
        summary: "Update a water consumption record",
        description: "Only the record owner can update the record.",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Water record ID",
            schema: {
              type: "string",
              format: "uuid",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/WaterRecordRequest",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Water record updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    waterRecord: {
                      $ref: "#/components/schemas/WaterRecord",
                    },
                  },
                },
              },
            },
          },
          "400": { description: "Invalid request data" },
          "401": { description: "Unauthorized" },
          "404": { description: "Water record not found" },
          "500": { description: "Internal server error" },
        },
      },

      delete: {
        tags: ["Water Records"],
        summary: "Delete a water consumption record",
        description: "Only the record owner can delete the record.",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Water record ID",
            schema: {
              type: "string",
              format: "uuid",
            },
          },
        ],
        responses: {
          "200": {
            description: "Water record deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Water record deleted successfully",
                    },
                  },
                },
              },
            },
          },
          "401": { description: "Unauthorized" },
          "404": { description: "Water record not found" },
          "500": { description: "Internal server error" },
        },
      },
    },
  },
};
