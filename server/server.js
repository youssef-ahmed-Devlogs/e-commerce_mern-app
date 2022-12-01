const app = require("./app");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/meStore")
  .then((connections) => console.log("Database connection successfully."))
  .catch((err) => {
    console.log("Database connection failed:", err);
  });

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
