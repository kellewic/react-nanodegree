import PropTypes from "prop-types";

const Book = ({ book }) => {
    const bookTitle = book.subtitle ? `${book.title}: ${book.subtitle}` : book.title;

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover"
                    style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks?.thumbnail})` }}></div>
            </div>
            {/*
        <div className="book-shelf-changer">
            <select>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
            </select>
        </div>
        */}
            <div className="book-title">{bookTitle}</div>
            <div className="book-authors">{book.authors?.join(", ")}</div>
        </div>
    );
};

Book.propTypes = {
    book: PropTypes.object.isRequired,
};

export default Book;