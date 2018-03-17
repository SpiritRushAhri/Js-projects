// Andrew Fancett 3-1-2018
// Book List app using oop ES5/ES6

// Book constructor
function Book(title,author,isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
// UI Constructor
function UI(){}
// Add book prototype function
UI.prototype.addBookToList = function(book){
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

// Show Alert prototype
UI.prototype.showAlert = function(message, className){
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
// Delete book
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}
// Clear input fields prototype function
UI.prototype.clearFields = function (){
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';
}

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
  // Show deleted message
  ui.showAlert('Book removed from list', 'success');
  e.preventDefault();
});
