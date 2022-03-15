const addButton = document.querySelector('#add-button');

const form = document.querySelector('.input-form');
const main = document.querySelector('.main');
let books = JSON.parse(window.localStorage.getItem('booksStored'));

/* Add book to localStorage */
const addBook = () => {
  if (books === null) books = [];
  let title = form.elements.title.value;
  let author = form.elements.author.value;
  let book = {
    title, 
    author
  }
  books.push(book);
  window.localStorage.setItem('booksStored', JSON.stringify(books));
  let bookContainer = document.createElement('div');
  bookContainer.className = 'single-book';
  let bookTitle = document.createElement('h3');
  let bookAuthor = document.createElement('h3');
  let removeButton = document.createElement('button');
  removeButton.className = 'remove-button';
  removeButton.textContent = 'Remove';
  removeButton.id = books.indexOf(book);
  bookTitle.textContent = title;
  bookAuthor.textContent = author;
  bookContainer.append(bookTitle, bookAuthor, removeButton);

  main.insertBefore(bookContainer, form);
};

const populateBooks = () => {
  if (localStorage.getItem('booksStored')) {
    books.forEach((book) => {
      let bookContainer = document.createElement('div');
      bookContainer.className = 'single-book';
      let bookTitle = document.createElement('h3');
      let bookAuthor = document.createElement('h3');
      let removeButton = document.createElement('button');

      removeButton.className = 'remove-button';
      removeButton.textContent = 'Remove';
      removeButton.id = books.indexOf(book);
      bookTitle.textContent = book.title;
      bookAuthor.textContent = book.author;
      bookContainer.append(bookTitle, bookAuthor, removeButton);

      main.insertBefore(bookContainer, form);
    } )
  }
}

window.onload = populateBooks;

addButton.addEventListener('click', () => {
  addBook();
  form.elements.title.value = '';
  form.elements.author.value = '';
});

/*Remove book*/

const removeBook = (bookIndex) => {
let remainingBooks = books.filter((book, index) => index != bookIndex);
window.localStorage.setItem('booksStored', JSON.stringify(remainingBooks));

let buttonElement = document.getElementById(bookIndex);
let parentDiv = buttonElement.parentNode;
parentDiv.remove();
}

document.addEventListener('click', (e) => {
let button = e.target;
if (button.className === 'remove-button') {
let buttonId = button.id;
removeBook(buttonId);
}
}); 