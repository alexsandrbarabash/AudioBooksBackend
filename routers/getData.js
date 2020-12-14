const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

router.get("/selection", async (req, res, next) => {
  try {
    const selectionId = req.query.selectionId;
    if (!selectionId) {
      next();
    } else {
      const db = await new sqlite3.Database("./library.db");

      await db.all(
        `SELECT b.id, b.title, b.artwork, b.about FROM selection s
       INNER JOIN selection_book sb ON s.id=sb.selection_id
       INNER JOIN books b ON sb.book_id=b.id WHERE s.id=?;`,
        [selectionId],
        (err, row) => {
          res.json(row);
        }
      );

      db.close();
    }
  } catch (e) {
    res.status(500).json({ message: "something bad" });
  }
});

router.get("/selection", async (req, res, next) => {
  try {
    const isBookSelection = req.query.isBookSelection;
    if (!isBookSelection) {
      next();
    } else {
      const db = await new sqlite3.Database("./library.db");

      await db.all(
        `SELECT id, title FROM selection s where s.is_selection=0;`,
        [],
        (err, row) => {
          res.json(row);
        }
      );

      db.close();
    }
  } catch (e) {
    res.status(500).json({ message: "something bad" });
  }
});

router.get("/selection", async (req, res) => {
  try {
    const db = await new sqlite3.Database("./library.db");

    await db.all(
      `SELECT id, title FROM selection s where s.is_selection=1;`,
      [],
      (err, row) => {
        res.json(row);
      }
    );

    db.close();
  } catch (e) {
    res.status(500).json({ message: "something bad" });
  }
});

//favorites genres user
router.get("/genres", async (req, res) => {
  try {
    const token = req.query.token;
    const db = await new sqlite3.Database("./library.db");

    await db.all(
      `SELECT g.name FROM geners g
       INNER JOIN gener_user gu on g.id = gu.gener_id
       INNER JOIN users u on u.id = gu.user_id WHERE u.id=?;`,
      [token],
      (err, row) => {
        res.json(row);
      }
    );

    db.close();
  } catch (e) {
    res.status(500).json({ message: "something bad" });
  }
});

//mix user or favorites books users
router.get("/book", async (req, res) => {
  try {
    const token = req.query.token;
    const db = await new sqlite3.Database("./library.db");

    await db.all(
      `SELECT b.id AS id, b.title AS title,
       b.artwork AS artwork, b.about AS about FROM books b
       INNER JOIN user_book ub ON b.id = ub.book_id
       INNER JOIN users u on u.id = ub.user_id WHERE u.id=?;`,
      [token],
      (err, row) => {
        res.json(row);
      }
    );

    db.close();
  } catch (e) {
    res.status(500).json({ message: "something bad" });
  }
});

module.exports = router;
