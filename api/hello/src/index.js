const express = require("express");

const app = express();
const PORT = 4000;

app.get("/", (_req, res) => {
  res.json({ message: "Hello from new Microservice" });
});

app.listen(PORT, () => {
  console.log(`Service Hello running on port ${PORT}`);
});
