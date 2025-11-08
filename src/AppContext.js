/*
    Rather than deal with messy props drilling, use the Context API to pass app data down to components.

    References:
    - https://react.dev/reference/react/createContext
    - https://react.dev/learn/passing-data-deeply-with-context
*/
import { createContext } from "react";

export const AppContext = createContext({
    loading: true,
    error: null,
});