const swaggerJSDoc = require("swagger-jsdoc");
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Movre",
    version: "1.0.0",
    description: "My API Description",
  },
  components: {
    schemas: {
      Movie: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          runtime: {
            type: "integer",
          },
          picture: {
            type: "string",
            format: "binary",
          },
          release: {
            type: "string",
            format: "date",
          },
        },
        example: {
          release: "2000-01-23",
          name: "name",
          description: "description",
          runtime: 6,
          id: 0,
          picture: "",
        },
      },
      Review: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          movie_id: {
            type: "integer",
          },
          user_id: {
            type: "integer",
          },
          post_date: {
            type: "string",
            format: "date",
          },
          message: {
            type: "string",
          },
          rating: {
            type: "integer",
          },
          likes: {
            type: "integer",
          },
        },
        example: {
          user_id: 1,
          post_date: "2000-01-23",
          rating: 5,
          id: 0,
          movie_id: 6,
          message: "message",
          likes: 5,
        },
      },
      User: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
          email: { type: "string" },
          password: { type: "string" },
          birth_date: {
            type: "string",
            format: "date",
          },
          // alte proprietăți ale schemei User
        },
        required: ["id", "name", "email"],
        example: {
          password: "password",
          birth_date: "2000-01-23",
          name: "name",
          id: 0,
          email: "email",
        }, // specifică proprietățile obligatorii
      },
      // alte scheme
    },
  },
};
const options = {
  swaggerDefinition,
  apis: ["./routes/Movie.js", "./routes/Review.js", "./routes/User.js"], // Path to the API routes in your Node.js application
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
