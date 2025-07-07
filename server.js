const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
// const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Add result
app.post("/add-result", (req, res) => {
  const result = req.body;

  // Read existing results
//   reading file asynchronously for non blocking server so that site does not crash

  fs.readFile("results.json", "utf8", (err, data) => {
    let results = [];
    if (!err && data) {
      results = JSON.parse(data);
    }

    results.push(result);

    fs.writeFile("results.json", JSON.stringify(results, null, 2), (err) => {
      if (err) {
        res.status(500).send("Failed to save result");
      } else {
        res.send("✅ Result added successfully!");
      }
    });
  });
});

app.listen(3000, () => {
  console.log(`Server running at http://localhost:${3000}`);
});


app.get("/view-results", (req, res) => {
  fs.readFile("results.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading data");
    } else {
      const results = JSON.parse(data);
      res.json(results);
    }
  });
});
 