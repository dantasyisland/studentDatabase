var express = require("express");
var router = express.Router();
var path = require("path");

const fs = require("fs");
const csvParser = require("csv-parser");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/csv", (req, res) => {
  fs.readFile(
    path.join(__dirname, "../studentData/sample.csv"),
    "utf-8",
    (err, data) => {
      if (err) {
        console.error(err);
        res.send("Error");
      }
      console.log(data);
      res.send("done");
    }
  );
});

router.get("/csvparse", (req, res) => {
  const result = [];

  fs.createReadStream(path.join(__dirname, "../studentData/studentName.csv"))
    .pipe(csvParser())
    .on("data", (data) => {
      result.push(data);
    })
    .on("end", () => {
      console.log(result);
      res.render("students", { result });
    });
});

module.exports = router;
