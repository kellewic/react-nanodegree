const BookShelf = ({ title, books }) => {
    //console.log(books);
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.length === 0 && <li className="no-books">No books on this shelf</li>}
                    {books.length > 0 && books.map((book) => (
                        <li key={book.id}>
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
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors?.join(", ")}</div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default BookShelf;