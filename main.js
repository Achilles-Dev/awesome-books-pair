const form = document.querySelector('.input-form');
const main = document.querySelector('.main');

class Book {
  constructor(title, author) {
    this.title = title,
    this.author = author
  };
};

class MainUI {

  populateBooks() {
    const store = new Store();
    const books = store.getBooks();
      books.forEach((book) => {
        const mainUi = new MainUI();
        mainUi.createBook(book);
      });
    
  };

  createBook(book) {
    const booksContainer = document.querySelector('.books-container');
    const bookContainer = document.createElement('div');
bookContainer.className = 'single-book';
const authorContainer = document.createElement('div');
authorContainer.className='author-name'
const span =document.createElement('span');
span.textContent= 'by';
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
bookContainer.append(authorContainer, removeButton); ;
  
booksContainer.appendChild(bookContainer)
  };

  addBook(book) {
    const mainUi = new MainUI();
    mainUi.createBook(book);
  };

  removeBook(button) {
    const parentDiv = button.parentNode;
    parentDiv.remove();
  }

  clearInputs() {
    form.elements.title.value = '';
    form.elements.author.value = '';
  }

};

class Store {
  getBooks() {
    let books;
    if (localStorage.getItem('booksStored') === null) {
      books = [];
    } else {  
      books = JSON.parse(window.localStorage.getItem('booksStored'));
    }  
    return books;
  }

  addBook(book) {
    const store = new Store();
    const books = store.getBooks();

    books.push(book);
    window.localStorage.setItem('booksStored', JSON.stringify(books));
  }

  removeBook(button) {
    const store = new Store();
    const books = store.getBooks();
    const parentDiv = button.parentNode;
    const myTitle = parentDiv.querySelector('.title').textContent;
    const myAuthor = parentDiv.querySelector('.author').textContent;
    const booksLeft = books.filter((book) => book.title !== myTitle && book.author !== myAuthor);

    window.localStorage.setItem('booksStored', JSON.stringify(booksLeft));
  }
}

// Display Books 
const mainPage = new MainUI();
const store = new Store();
document.addEventListener('DOMContentLoaded', mainPage.populateBooks());

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

//Remove Book

document.addEventListener('click', (e) => {
  const button = e.target;
  if (button.className === 'remove-button') {
    mainPage.removeBook(button);
    store.removeBook(button);
  }
});
