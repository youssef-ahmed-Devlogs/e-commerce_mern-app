const app = require("./app");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE)
  .then((connections) => console.log("Database connection successfully."))
  .catch((err) => {
    console.log("Database connection failed:", err);
  });

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
