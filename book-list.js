const loadBooks = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/books", false);
    xhttp.send();

    const books = JSON.parse(xhttp.responseText);
    for (let book of books) {
        const bookHTML = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>
                        <div>Author: ${book.author}</div>
                        <div>Publisher: ${book.publisher}</div>
                        <div>Pages: ${book.numOfPages}</div>
                        <hr>
                        <button class="btn btn-danger" onClick="deleteBook('${book.isbn}')">Delete</button>
                        <button class="btn btn-primary" onClick="setEditModal('${book.isbn}')">Edit</button>
                    </div>
                </div>
            </div>`;
        document.getElementById('books').innerHTML += bookHTML;
    }
}

const deleteBook = (isbn) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `http://localhost:3000/book/${isbn}`, false);
    xhttp.send();
    location.reload();
}

const setEditModal = (isbn) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/book/${isbn}`, false);
    xhttp.send();

    const book = JSON.parse(xhttp.responseText);
    document.getElementById('isbn').value = isbn;
    document.getElementById('title').value = book.title;
    // Set other form fields as needed

    document.getElementById('editForm').action = `http://localhost:3000/book/${isbn}`;
}

// Load books on page load
loadBooks();
