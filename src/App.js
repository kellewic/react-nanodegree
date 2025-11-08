import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";
import { BookshelvesContext } from "./BookshelvesContext";
import "./App.css";

function App() {
  // State to store the books data
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch books data from API on component mount
  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setBooks(books);
      setLoading(false);
    }).catch((error) => {
      setError(error);
      setLoading(false);
    });
  }, []);

  // Set up bookshelves to only re-render when books change
  // https://react.dev/reference/react/useMemo
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

  // Handle changing the shelf of a book
  const handleChangeShelf = useCallback((book, newShelf) => {
    // Update book's shelf via API
    BooksAPI.update(book, newShelf).then(() => {
      // Update book's shelf in local state
      // Use the updater function of useState so this handler never re-renders since we have no dependencies
      // https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state
      setBooks((prevBooks) => prevBooks.map((b) => b.id === book.id ? { ...b, shelf: newShelf } : b));
    });
  }, []);

  // Create bookshelves context and only re-render when bookshelves change
  const bookshelvesContextValue = useMemo(() => ({
    bookshelves,
    handleChangeShelf,
  }), [bookshelves, handleChangeShelf]);

  return (
    <div className="app">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>

      {loading && !error && (
        <div className="loader-container">
          <div className="loader">Loading...</div>
        </div>
      )}

      {error && (
        <div className="error-container">
          <div className="error">Error: {error.message}</div>
        </div>
      )}

      {!loading && !error && (
        <BookshelvesContext value={bookshelvesContextValue}>
          <div className="list-books-content">
            {bookshelves.map((bookshelf) => (
              <BookShelf key={bookshelf.id} title={bookshelf.title} books={bookshelf.books} />
            ))}
          </div>
        </BookshelvesContext>
      )}

      <div className="open-search">
        <Link to="/search" title="Search for books" aria-label="Search for books">Search</Link>
      </div>
    </div>
  );
}

export default App;
