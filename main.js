const addButton = document.querySelector('#add-button');

const form = document.querySelector('.input-form');
const booksContainer = document.querySelector('.books-container');

// create Book */
const createBook = (book) => {
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
  bookContainer.append(authorContainer, removeButton);

 booksContainer.appendChild(bookContainer)
};

/* Add book to localStorage */
const addBook = () => {
  let existingBooks = JSON.parse(window.localStorage.getItem('booksStored'));
  if (existingBooks === null) existingBooks = [];
  const title = form.elements.title.value;
  const author = form.elements.author.value;
  const book = {
    title,
    author,
  };
  existingBooks.push(book);
  window.localStorage.setItem('booksStored', JSON.stringify(existingBooks));
  createBook(book);
};

const populateBooks = () => {
  const books = JSON.parse(window.localStorage.getItem('booksStored'));
  if (localStorage.getItem('booksStored')) {
    books.forEach((book) => {
      createBook(book);
    });
  }
};

window.onload = populateBooks;

addButton.addEventListener('click', () => {
  addBook();
  form.elements.title.value = '';
  form.elements.author.value = '';
});

/* Remove book */

const removeBook = (button) => {
  const oldBooks = JSON.parse(window.localStorage.getItem('booksStored'));
  const parentDiv = button.parentNode;
  const myTitle = parentDiv.querySelector('.title').textContent;
  const myAuthor = parentDiv.querySelector('.author').textContent;
  const booksLeft = oldBooks.filter((book) => book.title !== myTitle && book.author !== myAuthor);
  window.localStorage.setItem('booksStored', JSON.stringify(booksLeft));

  parentDiv.remove();
};

document.addEventListener('click', (e) => {
  const button = e.target;
  if (button.className === 'remove-button') {
    removeBook(button);
  }
});