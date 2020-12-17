const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

router.post("/", async (req, res, next) => {
  try {
    const db = await new sqlite3.Database("./library.db");

    const { likeGeners, token } = req.body;
    let value = "";
    likeGeners.forEach((item) => {
      value = value + `(${token}, ${item}), `;
    });

    await db.run(
      `INSERT INTO gener_user (user_id, gener_id) VALUES ${value.slice(
        0,
        -2
      )};`,
      [],
      (err, row) => {
        res.send("Ok");
      }
    );

    db.close();
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "something bad" });
  }
});

module.exports = router;
