const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

router.get("/", async (req, res) => {
  try {
    const token = req.query.token;
    const db = await new sqlite3.Database("../library.db");

    let data = {};
    await db.serialize(() => {
      db.all(
        "SELECT id, title FROM selection s where s.is_selection=?;",
        [0],
        (err, row) => {
          if (err) {
            console.log(err);
          }
          data = row;
        }
      );

      db.all(
        "SELECT id, title FROM selection s where s.is_selection=?;",
        [0],
        (err, row) => {
          if (err) {
            console.log(err);
          }
          console.log(data);
        }
      );
    });
    // console.log(data);
    // await db.each(
    //   "SELECT id, title FROM selection s where s.is_selection=0;",
    //   [],
    //   async (err, row) => {
    //     await db.all(
    //       `SELECT b.id, b.title, b.artwork, b.about FROM selection s
    //             INNER JOIN selection_book sb ON s.id=sb.selection_id
    //             INNER JOIN books b ON sb.book_id=b.id WHERE s.id=?;`,
    //       [token],
    //       (err, rowBook) => {
    //         row.book = rowBook;
    //         data[`${row.id}`] = row;
    //       }
    //     );
    //     console.log(data);
    //   }
    // );

    db.close();

    res.send("Hellow World");
  } catch (e) {
    res.status(500).json({ message: "something bad" });
  }
});

/*
{
 mainBook:[],// книжки в доступі на головній сторінці
 //якщо чел зареганий тобто token прийшов то
 yourMix:[]
 genres:'',
 //для всіх
 selection:[],
 best of all time:[],
 //по жанрам перші 5-10


}
*/

module.exports = router;
