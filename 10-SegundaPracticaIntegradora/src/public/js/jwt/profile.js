fetch('/api/current', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
}).then(response => {
    if (response.status === 401) {
        window.location.replace('/login');
    } else {
        return response.json();
    }
}).then(json => {
    const paragraph = document.getElementById('result');
    
    // Assuming the server response contains the email field
    if (json.payload && json.payload.email) {
        paragraph.innerHTML = `Hola, tu correo electrónico es ${json.payload.email}`;
    } else {
        paragraph.innerHTML = 'No se encontró información del usuario';
    }
}).catch(error => {
    console.error('Error:', error);
});