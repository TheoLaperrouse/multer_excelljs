const express = require("express");
const multer = require("multer");
const Excel = require("exceljs");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("Aucun fichier sélectionné.");
  }
  const filePath = req.file.path;
  const workbook = new Excel.Workbook();
  const stream = fs.createReadStream(filePath);

  workbook.xlsx.read(stream).then((workbook) => {
    const worksheet = workbook.getWorksheet(1);
    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      console.log(`Line ${rowNumber}: ${JSON.stringify(row.values)}`);
    });

    res.send("Test Ok");
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Application déployée ici : http://localhost:${PORT}`);
});