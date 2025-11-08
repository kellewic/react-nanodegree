import { useState, useEffect, useMemo, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import { AppContext } from "./AppContext";
import { BookshelvesContext } from "./BookshelvesContext";
import Home from "./Home";
import Search from "./Search";
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
    books,
    bookshelves,
    handleChangeShelf,
  }), [books, bookshelves, handleChangeShelf]);

  // Create app context and only re-render when loading or error change
  const appContextValue = useMemo(() => ({
    loading,
    error,
  }), [loading, error]);

  return (
    <AppContext value={appContextValue}>
      <BookshelvesContext value={bookshelvesContextValue}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BookshelvesContext>
    </AppContext>
  );
}

export default App;
