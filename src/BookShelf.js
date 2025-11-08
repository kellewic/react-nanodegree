import PropTypes from "prop-types";
import Book from "./Book";

/**
 * Displays bookshelf with title and books
 * @param {Object} title - Title of the bookshelf
 * @param {Object} books - Books to display
 */
const BookShelf = ({ title, books }) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.length === 0 && <li className="no-books">No books on this shelf</li>}
                    {books.length > 0 && books.map((book) => (
                        <li key={book.id}>
                            <Book book={book} />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

BookShelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BookShelf;