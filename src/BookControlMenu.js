import PropTypes from "prop-types";
import { useContext } from "react";
import { BookshelvesContext } from "./BookshelvesContext";

const BookControlMenu = ({ book }) => {
    const { bookshelves, handleChangeShelf } = useContext(BookshelvesContext);

    return (
        <div className="book-shelf-changer">
            <select value={book.shelf} onChange={(e) => handleChangeShelf(book, e.target.value)}>
                <option value="move" disabled>Move to...</option>
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