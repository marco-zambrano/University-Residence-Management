


// JSON with all the credentials (simulating a possible DB implementation) - saving it in local storage
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([
        { username: 'admin', password: 'admin123', role: 'admin' },
        { username: 'user1', password: 'user123', role: 'user' },
    ]));
}
// error message node
const errorMsg = document.getElementById('errorMsg');

// form submited
document.getElementById('loginForm').addEventListener('submit', function(e){
    e.preventDefault();
    // inputs values
    const username = this.username.value.trim();
    const password = this.password.value.trim();
    
    // Getting users
    const users = JSON.parse(localStorage.getItem('users'));

    // finding the user with the credentials introduced -- if user exits, data is correct
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) { // user not exits
        errorMsg.textContent = 'Credenciales incorrectas';
        errorMsg.style.display = 'block';
        return;
    }

    // Redirecting window location
    if (user.role === 'admin') {
        window.location.href = '/src/pages/admin.html';
    } else {
        window.location.href = '/src/pages/student.html';
    }
    errorMsg.style.display = 'none';
});

