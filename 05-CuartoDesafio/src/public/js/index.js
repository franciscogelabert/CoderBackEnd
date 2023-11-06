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


let btn_eliminar = document.getElementById('btn_eliminar');
console.log(btn_eliminar);
btn_eliminar.addEventListener('click', (e) => {
    e.preventDefault();
    let cProd = document.getElementById('pEliminar').value
    socket.emit('eliminar_producto', cProd);
  
})

socket.on("productAdded",(product)=>{
   
    const tableBody = document.getElementById('pList');

    // Crear un nuevo elemento <tr>
    const newRow = document.createElement('tr');

    // Crear celdas <td> para cada propiedad del producto
    newRow.setAttribute('id',product.code);
    
    const codeCell = document.createElement('td');
    codeCell.textContent = product.code;

    const titleCell = document.createElement('td');
    titleCell.textContent = product.title;

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = product.description;

    const priceCell = document.createElement('td');
    priceCell.textContent = product.price;

    const stockCell = document.createElement('td');
    stockCell.textContent = product.stock;

    const categoryCell = document.createElement('td');
    categoryCell.textContent = product.category;

    // Agregar las celdas a la fila <tr>
    newRow.appendChild(codeCell);
    newRow.appendChild(titleCell);
    newRow.appendChild(descriptionCell);
    newRow.appendChild(priceCell);
    newRow.appendChild(stockCell);
    newRow.appendChild(categoryCell);

    // Reemplazar el elemento <li> con la nueva fila <tr>
    tableBody.appendChild(newRow);


});

socket.on("productDeleted",(productId)=>{
    const deleteElement = document.getElementById(String(productId));
    deleteElement.remove();
});



