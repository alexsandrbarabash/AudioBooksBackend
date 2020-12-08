const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//routers
const player = require("./routers/player");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.use("/player", database);

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`);
});
