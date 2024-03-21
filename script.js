// alright. the goal now it to validate the form using only js and the the constraint validation API

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
// function isFormFilled(form) {
//   const children = form.children;
//   for (child of children) {
//     if (child.hasAttribute("required") && child.value === "") {
//       return false;
//     }
//   }
//   return true;
// }

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
    this.color = `book-${
      Book.numbers[Math.floor(Math.random() * Book.numbers.length)]
    }`;
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

const firstThreeInputs = Array.from(document.querySelectorAll("input")).slice(
  0,
  3
);

firstThreeInputs.forEach((input, i) => {
  input.addEventListener("input", (event) => {
    const errorBox = document.querySelectorAll(".error")[i];
    if (input.validity.valid) {
      errorBox.textContent = "";
      errorBox.className = "error";
    } else {
      showError(input, errorBox);
    }
  });
});

function isEveryInputValid(array, testFunction) {
  let returnResult = true;
  array.forEach((input, i) => {
    if (!testFunction(input)) {
      const errorBox = document.querySelectorAll(".error")[i];
      showError(input, errorBox);
      returnResult = false;
    }
  });

  return returnResult;
}
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  if (!isEveryInputValid(firstThreeInputs, (input) => input.validity.valid)) {
    event.preventDefault();
  } else {
    event.preventDefault();
    toggleAddBook();
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
    form.reset();
  }
});

function showError(input, errorBox) {
  if (
    (input.validity.valueMissing && input.value === "e") ||
    input.value === "E"
  ) {
    errorBox.textContent = `Cannot enter e!`;
  } else if (input.validity.valueMissing) {
    errorBox.textContent = "Field cannot be blank.";
  } else if (input.validity.tooShort) {
    errorBox.textContent = `Text should be at least ${input.minLength} characters. You entered ${input.value.length} characters.`;
  } else if (input.validity.rangeUnderflow) {
    errorBox.textContent = `Min value is 1`;
  }
  errorBox.classList = "error error--active";
}
