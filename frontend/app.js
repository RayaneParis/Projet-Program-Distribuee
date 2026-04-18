const BOOKS_API = 'http://library.info/books';
const USERS_API = 'http://library.info/users';

async function loadBooks() {
    const res = await fetch(BOOKS_API);
    const books = await res.json();
    const list = document.getElementById('bookList');
    if (books.length === 0) {
        list.innerHTML = '<div class="empty">No book</div>';
        return;
    }
    list.innerHTML = books.map(b => `
        <div class="item">
            <div class="item-info">
                <strong>${b.title || 'No title'}</strong>
                <span>${b.title || ''} - ${b.genre || ''}</strong>
            </div>
            <div style="display:flex;gap:8px;align-items:center">
                <span class="badge ${b.available ? 'available' : 'unavailable'}">${b.available ? 'Disponible' : 'Indisponible'}</span>
                <button class="delete-btn" onclick="deleteBook(${b.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

async function loadUsers() {
    const res = await fetch(USERS_API);
    const users = await res.json();
    const list = document.getElementById('userList');
    if (users.length === 0) {
        list.innerHTML = '<div class="empty">No users</div>';
        return;
    }
    list.innerHTML = users.map(u => `
        <div class="item">
            <div class="item-info">
                <strong>${u.name}</strong>
                <span>${u.email}</span>
            </div>
            <button class="delete-btn" onclick="deleteUser(${u.id})">Delete</button>
        </div>
    `).join('');
}

async function addBook() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const genre = document.getElementById('bookGenre').value;
    if (!title) return alert('Title obligatory');
    await fetch(BOOKS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, genre, available: true })
    });
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('bookGenre').value = '';
    loadBooks();
}

async function addUser() {
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    if (!name) return alert('name obligatory');
    await fetch(USERS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
    });
    document.getElementById('userName').value = '';
    document.getElementById('userEmail').value = '';
    loadUsers();
}

async function deleteBook(id) {
    await fetch(`${BOOKS_API}/${id}`, { method: 'DELETE'});
    loadBooks();
}

async function deleteUser(id) {
    await fetch(`${USERS_API}/${id}`, { method: 'DELETE'});
    loadUsers();
}

loadBooks();
loadUsers();

