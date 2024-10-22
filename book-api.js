const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

// Initialize express app
const app = express();
const port = 3000;

// Use cors and body-parser middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Load books from books.json file
let books = require('./books.json').books;

// Add a new book
app.post('/book', (req, res) => {
    const book = req.body;
    books.push(book);

    // Write updated data to books.json
    fs.writeFileSync('./books.json', JSON.stringify({ books }, null, 2));

    res.send('Book added successfully');
});

// Get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// Get a single book by ISBN
app.get('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const book = books.find(b => b.isbn === isbn);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

// Delete a book by ISBN
app.delete('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    books = books.filter(b => b.isbn !== isbn);

    // Write updated data to books.json
    fs.writeFileSync('./books.json', JSON.stringify({ books }, null, 2));

    res.send('Book deleted successfully');
});

// Edit a book by ISBN
app.post('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const updatedBook = req.body;

    for (let i = 0; i < books.length; i++) {
        if (books[i].isbn === isbn) {
            books[i] = updatedBook;

            // Write updated data to books.json
            fs.writeFileSync('./books.json', JSON.stringify({ books }, null, 2));

            res.send('Book updated successfully');
            return;
        }
    }

    res.status(404).send('Book not found');
});

// Start the server
app.listen(port, () => {
    console.log(`Book API is running on http://localhost:${port}`);
});
