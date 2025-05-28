document.getElementById('loginForm').addEventListener('submit', function(e){
    e.preventDefault();
    // inputs values
    const username = this.username.value.trim();
    const password = this.password.value.trim();
    const errorMsg = document.getElementById('errorMsg');
    // validating inputs
    if (!username || !password) {
        errorMsg.textContent = 'Por favor, completa todos los campos.';
        errorMsg.style.display = 'block';
        return;
    }
    errorMsg.style.display = 'none';
});

