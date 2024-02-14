import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Todo API",
    description: "Social Media Api",
  },
  host: "localhost:8002",
  schemes: ["http"],
};

const outputFile = "./swaggerdoc.json";
const endpointsFiles = ["./routes/*.js", './app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation generated successfully.");
});
