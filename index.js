const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

//routers
app.use("/player", require("./routers/player"));
app.use("/registration", require("./routers/registration"));
app.use("/login", require("./routers/login"));
app.use("/data", require("./routers/getData"));
app.use("/search", require("./routers/search"));
app.use("/setdb", require("./routers/setData"));

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`);
});
