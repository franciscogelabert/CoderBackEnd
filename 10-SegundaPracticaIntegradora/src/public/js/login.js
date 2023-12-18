function validateLogin() {
    // Puedes agregar lógica de validación específica para el formulario de login aquí
    // Por ejemplo, verifica que los campos no estén vacíos
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email === '' || password === '') {
        // Muestra un mensaje de error (puedes personalizar según tus necesidades)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, completa todos los campos.',
        });
        return false; // Evita que el formulario se envíe
    }

    // Lógica de validación exitosa, el formulario se enviará
    return true;
}

function validateRegister() {
    // Puedes agregar lógica de validación específica para el formulario de registro aquí
    // Por ejemplo, verifica que los campos no estén vacíos
    var name = document.getElementById('name').value;
    var lastName = document.getElementById('lastName').value;
    var age = document.getElementById('age').value;
    var registerEmail = document.getElementById('registerEmail').value;
    var registerPassword = document.getElementById('registerPassword').value;

    if (name === '' || lastName === '' || age === '' || registerEmail === '' || registerPassword === '') {
        // Muestra un mensaje de error (puedes personalizar según tus necesidades)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, completa todos los campos.',
        });
        return false; // Evita que el formulario se envíe
    }

    // Lógica de validación exitosa, el formulario se enviará
    return true;
}