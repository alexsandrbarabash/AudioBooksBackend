const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const sqlite3 = require("sqlite3").verbose();

router.post(
  "/",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid login details",
        });
      }

      const { email, password } = req.body;

      //check if the user is in the database
      const db = await new sqlite3.Database(
        "./library.db",
        sqlite3.OPEN_READONLY,
        (err) => {
          if (err) {
            return console.log(err.message);
          }
          console.log("Connection to the database");
        }
      );

      db.get(`SELECT * FROM users WHERE email=?`, [email], (err, row) => {
        if (err) {
          return console.log(err.message);
        }

        if (!row) {
          next();
        } else {
          res.status(400).json({ message: "Such a user exists" });
        }
      });

      db.close((err) => {
        if (err) {
          return console.log(err.message);
        }
        console.log("Disconnection to the database");
      });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "something bad" });
    }
  }
);

router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const db = await new sqlite3.Database("./library.db", (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log("Connection to the database");
    });

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.run(
      `INSERT INTO users (email, password) VALUES (?, ?);`,
      [email, hashedPassword],
      (err) => {
        if (err) {
          return console.log(err.message);
        }
        res.json("Ok");
      }
    );

    await db.close((err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log("Disconnection to the database");
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "something bad" });
  }
});

module.exports = router;
