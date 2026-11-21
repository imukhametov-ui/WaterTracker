

export const swaggerDocument = {
  openapi: "3.0.3",
  info: {
    title: "WaterTracker API",
    version: "1.0.0",
    description:
      "REST API for tracking daily water consumption. Authentication uses an HttpOnly JWT cookie. State-changing requests require an Origin header matching CLIENT_URL.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "watertracker_token",
        description:
          "JWT stored in an HttpOnly cookie after successful login.",
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
          email: {
            type: "string",
            format: "email",
          },
          password: {
            type: "string",
            format: "password",
          },
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
    },
  },
  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Authentication"],
        summary: "Register a new user",
        description:
          "Requires an Origin header matching CLIENT_URL. Registration does not automatically log in the user.",
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
          "403": { description: "Forbidden origin" },
          "409": { description: "Email already registered" },
          "500": { description: "Internal server error" },
        },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Authentication"],
        summary: "Log in and set JWT cookie",
        description:
          "Requires an Origin header matching CLIENT_URL. On success, sets the HttpOnly watertracker_token cookie. The JWT is not returned in the JSON response.",
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
          "200": {
            description: "Login successful; authentication cookie set",
            headers: {
              "Set-Cookie": {
                description:
                  "HttpOnly watertracker_token cookie containing the JWT",
                schema: { type: "string" },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Login successful",
                    },
                    user: {
                      $ref: "#/components/schemas/User",
                    },
                  },
                },
              },
            },
          },
          "400": { description: "Invalid login data" },
          "401": { description: "Invalid email or password" },
          "403": { description: "Forbidden origin" },
          "500": { description: "Internal server error" },
        },
      },
    },
    "/api/auth/logout": {
      post: {
        tags: ["Authentication"],
        summary: "Log out and clear authentication cookie",
        description:
          "Requires an Origin header matching CLIENT_URL. Clears the authentication cookie from the browser.",
        responses: {
          "200": {
            description: "Logout successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Logout successful",
                    },
                  },
                },
              },
            },
          },
          "403": { description: "Forbidden origin" },
          "500": { description: "Internal server error" },
        },
      },
    },
    "/api/auth/me": {
      get: {
        tags: ["Authentication"],
        summary: "Get current authenticated user",
        security: [{ cookieAuth: [] }],
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
  },
};
