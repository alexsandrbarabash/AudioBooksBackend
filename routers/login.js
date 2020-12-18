const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

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

      await db.get(`SELECT * FROM users WHERE email=?`, [email], (err, row) => {
        if (err) {
          return console.log(err.message);
        }

        if (row) {
          db.close((err) => {
            if (err) {
              return console.log(err.message);
            }
            console.log("Disconnection to the database");
          });
          next();
        } else {
          db.close((err) => {
            if (err) {
              return console.log(err.message);
            }
            console.log("Disconnection to the database");
          });
          res.status(400).json({ message: "Such a user exists" });
        }
      });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "something bad" });
    }
  }
);

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

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

    //const hashedPassword = await bcrypt.hash(password, 12);

    await db.get(
      `SELECT * FROM users WHERE email=?;`,
      [email],
      async (err, row) => {
        if (err) {
          return console.log(err.message);
        }
        await db.close((err) => {
          if (err) {
            return console.log(err.message);
          }
          console.log("Disconnection to the database");
        });

        const isMatch = await bcrypt.compare(password, row.password);

        if (!isMatch) {
          res.status(400).send({ message: "Invalid user data" });
        }
        res.json(row); // відправляти шо ? id
      }
    );

    db.close();
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "something bad" });
  }
});

module.exports = router;
