const addBookBtn = document.querySelector(".add-book-btn");
const shelf = document.querySelector(".shelf");
const addBookPopUp = document.querySelector(".add-book-popup");
function toggleAddBook() {
  addBookBtn.classList.toggle("clicked");
  shelf.classList.toggle("no-display");
  addBookPopUp.classList.toggle("no-display");
}
///////////////TOGGLE ADD BOOK SCREEN///////////////
addBookBtn.addEventListener("click", () => {
  toggleAddBook();
});

////////////////WIRE ADD BOOK FORM////////////////
function isFormFilled(form) {
  const children = form.children;
  for (child of children) {
    if (child.hasAttribute("required") && child.value === "") {
      return false;
    }
  }
  return true;
}

class Book {
  static numbers = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
    "twenty",
    "twenty-one",
    "twenty-two",
    "twenty-three",
    "twenty-four",
    "twenty-five",
    "twenty-six",
    "twenty-seven",
    "twenty-eight",
    "twenty-nine",
    "thirty",
    "thirty-one",
    "thirty-two",
    "thirty-three",
    "thirty-four",
    "thirty-five",
    "thirty-six",
    "thirty-seven",
    "thirty-eight",
    "thirty-nine",
    "forty",
    "forty-one",
    "forty-two",
    "forty-three",
    "forty-four",
    "forty-five",
    "forty-six",
    "forty-seven",
    "forty-eight",
    "forty-nine",
    "fifty",
  ];
  constructor(title, author, pageNum, isRead) {
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.isRead = isRead;
    this.color = `book-${Book.numbers[Math.floor(Math.random() * Book.numbers.length)]}`
  }
}



const library = [
  new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true),
  new Book("To Kill a Mockingbird", "Harper Lee", 281, false),
  new Book("1984", "George Orwell", 328, true),
  new Book("Moby-Dick", "Herman Melville", 624, true),
  new Book("War and Peace", "Leo Tolstoy", 1392, false),
];

function addBookToLibrary(bookObj) {
  // returns a book object

  const bookElement = document.createElement("div");
  bookElement.classList.add("book", bookObj.color);

  const bookTitle = document.createElement("div");
  bookTitle.classList.add("book-title");
  bookTitle.textContent = bookObj.title;
  bookElement.appendChild(bookTitle);

  const bookAuthor = document.createElement("div");
  bookAuthor.classList.add("book-author");
  bookAuthor.textContent = bookObj.author;
  bookElement.appendChild(bookAuthor);

  const cardPopUp = document.createElement("div");
  cardPopUp.classList.add("cardPopUp");

  const pages = document.createElement("div");
  pages.classList.add("pages");
  pages.textContent = `PAGES: ${bookObj.pageNum}`;
  cardPopUp.appendChild(pages);

  const readButton = document.createElement("button");
  const readStatus = bookObj.isRead ? "read" : "not-read";
  readButton.classList.add("read-btn", readStatus);
  readButton.addEventListener("click", (event) => {
    readButton.classList.toggle("read");
    readButton.classList.toggle("not-read");
  });
  cardPopUp.appendChild(readButton);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.textContent = `DELETE`;
  deleteButton.addEventListener("click", (event) => {
    let bookIndex = Array(...shelf.children).indexOf(
      event.target.parentElement.parentElement.parentElement
    );

    library.splice(bookIndex, 1);

    let occupiedShelfSlots = document.querySelectorAll(
      ".shelf-slot:not(:empty)"
    );
    occupiedShelfSlots.forEach((slot) => (slot.innerHTML = ""));
    library.forEach((book) => addBookToLibrary(book));
  });

  cardPopUp.appendChild(deleteButton);

  bookElement.appendChild(cardPopUp);

  let nextEmptyShelfSlot = document.querySelector(".shelf-slot:empty");
  nextEmptyShelfSlot.appendChild(bookElement);
}

library.forEach((bookObj) => {
  addBookToLibrary(bookObj);
});

const submitButton = document.querySelector(".submit-button");
submitButton.addEventListener("click", (event) => {
  const formL = document.querySelector("form");
  if (isFormFilled(formL)) {
    toggleAddBook();
    event.preventDefault();
    let bookObj = new Book(
      document.querySelector("#title").value,
      document.querySelector("#author").value,
      document.querySelector("#pages").value,
      document.querySelector("#isRead").value === "on" ? true : false
    );

    const occupiedShelfSlots = document.querySelectorAll(
      ".shelf-slot:not(:empty)"
    );
    occupiedShelfSlots.forEach((slot) => (slot.innerHTML = ""));

    library.push(bookObj);
    library.forEach((book) => addBookToLibrary(book));
    formL.reset();
  }
});
