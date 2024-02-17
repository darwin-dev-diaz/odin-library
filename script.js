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

function Book(title, author, pageNum, isRead) {
  const bookClassList = [
    "book-one",
    "book-two",
    "book-three",
    "book-four",
    "book-five",
    "book-six",
    "book-seven",
  ];
  this.title = title;
  this.author = author;
  this.pageNum = pageNum;
  this.isRead = isRead;
  this.color = bookClassList[Math.floor(Math.random() * 7)];
}

const library = [
  new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true),
  new Book("To Kill a Mockingbird", "Harper Lee", 281, false),
  new Book("1984", "George Orwell", 328, true),
  new Book("The Catcher in the Rye", "J.D. Salinger", 214, false)
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
  cardPopUp.appendChild(readButton);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.textContent = `DELETE`;
  
  deleteButton.addEventListener('click',(event)=>{
    let bookIndex = Array(...shelf.children).indexOf(event.target.parentElement.parentElement.parentElement);

    library.splice(bookIndex,1);

    let occupiedShelfSlots = document.querySelectorAll('.shelf-slot:not(:empty)');
    occupiedShelfSlots.forEach((slot)=>slot.innerHTML = '');
    library.forEach(book=>addBookToLibrary(book));

    console.log({bookIndex, occupiedShelfSlots, library});
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
    
    const occupiedShelfSlots = document.querySelectorAll('.shelf-slot:not(:empty)');
    occupiedShelfSlots.forEach((slot)=>slot.innerHTML = '');
    
    library.push(bookObj);
    library.forEach(book=>addBookToLibrary(book));
    formL.reset();
  }
});

///////////////WIRE DELETE BUTTON///////////////
// const deleteButtons = document.querySelectorAll('.delete-btn');
// deleteButtons.forEach(deleteButton=>{
//   deleteButton.addEventListener('click',(event)=>{
//     let bookIndex = Array(...shelf.children).indexOf(event.target.parentElement.parentElement.parentElement);

//     library.splice(bookIndex,1);

//     let occupiedShelfSlots = document.querySelectorAll('.shelf-slot:not(:empty)');
//     occupiedShelfSlots.forEach((slot)=>slot.innerHTML = '');
//     library.forEach(book=>addBookToLibrary(book));

//     console.log({bookIndex, occupiedShelfSlots, library});
//   });
// });