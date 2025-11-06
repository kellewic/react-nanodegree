# [Udacity React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019)

From Udacity's website:

> React is completely transforming the Front-End Development landscape. Come master this powerful UI library, and learn career-ready skills with Udacity. You'll learn how to build declarative user interfaces for the web with React, and for iOS and Android with React Native. You'll also learn how to manage state more predictably in your applications with Redux.

- **Intermediate** - 39 hours
- **6 courses** - 30 lessons, 3 projects

## Project

Create a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read. The project emphasizes using React to build the application and provides an API server and client library that you will use to persist information as you interact with the application.

### App Functionality

In this application, the main page displays a list of "shelves" (i.e. categories), each of which contains a number of books. The three shelves are:

- Currently Reading
- Want to Read
- Read

Each book has a control that lets you select the shelf for that book. When you select a different shelf, the book moves there. Note that the default value for the control should always be the current shelf the book is in.

The main page also has a link to /search, a search page that allows you to find books to add to your library.

The search page has a text input that may be used to find books. As the value of the text input changes, the books that match that query are displayed on the page, along with a control that lets you add the book to your library. To keep the interface consistent, you may consider re-using some of the code you used to display the books on the main page.

When a book is on a bookshelf, it should have the same state on both the main application page and the search page.

The search page also has a link to / (the root URL), which leads back to the main page.

When you navigate back to the main page from the search page, you should instantly see all of the selections you made on the search page in your library.

**Considerations**
The focus of this project is on writing functional React code, not on making the page beautiful. Feel free to spend some time working on your layout and CSS if you want to, but the goal for this project is correct functionality.
