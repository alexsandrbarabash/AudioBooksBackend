const sqlite3 = require("sqlite3").verbose();

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("LIKE", async ({ idBook, token }) => {
      try {
        const db = await new sqlite3.Database("./library.db");

        db.close();
      } catch (e) {
        console.log(e);
      }
    });

    socket.on("DISLIKE", async ({ idBook, token }) => {
      try {
        const db = await new sqlite3.Database("./library.db");

        db.close();
      } catch (e) {
        console.log(e);
      }
    });

    socket.on("SET:NAME", async ({ name, token }) => {
      try {
        const db = await new sqlite3.Database("./library.db");

        db.close();
      } catch (e) {
        console.log(e);
      }
    });

    socket.on("disconnect", () => {
      console.log("a user disconnect");
    });
  });
};
