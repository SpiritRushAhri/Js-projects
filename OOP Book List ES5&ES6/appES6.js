class Book {
  constructor (title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
// Add all the prototype functions we had in ES5 as methods here
class UI {
  addBookToList (book){
    const list = document.querySelector('#book-list');
    // Create table row element
    const row = document.createElement('tr');
    // Insert col
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X<a></td>
    `;
    // Add row
    list.appendChild(row);
  }
  deleteBook (target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }
  showAlert (message, className){
    // Make the element
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text node
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    // Container is parent, insert alert
    container.insertBefore(div,form);
    // Show for 2 seconds
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 2000);
  }
  clearFields (){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}
// Local Storage Class
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui  = new UI;

      // Add book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index){
     if(book.isbn === isbn) {
      books.splice(index, 1);
     }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);
// Event Listener for add book
document.querySelector('#book-form').addEventListener('submit', function(e){
  // Get form values
  const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;
  // Instantiate book object
  const book = new Book(title,author,isbn);

  // Instantiate UI Object
  const ui = new UI();

  // Validate user input
  if(title === '' || author === '' || isbn === ''){
    ui.showAlert('Please fill in all input fields', 'error');
  }
  else {
    // Add book to list
    ui.addBookToList(book);
    // add to local storage
    Store.addBook(book);
    // show book added
    ui.showAlert('Book Added!', 'success');
    // Clear input fields
    ui.clearFields();
  }
  e.preventDefault();
});

// Event Listener for delete book
document.querySelector('#book-list').addEventListener('click', function(e){
  // Instantiate UI Object
  const ui = new UI();
  // delete book
  ui.deleteBook(e.target);
  // remove from local storage by getting unique identifier = isbn #
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  // Show deleted message
  ui.showAlert('Book removed from list', 'success');
  e.preventDefault();
});
