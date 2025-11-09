import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { BookshelvesContext } from "./context/BookshelvesContext";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import BookShelf from "./components/BookShelf";

function Home() {
    const { loading, error } = useContext(AppContext);
    const { bookshelves } = useContext(BookshelvesContext);

    return (
        <div className="app">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>

            {loading && !error && (<LoadingSpinner />)}
            {error && (<ErrorMessage error={error} />)}

            {!loading && !error && (
                <div className="list-books-content">
                    {bookshelves.map((bookshelf) => (
                        <BookShelf key={bookshelf.id} title={bookshelf.title} books={bookshelf.books} />
                    ))}
                </div>
            )}

            <div className="open-search">
                <Link to="/search" title="Search for books" aria-label="Search for books">Search</Link>
            </div>
        </div>
    );
}

export default Home;