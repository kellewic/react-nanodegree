import { useState, useEffect, useMemo } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelf from "./BookShelf";

function App() {
  // State to store the books data
  const [books, setBooks] = useState([]);

  // Fetch books data from API
  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setBooks(books);
    });
  }, []);

  // Set up bookshelves so it only re-renders when the books change
  const bookshelves = useMemo(() => [
    {
      id: "currentlyReading",
      title: "Currently Reading",
      books: books.filter((book) => book.shelf === "currentlyReading"),
    },
    {
      id: "wantToRead",
      title: "Want To Read",
      books: books.filter((book) => book.shelf === "wantToRead"),
    },
    {
      id: "read",
      title: "Read",
      books: books.filter((book) => book.shelf === "read"),
    },
  ], [books]);

  return (
    < div className="app" >
      <div className="list-books-title"><h1>MyReads</h1></div>
      <div className="list-books-content">
        {bookshelves.map((bookshelf) => (
          <BookShelf key={bookshelf.id} title={bookshelf.title} books={bookshelf.books} />
        ))}
      </div>
    </div >
  );
}

export default App;
