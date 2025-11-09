import { useState, useEffect, useMemo, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import { AppContext } from "./AppContext";
import { SHELVES, SHELF_CONFIG, BookshelvesContext } from "./BookshelvesContext";
import Home from "./Home";
import Search from "./Search";
import BookDetails from "./BookDetails";
import "./App.css";

function App() {
  // State to store the books data
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch books data from API on component mount
  useEffect(() => {
    // StrictMode can be annoying when fetching data. Workaround to prevent multiple calls to the API.
    // Reference: https://react.dev/learn/synchronizing-with-effects#fetching-data
    let cancelled = false;

    BooksAPI.getAll().then((books) => {
      if (cancelled) return;
      setBooks(books);
      setLoading(false);
    }).catch((error) => {
      if (cancelled) return;
      setError(error);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Set up bookshelves to only re-render when books change
  // Reference: https://react.dev/reference/react/useMemo
  const bookshelves = useMemo(() => {
    return SHELF_CONFIG.map((shelf) => ({
      ...shelf,
      books: books.filter((book) => book.shelf === shelf.id),
    }));
  }, [books]);

  // Handle changing the shelf of a book
  const handleChangeShelf = useCallback((book, newShelf) => {
    // Update book's shelf via API
    BooksAPI.update(book, newShelf).then(() => {
      // Update book's shelf in local state
      // Use the updater function of useState so this handler never re-renders since we have no dependencies
      // Reference: https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state
      setBooks((prevBooks) => {
        const bookExists = prevBooks.some((b) => b.id === book.id);

        if (newShelf === SHELVES.REMOVE) {
          return prevBooks.filter((b) => b.id !== book.id);
        }
        else if (bookExists) {
          return prevBooks.map((b) => b.id === book.id ? { ...b, shelf: newShelf } : b);
        }
        else {
          return [...prevBooks, { ...book, shelf: newShelf }];
        }
      });
    });
  }, []);

  // Create bookshelves context and only re-render when bookshelves change
  const bookshelvesContextValue = useMemo(() => {
    return {
      books,
      bookshelves,
      handleChangeShelf,
    };
  }, [books, bookshelves, handleChangeShelf]);

  // Create app context and only re-render when loading or error change
  const appContextValue = useMemo(() => {
    return {
      loading,
      error,
    };
  }, [loading, error]);

  return (
    <AppContext value={appContextValue}>
      <BookshelvesContext value={bookshelvesContextValue}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
      </BookshelvesContext>
    </AppContext>
  );
}

export default App;
