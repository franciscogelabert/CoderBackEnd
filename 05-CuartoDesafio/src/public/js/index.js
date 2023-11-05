const socket = io();

socket.emit('message', 'hola desde el Cliente');

socket.on('individual', data => { console.log('individual -->', data) });

socket.on('individualMenosYo', data => { console.log('individualMenosYo -->', data) });

socket.on('todos', data => { console.log('todos--', data) });

socket.on('addProduct', (product) => {
    const productList = document.getElementById('pList');
    const item = document.createElement('li');
    item.setAttribute('id', product.code);
    item.textContent = `${product.title}  ${product.description}  ${product.price}  ${product.stock}  ${product.category}`;
    productList.appendChild(item);
});


