import PropTypes from "prop-types";
import { useContext } from "react";
import { BookshelvesContext } from "./BookshelvesContext";

/**
 * Displays control menu to move book to a different shelf
 * @param {Object} book - Book to display
 */
const BookControlMenu = ({ book }) => {
    const { bookshelves, handleChangeShelf } = useContext(BookshelvesContext);

    return (
        <div className="book-shelf-changer">
            <select value={book.shelf || "none"} onChange={(e) => handleChangeShelf(book, e.target.value)}>
                <option value="move" disabled>Move to...</option>
                {book?.shelf &&
                    <option className="book-shelf-changer-remove" value="remove">Remove from shelf</option>
                }
                {!book?.shelf &&
                    <option value="none">None</option>
                }
                {bookshelves.map((bookshelf) => (
                    <option key={bookshelf.id} value={bookshelf.id}>{bookshelf.title}</option>
                ))}
            </select>
        </div>
    )
}

BookControlMenu.propTypes = {
    book: PropTypes.object.isRequired,
};

export default BookControlMenu;