/*
    Rather than deal with messy props drilling, we use the Context API to pass bookshelves data down to components.

    References:
    - https://react.dev/reference/react/createContext
    - https://react.dev/learn/passing-data-deeply-with-context
*/
import { createContext } from "react";

export const BookshelvesContext = createContext({
    bookshelves: [],
    handleChangeShelf: () => {
        throw new Error("handleChangeShelf function must be provided to BookshelvesContext");
    },
});