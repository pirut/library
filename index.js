const library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    function toggleRead() {
        read = !read;
    }
}

function addBook(title, author, pages, read) {
    library.push(new Book(title, author, pages, read));
}

function displayBooks(layout, library) {
    for (let i in library) {
        const card = templateCard.cloneNode(true);
        card.classList.remove("hidden-card");
        card.querySelector("#title").textContent = library[i].title;
        card.querySelector("#author").textContent = library[i].author;
        card.querySelector("#pages").textContent = library[i].pages + " Pages";
        if (library[i].read) {
            card.querySelector("#read-status").textContent = "Book is Read";
        } else {
            card.querySelector("#read-status").textContent = "Book is not Read";
        }
        layout.appendChild(card);
    }
}

const addBookForm = document.querySelector("#dialog-form");
const addBookDialog = document.querySelector("#book-dialog");
const addBookBtn = document.querySelector("#new-book");
const cardLayout = document.querySelector(".card-layout");
const templateCard = document.querySelector("#template");

addBookBtn.addEventListener("click", (event) => {
    addBookDialog.showModal();
});

addBookForm.addEventListener("submit", (event) => {
    const title = document.querySelector("#input-title");
    const author = document.querySelector("#input-author");
    const pages = document.querySelector("#input-pages");
    const read = document.querySelector("#input-read-status");

    if (read.options[read.selectedIndex].value === "read") {
        addBook(title.value, author.value, pages.value, true);
    } else {
        addBook(title.value, author.value, pages.value, false);
    }

    addBookForm.reset();
    addBookDialog.close();

    event.preventDefault();
});

addBook("Atomic Habits", "James Clear", 100, false);
addBook("Winning the War in Your Mind", "Craig Groeshel", 200, true);
displayBooks(cardLayout, library);
