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
