const express = require("express");
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controller/bookController");

const router = express.Router();

// All Book Routes

router.post("/create", createBook);
router.get("/get", getBooks);
router.get("/getById/:bookId", getBookById);
router.put("/update/:bookId", updateBook);
router.delete("/delete/:bookId", deleteBook);

module.exports = router;
