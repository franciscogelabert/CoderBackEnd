// crea socket en Cliente 

const socket = io();
console.log("connected");


Swal.fire({
    title: "Ingrese su Usuario: ",
    input: "email",
    inputLabel: "su dirección de correo electrónico",
    inputPlaceholder: "Ingrese su dirección de correo electrónico"
}).then((result) => {
    if (result.isConfirmed) {
        const email = result.value;
        console.log('email', email);
        if (email) {
            document.getElementById('author').value = email;
            Swal.fire(`Usuario Ingresado: ${email}`);
        }
    }
});


// agrega listener para escuchar el click del botnon registar

let btn_publicar = document.getElementById('btn_publicar');




btn_publicar.addEventListener('click', (e) => {
    e.preventDefault();

    let author = document.getElementById('author').value
    let message = document.getElementById('message').value

    let new_message = {
        "author": author,
        "message": message
    };

    const lengths = [author.length, message.length];

    let isEmpty = false;
    for (let i = 0; i < lengths.length; i++) {
        if (lengths[i] === 0) {
            isEmpty = true;
            break;
        }
    }

    if (isEmpty) {
        Swal.fire({
            icon: "warning",
            title: "Faltan datos...",
            text: "Debe completar todos datos del Mensaje!",
        });

    } else {
        socket.emit('agregar_mensaje', new_message);
    }
})

socket.on("actualizarChat", (message) => {

    const div = document.getElementById('cList');

    // Crear un nuevo elemento <tr>
    const newChat = document.createElement('div');

    // Crear celdas <td> para cada propiedad del producto
    newChat.setAttribute('_id', message._id);

    const author = document.createElement('strong');
    author.textContent = message.author;

    const txt = document.createElement('em');
    txt.textContent = message.message;
    txt.style.marginLeft = "10px";

    // Agregar las celdas a la fila <tr>
    newChat.appendChild(author);
    newChat.appendChild(txt);

   
    // Reemplazar el elemento <li> con la nueva fila <tr>
    div.appendChild(newChat);

    document.getElementById('message').value = '';
   
});


