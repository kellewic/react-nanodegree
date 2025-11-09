/**
    Rather than deal with messy props drilling, use Context API to pass bookshelves data down to components.

    References:
    - https://react.dev/reference/react/createContext
    - https://react.dev/learn/passing-data-deeply-with-context
*/
import { createContext } from "react";

export const SHELVES = {
    CURRENTLY_READING: "currentlyReading",
    WANT_TO_READ: "wantToRead",
    READ: "read",
    NONE: "none",
    REMOVE: "remove",
};

export const SHELF_CONFIG = [
    {
        id: SHELVES.CURRENTLY_READING,
        title: "Currently Reading",
    },
    {
        id: SHELVES.WANT_TO_READ,
        title: "Want To Read",
    },
    {
        id: SHELVES.READ,
        title: "Read",
    },
];

/**
 * Get the title of a shelf from its ID
 * @param {string} shelfId - Shelf ID
 * @returns {string} Shelf title
 */
export const getShelfTitle = (shelfId) => {
    return SHELF_CONFIG.find((shelf) => shelf.id === shelfId)?.title || "None";
}

export const BookshelvesContext = createContext({
    books: [],
    bookshelves: [],
    handleChangeShelf: () => {
        throw new Error("handleChangeShelf function must be provided to BookshelvesContext");
    },
});