const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

router.post("/audio", async (req, res) => {
  let book = {};
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

  await db.serialize(() => {
    db.get(
      `SELECT b.id, b.title, b.artwork, p.size_query FROM books b INNER JOIN
    (SELECT book_id, COUNT(book_id) AS size_query FROM part GROUP BY book_id) p
     ON b.id=p.book_id  WHERE id=?;`,
      [req.body.id],
      (err, row) => {
        if (err) {
          return console.log(err.message);
        }
        book = row;
      }
    );

    db.all(
      `SELECT p.numbering AS id, p.book_audio AS url, b.title, b.artwork, a.name AS artist FROM part p
    INNER JOIN books b ON b.id=p.book_id
    INNER JOIN (SELECT book_id, autor_id FROM autor_book WHERE book_id=1 LIMIT 1) ab ON p.book_id = ab.book_id
    INNER JOIN autors a ON a.id=ab.autor_id
    WHERE p.book_id=?;`,
      [req.body.id],
      (err, row) => {
        if (err) {
          return console.log(err.message);
        }
        book.query = row;
        res.json(book);
      }
    );
  });

  await db.close((err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Disconnection to the database");
  });
});

module.exports = router;
