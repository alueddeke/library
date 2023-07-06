let myLibrary = [];

//constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
//grab dom elements we want to be in new object
//put these elements into a new object using constructor
function addBookToLibrary() {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let read = document.querySelector("#read").checked;

  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

//display form using button
let newBookbtn = document.querySelector("#add-button");
newBookbtn.addEventListener("click", function () {
  let newBookForm = document.querySelector("#book-form");
  newBookForm.style.display = "flex";
});

//preventDefault- stops it from sending data to backend
document
  .querySelector("#book-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    addBookToLibrary();
    setLoop();
    document.querySelector("#book-form").style.display = "none";
  });

//loop through every book in original array
//delete remaining html from previous loop so nothing doubles
//on each loop, send to render function
function setLoop() {
  const libContainer = document.querySelector("#library");
  libContainer.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    render(myLibrary[i]);
  }
}

//display that book, with the info submitted on form
//create div within function, empty it on each execution
function render(book) {
  let libraryEl = document.querySelector("#library");
  let bookEl = document.createElement("div");
  bookEl.setAttribute("class", "book-card");
  bookEl.setAttribute("id", "card");
  bookEl.innerHTML = `
    <div class="info" id= "book-title"><h3>${book.title}</h3></div>
    <div class="info"><h5 >${book.author}</h5></div>
    <div class= "info"><p> ${book.pages} pages</p></div>`;

  let btnEl = document.createElement("div");
  btnEl.setAttribute("class", "readBtns");
  let readBtn = document.createElement("button");

  if (book.read === true) {
    readBtn.setAttribute("class", "readBtn");
    readBtn.textContent = "Have Read";
    readBtn.style.width = "5rem";

    let removeBtn = document.createElement("button");
    removeBtn.setAttribute("id", "remove");
    removeBtn.textContent = "Remove";

    //removing a specific book via its position in array(index)
    //splice removes/replaces array contents
    removeBtn.addEventListener("click", function removeBook(book) {
      //remove index element, only 1 of them
      myLibrary.splice(book, 1);
      setLoop();
    });

    btnEl.appendChild(readBtn);
    btnEl.appendChild(removeBtn);

    bookEl.appendChild(btnEl);
  } else {
    readBtn.setAttribute("class", "notreadBtn");
    readBtn.textContent = "Have Not Read Yet";

    //toggle read/not read status
    readBtn.addEventListener("click", () => {
      book.read === true;
    });

    let removeBtn = document.createElement("button");
    removeBtn.setAttribute("id", "remove");
    removeBtn.textContent = "Remove";

    //same remove function available in not read status
    removeBtn.addEventListener("click", function removeBook(book) {
      myLibrary.splice(book, 1);
      setLoop();
    });
    btnEl.appendChild(readBtn);
    btnEl.appendChild(removeBtn);
    bookEl.appendChild(btnEl);
  }
  readBtn.addEventListener("click", () => {
    book.read = !book.read;
    setLoop();
  });
  libraryEl.appendChild(bookEl);
}
