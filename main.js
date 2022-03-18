/* eslint-disable max-classes-per-file */

import luxon from './luxon.js';

const form = document.querySelector('.input-form');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Store {
  getBooks = () => {
    let books;
    if (localStorage.getItem('booksStored') === null) {
      books = [];
    } else {
      books = JSON.parse(window.localStorage.getItem('booksStored'));
    }
    return books;
  }

  addBook = (book) => {
    const books = this.getBooks();

    books.push(book);
    window.localStorage.setItem('booksStored', JSON.stringify(books));
  }

  removeBook = (button) => {
    const books = this.getBooks();
    const parentDiv = button.parentNode;
    const myTitle = parentDiv.querySelector('.title').textContent;
    const myAuthor = parentDiv.querySelector('.author').textContent;
    const booksLeft = books.filter((book) => book.title !== myTitle && book.author !== myAuthor);

    window.localStorage.setItem('booksStored', JSON.stringify(booksLeft));
  }
}

class MainUI {
  populateBooks = () => {
    const store = new Store();
    const books = store.getBooks();
    books.forEach((book) => {
      this.createBook(book);
    });
  }

  createBook = (book) => {
    const booksContainer = document.querySelector('.books-container');
    const bookContainer = document.createElement('div');
    bookContainer.className = 'single-book';
    const authorContainer = document.createElement('div');
    authorContainer.className = 'author-name';
    const span = document.createElement('span');
    span.textContent = 'by';
    const bookTitle = document.createElement('h3');
    bookTitle.className = 'title';
    const bookAuthor = document.createElement('h3');
    bookAuthor.className = 'author';
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-button';
    removeButton.textContent = 'Remove';
    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    authorContainer.append(bookTitle, span, bookAuthor);
    bookContainer.append(authorContainer, removeButton);

    booksContainer.appendChild(bookContainer);
  }

  addBook = (book) => {
    this.createBook(book);
  }

  removeBook = (button) => {
    const parentDiv = button.parentNode;
    parentDiv.remove();
  }

  clearInputs = () => {
    form.elements.title.value = '';
    form.elements.author.value = '';
  }
}

const mainPage = new MainUI();
const store = new Store();

const addBookSection = document.querySelector('.bottom-container');
const contactSection = document.querySelector('.contact');
const displayBookSection = document.querySelector('.top-container');

// Date
const date = document.querySelector('.date');
const dateTime = luxon.DateTime.utc().toLocaleString(luxon.DateTime.DATETIME_FULL);
date.textContent = dateTime;

// Display Books
document.addEventListener('DOMContentLoaded', () => {
  mainPage.populateBooks();
  contactSection.style.display = 'none';
  addBookSection.style.display = 'none';
});

// Add Book
const addButton = document.querySelector('#add-button');
addButton.addEventListener('click', () => {
  const title = form.elements.title.value;
  const author = form.elements.author.value;
  const newBook = new Book(title, author);

  mainPage.addBook(newBook);
  store.addBook(newBook);
  mainPage.clearInputs();
});

// Remove Book

document.addEventListener('click', (e) => {
  const button = e.target;
  if (button.className === 'remove-button') {
    mainPage.removeBook(button);
    store.removeBook(button);
  } else if (button.parentNode.id === 'list') {
    displayBookSection.style.display = 'flex';
    contactSection.style.display = 'none';
    addBookSection.style.display = 'none';
  } else if (button.parentNode.id === 'add') {
    addBookSection.style.display = 'flex';
    contactSection.style.display = 'none';
    displayBookSection.style.display = 'none';
  } else if (button.parentNode.id === 'contact') {
    addBookSection.style.display = 'none';
    contactSection.style.display = 'flex';
    displayBookSection.style.display = 'none';
  }
});
