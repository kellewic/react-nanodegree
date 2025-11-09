import { useContext, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { StarRating } from 'react-flexible-star-rating';
import { getLanguageName } from "./utils/languages";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import { AppContext } from "./context/AppContext";
import { getShelfTitle, BookshelvesContext } from "./context/BookshelvesContext";
import HomeLink from "./components/HomeLink";
import BookCoverImage from "./components/BookCoverImage";

function BookDetails() {
    const [isExpanded, setIsExpanded] = useState(false);

    const { loading, error } = useContext(AppContext);
    const { books } = useContext(BookshelvesContext);

    // Get book ID from Route parameter
    const { id } = useParams();
    const location = useLocation();

    // Note: this doesn't work if you copy/paste the URL to a new tab
    // Reference: https://api.reactrouter.com/v7/interfaces/react_router.LinkProps.html#state
    let book = location.state?.book || books.find((book) => book.id === id);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage error={error} />;
    }

    // Let user know if book not found and provide a link back home
    if (!book) {
        let error = new Error("Book not found");
        return (<>
            <ErrorMessage error={error} />
            <HomeLink styleClass="close-search-fixed" />
        </>
        );
    }

    const isLongDescription = book.description?.length > 600;

    return (
        <div className="details-container">
            <HomeLink styleClass="close-search-fixed" />
            <header className="details-book-header">
                <h1 className="details-book-title">{book.title}</h1>
                <div className="details-book-subtitle">{book?.subtitle}</div>
                <div className="details-book-authors">By {book.authors?.join(", ")}</div>
            </header>

            <div className="details-content-wrapper">
                <div className="details-book-cover">
                    <BookCoverImage book={book} />
                </div>

                <section className="details-book-details">
                    <div className="details-grid">
                        <div className="detail-row">
                            <div className="detail-item">
                                <span className="detail-label">ISBN:</span>
                                <span className="detail-value">
                                    {book.industryIdentifiers?.map((identifier) => identifier.identifier).join(", ")}
                                </span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Page count:</span>
                                <span className="detail-value">{book.pageCount}</span>
                            </div>
                        </div>

                        <div className="detail-row">
                            <div className="detail-item">
                                <span className="detail-label">Published:</span>
                                <span className="detail-value">{book.publishedDate}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Format:</span>
                                <span className="detail-value">{book.printType}</span>
                            </div>
                        </div>

                        <div className="detail-row">
                            <div className="detail-item">
                                <span className="detail-label">Publisher:</span>
                                <span className="detail-value">{book.publisher}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Language:</span>
                                <span className="detail-value">{getLanguageName(book.language)}</span>
                            </div>
                        </div>

                        <div className="detail-row">
                            <div className="detail-item">
                                <span className="detail-label">Category:</span>
                                <span className="detail-value">{book?.categories?.join(", ") || "N/A"}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Shelf:</span>
                                <span className="detail-value">{getShelfTitle(book?.shelf)}</span>
                            </div>
                        </div>

                        <div className="detail-row">
                            <div className="detail-item">
                                <span className="detail-label">Rating:</span>
                                <span className="detail-value">
                                    {
                                        book?.averageRating ? (
                                            <div className="rating-readonly">
                                                <StarRating
                                                    starsLength={5}
                                                    initialRating={book.averageRating}
                                                    isReadOnly={true}
                                                    dimension={5}
                                                    isHalfRatingEnabled={true}
                                                />
                                            </div>
                                        ) : "None"
                                    }
                                </span>
                            </div>
                            <div className="detail-item">
                            </div>
                        </div>
                    </div>

                    <div className={`details-book-description ${isLongDescription && !isExpanded ? 'description-collapsed' : ''}`}>
                        {book.description}
                        {isLongDescription && !isExpanded && <div className="description-fade"></div>}
                    </div>
                    {isLongDescription && (
                        <button
                            className="description-toggle-btn"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? 'Show Less ▲' : 'Show More ▼'}
                        </button>
                    )}
                </section>
            </div>
        </div>
    );
}

export default BookDetails;