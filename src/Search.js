import { useState } from "react";
import { Link } from "react-router-dom";

function Search() {
    const [query, setQuery] = useState("");

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/" title="Back to home" aria-label="Back to home">Home</Link>
                <div className="search-books-input-wrapper">
                    <input type="text" autoFocus placeholder="Search by title, author, or ISBN"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                {!query && (
                    <div className="search-initial-container">
                        <div className="search-initial-text">Use the search box to find books</div>
                    </div>
                )}
                {query && (
                    <ol className="books-grid"></ol>
                )}
            </div>
        </div>
    );
}

export default Search;