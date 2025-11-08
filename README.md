# MyReads - Book Tracking App

A bookshelf application that allows you to organize books into three categories: Currently Reading, Want to Read, and Read. Built as part of the [Udacity React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019) program final project.

## Overview

MyReads provides an intuitive interface to manage your reading list. Search for books, categorize them into shelves, and track your reading progress all in one place.

## Features

- Organize books into "Currently Reading", "Want to Read", and "Read" categories
- Search for books by title with real-time results
- Optimized search with debouncing to reduce unnecessary API calls
- Book selections are saved and synchronized across the app
- Visual feedback during data fetching
- Error messages for better user experience

## Installation

### Steps

**Clone the repository** (or download the project files)

```
git clone <repository-url>
cd react-nanodegree
```

**Install dependencies**

```
npm install
```

## Running the Application

### Development Mode

To run the app in development mode with hot reload:

```
npm run dev
```

The application will open at [http://localhost:3001](http://localhost:3001)

### Production Mode

To build and run the production version:

```
npm start
```

The application will be available at [http://localhost:3001](http://localhost:3001)

### Build Only

To create a production build without running:

```
npm run build
```

## How to Use

1. **Main Page**: View your books organized into three shelves
2. **Move Books**: Use the dropdown menu on each book to change its shelf
3. **Search Books**: Click the "+" button or navigate to /search
4. **Add Books**: Search for books and add them to a shelf using the dropdown
5. **Return Home**: Click "Home" (upper-right back arrow) to return to main bookshelf view or navigate to /

## Implementation Notes

- Search queries are debounced with a 500ms delay to optimize API calls
- Books added in search appear immediately on the main page
- Uses React Context for global state management (loading, error, and bookshelves)
- Search results correctly show the shelf status for books already in your library
- [React Compiler](https://react.dev/learn/react-compiler) used for automatic component memoization, combined with manual `useMemo`/`useCallback` optimization for critical state management functions
- Constants are exported from context files to avoid magic strings and improve maintainability

## API Backend

The project uses a backend API provided by Udacity for book data and persistence. The API is accessed through the `BooksAPI.js` utility module.

## License

This project was created for educational purposes as part of Udacity's React Nanodegree program.
