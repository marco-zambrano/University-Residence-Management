import {studentsData, adminsData } from '../data.js';

// error message node
const errorMsg = document.getElementById('errorMsg');

// form submited
document.getElementById('loginForm').addEventListener('submit', function(e){
    e.preventDefault();
    // inputs values
    const username = this.username.value.trim();
    const password = this.password.value.trim();
    
    // Getting users
    const student = studentsData.find(s => s.username === username && s.password === password);
    const admin = adminsData.find(a => a.username === username && a.password === password);

    if (!student && !admin) { // user not exits
        errorMsg.textContent = 'Credenciales incorrectas';
        errorMsg.style.display = 'block';
        return;
    }

    // Redirecting window location
    if (admin) {
        window.location.href = '/src/pages/admin.html';
    } else {
        window.location.href = '/src/pages/student.html';
    }

    errorMsg.style.display = 'none';
});

