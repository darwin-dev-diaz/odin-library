const addBookBtn = document.querySelector(".add-book-btn");
const shelf = document.querySelector(".shelf");
const addBookPopUp = document.querySelector(".add-book-popup");
function toggleAddBook() {
  addBookBtn.classList.toggle("clicked");
  shelf.classList.toggle("no-display");
  addBookPopUp.classList.toggle("no-display");
}
// toggle add book screen
addBookBtn.addEventListener("click", () => {
  toggleAddBook();
});

//wire add book pop up
function isFormFilled(form) {
  const children = form.children;
  for (child of children) {
    if (child.hasAttribute("required") && child.value === "") {
      return false;
    }
  }
  return true;
}

function createNewBook(title, author, pageNum, isRead) {
  // returns a book object
  const bookClassList = [
    "book-one",
    "book-two",
    "book-three",
    "book-four",
    "book-five",
    "book-six",
    "book-seven",
  ];
  const book = document.createElement("div");
  book.classList.add("book", bookClassList[Math.floor(Math.random() * 7)]);

  const bookTitle = document.createElement("div");
  bookTitle.classList.add("book-title");
  bookTitle.textContent = title;
  book.appendChild(bookTitle);

  const bookAuthor = document.createElement("div");
  bookAuthor.classList.add("book-author");
  bookAuthor.textContent = author;
  book.appendChild(bookAuthor);

  const cardPopUp = document.createElement("div");
  cardPopUp.classList.add("cardPopUp");

  const pages = document.createElement("div");
  pages.classList.add("pages");
  pages.textContent = `PAGES: ${pageNum}`;
  cardPopUp.appendChild(pages);
  
  const readButton = document.createElement("button");
  const readStatus = isRead ? 'read' : 'not-read';
  readButton.classList.add("read-btn", readStatus);
  cardPopUp.appendChild(readButton);
  
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.textContent = `DELETE`;
  cardPopUp.appendChild(deleteButton);

  book.appendChild(cardPopUp);

  return book;
}
const submitButton = document.querySelector(".submit-button");
submitButton.addEventListener("click", (event) => {
  const formL = document.querySelector("form");
  if (isFormFilled(form)) {
    event.preventDefault();
    toggleAddBook();
  }
});
