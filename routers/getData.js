const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const { host } = require("../host");

router.get("/selection", async (req, res, next) => {
  try {
    const selectionId = req.query.selectionId;
    const token = req.query.token;
    if (!selectionId) {
      next();
    } else {
      const db = await new sqlite3.Database("./library.db");

      await db.all(
        `SELECT b.id, b.title, ( ? || b.artwork) AS image, b.about, gb.gener, ab.autor, l.isLiked, b.duration, b.chaptersCount
         FROM (SELECT * FROM selection WHERE id=?) s
         INNER JOIN selection_book sb ON s.id=sb.selection_id
         INNER JOIN books b ON sb.book_id=b.id
         INNER JOIN (SELECT book_id, group_concat(g.name) AS gener FROM gener_book
         INNER JOIN geners g ON gener_book.gener_id = g.id GROUP BY book_id) gb ON b.id=gb.book_id
         INNER JOIN (SELECT book_id, group_concat(a.name) AS autor FROM autor_book
         INNER JOIN autors a ON autor_book.autor_id = a.id GROUP BY book_id) ab ON b.id=ab.book_id
         LEFT JOIN (SELECT ub.user_id, ub.book_id, (CASE WHEN ub.book_id == NULL THEN 0 ELSE 1 END) AS isLiked  FROM users
         INNER JOIN user_book ub ON users.id = ub.user_id WHERE ub.user_id=?) l ON l.book_id=b.id;`,
        [host, selectionId, token],
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
      `SELECT id, title,  ( ? || artwork) AS image FROM selection s where s.is_selection=1;`,
      [host],
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
router.get("/genres", async (req, res, next) => {
  try {
    const token = req.query.token;
    if (!token) {
      next();
    } else {
      const db = await new sqlite3.Database("./library.db");

      await db.all(
        `SELECT g.id, g.name FROM geners g
       INNER JOIN gener_user gu on g.id = gu.gener_id
       INNER JOIN users u on u.id = gu.user_id WHERE u.id=? ORDER BY g.id;`,
        [token],
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

//all genres
router.get("/genres", async (req, res) => {
  try {
    const db = await new sqlite3.Database("./library.db");
    await db.all(`SELECT * FROM geners;`, [], (err, row) => {
      res.json(row);
    });
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
      `SELECT b.id, b.title, ( ? || b.artwork) AS image, b.about, gb.gener, ab.autor, l.isLiked, b.duration, b.chaptersCount
      FROM books b
      INNER JOIN (SELECT book_id, group_concat(g.name) AS gener FROM gener_book
      INNER JOIN geners g ON gener_book.gener_id = g.id GROUP BY book_id) gb ON b.id=gb.book_id
      INNER JOIN (SELECT book_id, group_concat(a.name) AS autor FROM autor_book
      INNER JOIN autors a ON autor_book.autor_id = a.id GROUP BY book_id) ab ON b.id=ab.book_id
      LEFT JOIN (SELECT ub.user_id, ub.book_id, (CASE WHEN ub.book_id == NULL THEN 0 ELSE 1 END) AS isLiked  FROM users
      INNER JOIN user_book ub ON users.id = ub.user_id WHERE ub.user_id=?) l ON l.book_id=b.id;`,
      [host, token],
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
