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
const submitButton = document.querySelector(".submit-button");
submitButton.addEventListener("click", (event) => {
  const formL = document.querySelector("form");
  // event.stopPropagation();
  if (isFormFilled(form)) {
      event.preventDefault();
      toggleAddBook();
  }
});
