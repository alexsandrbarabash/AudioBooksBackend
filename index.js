const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//const player = require("./routers/player");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

//routers
app.use("/player", require("./routers/player"));
app.use("/registration", require("./routers/registration"));

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`);
});
