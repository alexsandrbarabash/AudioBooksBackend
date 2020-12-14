const express = require("express");
const router = express.Router();
const { host } = require("../host");

const AllBooks = {
  Dune: {
    id: "1",
    title: "Dune",
    author: "Frank Herbert",
    about:
      "Dune is set in the distant future amidst a feudal interstellar society in which various noble houses control planetary fiefs..",
    image: `${host}/img/1984.jpeg}`,
    isLiked: false,
    duration: 65,
    chaptersCount: 12,
    genres: ["Detective", "Science-Fiction", "Fantasy"],
  },
  It: {
    id: "2",
    title: "It",
    author: "Stephen King",
    about:
      "Nemo sapiente error dolorem. Rerum quo expedita. In rem fugiat omnis eum molestiae omnis itaque omnis..",
    image: `${host}/img/1984.jpeg}`,
    isLiked: false,
    duration: 90,
    chaptersCount: 20,
    genres: ["Horror", "Mystery"],
  },
  BriefAnswers: {
    id: "3",
    title: "Brief Answers to the Big Questions",
    author: "Stephen Hawking",
    about: "Veniam et voluptas non quis voluptatem quia ducimus assumenda..",
    image: `${host}/img/1984.jpeg}`,
    isLiked: false,
    duration: 75,
    chaptersCount: 16,
    genres: ["History", "Drama", "Romance"],
  },
  Frankenstein: {
    id: "4",
    title: "Frankenstein",
    author: "Mary Shelley",
    about:
      "Nemo sapiente error dolorem. Rerum quo expedita. In rem fugiat omnis eum molestiae omnis itaque omnis..",
    image: `${host}/img/1984.jpeg}`,
    isLiked: false,
    duration: 65,
    chaptersCount: 12,
    genres: ["History", "Drama"],
  },
  PetSematary: {
    id: "5",
    title: "Pet Sematary",
    author: "Stephen King",
    about:
      "Nemo sapiente error dolorem. Rerum quo expedita. In rem fugiat omnis eum molestiae omnis itaque omnis..",
    image: `${host}/img/1984.jpeg}`,
    isLiked: false,
    duration: 80,
    chaptersCount: 15,
    genres: ["Mystery", "Horror"],
  },
  Sapiens: {
    id: "6",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    about: "Veniam et voluptas non quis voluptatem quia ducimus assumenda..",
    image: `${host}/img/1984.jpeg}`,
    isLiked: false,
    duration: 52,
    chaptersCount: 16,
    genres: ["Non-Fiction", "Detective", "Drama"],
  },
  HarryPotter: {
    id: "7",
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    about:
      "The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley.",
    image: `${host}/img/1984.jpeg}`,
    isLiked: false,
    duration: 42,
    chaptersCount: 30,
    genres: ["Mystery", "Fantasy", "Drama"],
  },
  ToKill: {
    id: "8",
    title: "To Kill A Mockingbird",
    author: "Harper Lee",
    about:
      'The story takes place during three years of the Great Depression in the fictional "tired old town" of Maycomb, Alabama.',
    image: `${host}/img/1984.jpeg}`,
    isLiked: false,
    duration: 24,
    chaptersCount: 18,
    genres: ["Detective", "History", "Non-Fiction"],
  },
  LittleWomen: {
    id: "9",
    title: "Little Women",
    author: "Louisa May Alcott",
    about:
      "The story follows the lives of the four March sisters—Meg, Jo, Beth, and Amy—and details their passage from childhood to womanhood.",
    image: `${host}/img/1984.jpeg}`,
    isLiked: false,
    duration: 16,
    chaptersCount: 22,
    genres: ["Drama", "Detective"],
  },
  Hobbit: {
    id: "10",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    about:
      "The story is told in the form of an episodic quest, and most chapters introduce a specific creature or type of creature of Tolkien's geography.",
    image: `${host}/img/1984.jpeg}`,
    isLiked: false,
    duration: 50,
    chaptersCount: 63,
    genres: ["Fantasy", "Drama", "Mystery"],
  },
  Pride: {
    id: "11",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    about:
      "Its humour lies in its honest depiction of manners, education, marriage, and money during the Regency era in Great Britain.",
    image: `${host}/img/1984.jpeg}`,
    isLiked: false,
    duration: 20,
    chaptersCount: 27,
    genres: ["History", "Satire"],
  },
  LordOfRings: {
    id: "12",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    about:
      "Set in Middle-earth, the world at some distant time in the past, the story began as a sequel to Tolkien's 1937 children's book The Hobbit.",
    image: `${host}/img/1984.jpeg}`,
    isLiked: false,
    duration: 50,
    chaptersCount: 78,
    genres: ["Thriller", "Fantasy", "Drama"],
  },
  NineteenEightyFour: {
    id: "13",
    title: "1984",
    author: "George Orwell",
    about:
      "Thematically, Nineteen Eighty-Four centres on the consequences of totalitarianism and mass surveillance.",
    image: `${host}/img/1984.jpeg}`,
    isLiked: false,
    duration: 20,
    chaptersCount: 30,
    genres: ["Science-Fiction", "Drama"],
  },
  Fahrenheit: {
    id: "14",
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    about:
      'The novel presents a future American society where books are outlawed and "firemen" burn any that are found.',
    image: `${host}/img/1984.jpeg}`,
    isLiked: false,
    duration: 37,
    chaptersCount: 41,
    genres: ["Science-Fiction", "Thriller"],
  },
  EndersGame: {
    id: "15",
    title: "Ender’s Game",
    author: "Orson Scott Card",
    about:
      'The novel presents an imperiled humankind after two conflicts with the Formics, an insectoid alien species they dub the "buggers".',
    image: `${host}/img/1984.jpeg}`,
    isLiked: false,
    duration: 23,
    chaptersCount: 37,
    genres: ["Science-Fiction", "Thriller", "Fantasy"],
  },
  Hitchhiker: {
    id: "16",
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    about:
      "Is a comedy science fiction series created by Douglas Adams. Originally a radio comedy broadcast on BBC Radio 4 in 1978.",
    image: `${host}/img/1984.jpeg}`,
    isLiked: false,
    duration: 7,
    chaptersCount: 17,
    genres: ["Thriller", "Science-Fiction", "Satire"],
  },
};

router.get("/", (req, res) => {
  res.json([
    AllBooks.Dune,
    AllBooks.It,
    AllBooks.BriefAnswers,
    AllBooks.Frankenstein,
    AllBooks.PetSematary,
    AllBooks.Sapiens,
  ]);
});

module.exports = router;
