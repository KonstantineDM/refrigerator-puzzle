const express = require("express");
const path = require("path");

const app = express();

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Listen on port 3000
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
