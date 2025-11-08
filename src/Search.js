import { useState, useContext, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContext";
import { BookshelvesContext } from "./BookshelvesContext";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

/**
 * Debouncing took a bit to figure out.
 * 
 * References:
 * - https://dmitripavlutin.com/react-throttle-debounce/
 * - https://dmitripavlutin.com/controlled-inputs-using-react-hooks/#4-debouncing-the-controlled-input
 */
function Search() {
    // Track input value separately from filtering so the textbox updates smoothly
    const [inputValue, setInputValue] = useState("");
    // Query filter is updated after a delay to prevent unnecessary re-renders
    const [query, setQuery] = useState("");
    // Filtered books are books that match the query from the search API
    const [filteredBooks, setFilteredBooks] = useState([]);
    // Track if search is in progress
    // Needed so "No books found..." text doesn't display when search in progress
    const [isSearching, setIsSearching] = useState(false);

    const { loading, error } = useContext(AppContext);
    const { books, handleChangeShelf } = useContext(BookshelvesContext);

    // Display books with shelf of main book if it exists, otherwise use shelf of searched book
    // This is needed to properly display the BookControlMenu component in search results
    const displayedBooks = useMemo(() => {
        return filteredBooks.map((searchedBook) => {
            const mainBook = books.find((book) => book.id === searchedBook.id);

            return {
                ...searchedBook,
                shelf: mainBook?.shelf || searchedBook.shelf
            }
        });
    }, [filteredBooks, books]);


    // Update query after a delay to prevent unnecessary re-renders
    useEffect(() => {
        const timerId = setTimeout(() => {
            setQuery(prevQuery => prevQuery === inputValue ? prevQuery : inputValue);
        }, 500);

        return () => clearTimeout(timerId);
    }, [inputValue]);

    // Update input value when the textbox changes
    const onChangeQuery = (e) => {
        setInputValue(e.target.value);
    }

    // Update filtered books when query changes
    useEffect(() => {
        if (!query) {
            setFilteredBooks([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        BooksAPI.search(query, 100).then((books) => {
            // Check if response is an array (success) or an object with error
            if (Array.isArray(books)) {
                setFilteredBooks(books);
            }
            else {
                // API returned error object like {error: 'empty query', items: []}
                setFilteredBooks([]);
            }
        }).catch((error) => {
            setFilteredBooks([]);
        }).finally(() => {
            setIsSearching(false);
        });
    }, [query, setFilteredBooks]);

    // Changed the placeholder text to only display "Search by title" since the API only searches by title
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/" title="Back to home" aria-label="Back to home">Home</Link>
                <div className="search-books-input-wrapper">
                    <input type="text" autoFocus placeholder="Search by title"
                        value={inputValue}
                        onChange={onChangeQuery}
                    />
                </div>
            </div>

            {loading && !error && (<LoadingSpinner />)}
            {error && (<ErrorMessage error={error} />)}

            <div className="search-books-results">
                {!query && (
                    <div className="search-initial-container">
                        <div className="search-initial-text">Use the search box to find books</div>
                    </div>
                )}
                {query && !isSearching && filteredBooks.length === 0 && (
                    <div className="search-no-results-container">
                        <div className="search-no-results-text">
                            <span>No books found when searching for </span>
                            <span className="search-no-results-query">{query}</span></div>
                    </div>
                )}
                {query && (
                    <ol className="books-grid">
                        {displayedBooks.map((book) => (
                            <li key={book.id}>
                                <Book book={book} />
                            </li>
                        ))}
                    </ol>
                )}
            </div>
        </div>
    );
}

export default Search;