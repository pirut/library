const library = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.index;
    }
    toggleRead() {
        this.read = !this.read;
    }

    displayBook(num) {
        this.index = num;
        const card = document.querySelector("#template").cloneNode(true);
        card.classList.remove("hidden-card");
        card.querySelector("#title").textContent = this.title;
        card.querySelector("#author").textContent = this.author;
        card.querySelector("#pages").textContent = this.pages + " Pages";
        card.querySelector("#toggle").value = this.index;
        card.querySelector("#delete").value = this.index;
        if (this.read) {
            card.querySelector("#read-status").textContent = "Book is Read";
        } else {
            card.querySelector("#read-status").textContent = "Book is not Read";
        }
        return card;
    }
}

function addBook(title, author, pages, read) {
    library.push(new Book(title, author, pages, read));
}

function displayBooks(layout) {
    while (layout.firstChild) {
        layout.removeChild(layout.lastChild);
    }
    for (let i in library) {
        layout.appendChild(library[i].displayBook(i));
    }
    document.querySelectorAll("#toggle").forEach((element) => {
        element.addEventListener("click", (event) => {
            toggleReadBtn(element.value);
        });
    });
    document.querySelectorAll("#delete").forEach((element) => {
        element.addEventListener("click", (event) => {
            deleteCard(element.value);
        });
    });
}

function toggleReadBtn(index) {
    library[index].toggleRead();
    displayBooks(cardLayout);
}

function deleteCard(index) {
    library.splice(index, 1);
    displayBooks(cardLayout);
}

const addBookForm = document.querySelector("#dialog-form");
const addBookDialog = document.querySelector("#book-dialog");
const addBookBtn = document.querySelector("#new-book");
const cardLayout = document.querySelector(".card-layout");
const templateCard = document.querySelector("#template");
const deleteBookButton = document.querySelectorAll("#delete");

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
    displayBooks(cardLayout, library);

    event.preventDefault();
});

addBook("Atomic Habits", "James Clear", 100, false);
addBook("Winning the War in Your Mind", "Craig Groeshel", 200, true);
displayBooks(cardLayout);
