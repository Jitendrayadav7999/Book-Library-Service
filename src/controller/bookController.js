const moment = require("moment");
const mongoose = require("mongoose");
const bookModel = require("../model/bookModel");

const isValidObjectId = function (objectid) {
  return mongoose.Types.ObjectId.isValid(objectid);
};

const isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;

const createBook = async (req, res) => {
  try {
    const { title, ISBN, category, releasedAt } = req.body;

    //Validation for book title
    if (!title)
      return res
        .status(400)
        .send({ message: "Please enter book title its required" });
    if (title) {
      const findBook = await bookModel.findOne({ title });
      if (findBook)
        return res.status(400).send({
          message: "This book title all ready exist please enter another title",
        });
    }

    //Validation for book ISBN
    if (!ISBN)
      return res
        .status(400)
        .send({ message: "Please enter book ISBN its required" });
    if (ISBN) {
      if (!isbnRegex.test(ISBN))
        return res
          .status(400)
          .send({ message: "ISBN Should be 10 or 13 digits only" });

      const findBook = await bookModel.findOne({ ISBN });
      if (findBook)
        return res.status(400).send({
          message: "This book ISBN all ready exist please enter another ISBN ",
        });
    }

    //Validation for book category

    if (!category)
      return res.status(400).send({
        message: " please enter book category name ",
      });

    //Validation for book releasedAt

    if (!releasedAt)
      return res.status(400).send({
        message: " please enter book released Date  ",
      });

    if (!moment(releasedAt, "YYYY-MM-DD", true).isValid()) {
      return res.status(400).send({
        message:
          "invalid released Date format please provide date format Like YYYY-MM-DD",
      });
    }

    //Create book
    let createdBook = await bookModel.create(req.body);
    res.status(201).send({ message: "Success", data: createdBook });
  } catch (error) {
    console.log("Error====>", error.message);
    res.status(500).send({ error: error.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const findBooks = await bookModel.find();
    res.status(200).send({ message: "Books List", data: findBooks });
  } catch (error) {
    console.log("Error====>", error.message);
    res.status(500).send({ error: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    let bookId = req.params.bookId;

    //Validation for book id
    if (!isValidObjectId(bookId))
      return res.status(400).send({ message: "Invalid Book Id" });

    let findBook = await bookModel.findById(bookId);
    if (!findBook) return res.status(404).send({ message: "Book Not Found" });
    res.status(200).send({ message: "Book Details", data: findBook });
  } catch (error) {
    console.log("Error====>", error.message);
    res.status(500).send({ error: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    let bookId = req.params.bookId;

    //Validation for book id
    if (!isValidObjectId(bookId))
      return res.status(400).send({ message: "Invalid Book Id" });

    if (!Object.keys(req.body).length > 0)
      return res.status(400).send({
        message:
          "If You want to update book so please provide some data for update",
      });

    const { title, excerpt, releasedAt, ISBN } = req.body;

    //Validation for req body

    if (title) {
      let findTitle = await bookModel.findOne({ title });
      if (findTitle)
        return res.status(400).send({
          massage: "title is already present with another book",
        });
    }

    if (ISBN) {
      if (!isbnRegex.test(ISBN)) {
        return res.status(400).send({
          message: "ISBN Should be 10 or 13 digits only",
        });
      }
      let isbnUnique = await bookModel.findOne({ ISBN });
      if (isbnUnique) {
        return res.status(400).send({ message: "ISBN all ready exists" });
      }
    }

    if (releasedAt) {
      if (!moment(releasedAt, "YYYY-MM-DD", true).isValid()) {
        return res.status(400).send({
          message:
            "invalid released Date format please provide date format Like YYYY-MM-DD",
        });
      }
    }

    // Update book

    const updatedBook = await bookModel.findByIdAndUpdate(bookId, req.body, {
      new: true,
    });

    res.status(200).send({ message: "success", data: updatedBook });
  } catch (error) {
    console.log("Error====>", error.message);
    res.status(500).send({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    let bookId = req.params.bookId;

    //Validation for book id
    if (!isValidObjectId(bookId))
      return res.status(400).send({ message: "Invalid Book Id" });

    // Delete book
    await bookModel.findByIdAndDelete(bookId);
    res.status(204).send({ message: "Success" });
  } catch (error) {
    console.log("Error====>", error.message);
    res.status(500).send({ error: error.message });
  }
};

module.exports = { createBook, getBooks, getBookById, updateBook, deleteBook };
