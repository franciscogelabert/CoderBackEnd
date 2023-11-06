// crea sicket
const socket = io();
console.log("connected");

// agrega listener para escuchar el click del botnon registar

let btn_registrar = document.getElementById('btn_registrar');
console.log(btn_registrar);
btn_registrar.addEventListener('click', (e) => {
    e.preventDefault();
 
    let title = document.getElementById('title').value
    let description = document.getElementById('description').value
    let code = document.getElementById('code').value
    let price = document.getElementById('price').value
    let stock = document.getElementById('stock').value
    let thumbnaill = document.getElementById('thumbnail1').value
    let thumbnail2 = document.getElementById('thumbnail2').value
    let estado = document.getElementById('estado').value
    let category = document.getElementById('category').value

    let new_product = {
        "title": title,
        "description": description,
        "code": code,
        "price": price,
        "stock": stock,
        "thumbnail": thumbnaill,
        "thumbnai2": thumbnail2,
        "estado": estado,
        "category": category
    };
    socket.emit('agregar_producto', new_product);
  
})

socket.on("productAdded",(product)=>{
    const acualList = document.getElementById('pList');
    const addElement = document.createElement('li');
    addElement.setAttribute('id',product.code);
    addElement.textContent=`${product.title} ${product.description} ${product.price} ${product.stock} ${product.category}`;
    acualList.appendChild(addElement);
});



