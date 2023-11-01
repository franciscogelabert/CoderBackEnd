## Programación Backend -  Comisión 55595 

*Primera Entrega - Gelabert Francisco - Tutoría a cargo de Juan Manuel Gonzalez*

## Descripción Funcional

Se disponibilzan diferentes API's para consumir servicios relacionados a Gestión de Productos (Products) y de Carritos (Carts) de un e-commerce.
Debajo se detallan los mismos indicando Tipo de Método, URL, parámetros si aplica y Body si aplica; mas una breve descripción.

## Descripción Técnica
Las Apis's se consumen a travéz de una apps.js la cual instancia un Express Router tanto para Product (productsRouter) como para Cart (cartRouter). En dichas clases se accede a los diferentes métodos (GET, PUT, DELETE y POST) para acceder a los Manager de las diferentes clases. Mediante funciones tanto del ProductManager como del CartManager, se accede a un FileManager para todo lo relacionado al acceso de la Info persistida en archivos. (carrito.json y productos.json) 

### Descripción API Products

| Función | Descripción | 
| --- | --- | 
| get('/', (req, res) | Devuelve el listado completo de productos, si se accede con /products?limit=valor  toma como cantidad de elementos a devolver el valor cargado en el limit|
| get('/:id', (req, res) | Devuelve el ítem con el Id especificado en la URL o error si no lo encuentra.|
| get('/code/:cod', (req, res) | Devuelve el ítem con el Código especificado en la URL o error si no lo encuentra.|
| post('/', (req, res) | Recibe un nuevo producto en el Body y lo persiste.|
| put('/:id', (req, res)  | Actualiza un producto cuya referencia se recibe por parámetro id y la nueva información se recibe en el Body.|
| delete('/:id', (req, res)  | Borra un producto cuya referencia se recibe por parámetro id.|

### Descripción API Carts
| Función | Descripción | 
| --- | --- | 
| get('/', (req, res) | Devuelve el listado completo de carritos|
| get('/:id', (req, res) | Devuelve el ítem con el Id especificado en la URL o error si no lo encuentra.|
| post('/', (req, res) | Recibe un nuevo cart en el Body y lo persiste.|
| post('/:cid/product/:pid', (req, res)  | recibe como parámetro un id de carrito y un id de producto, si el carrito tiene dicho producto incrementa su cantidad en 1 y si no lo tiene lo ahgrega.|

### Info para Pruebas: 

Recordar correr: 

```bash

npm init -y

```

Instalar Nodemon

```bash

npm install -g nodemon

```

Modificar Packaje.json

```bash

Agregar → "type": "module",

```

Instalar Express

```bash

npm install express  

```

Verificar ruta de archivo en src/routes: 

```bash
carts.router.js -->

const farchivo = new FileManager('carrito.json', 'C:/Coderhouse/Backend/04-PrimeraEntrega/files');

products.router.js -->

const farchivo = new FileManager('productos.json', 'C:/Coderhouse/Backend/04-PrimeraEntrega/files');
```

Para correr la app

```bash

nodemon src/app.js

```


## Carpeta Class

### Clase Product: 

La misma se utiliza para la gestión de productos/articulos a guardar.

| Función | Descripción | 
| --- | --- | 
| constructor | Crea una instancia de un Objeto *Producto* con Título, Descripción, Precio, imágen Preliminar, Código y Stock|
| esValido | Valida que se hayan ingresado todos los datos.|

### Clase ProductManager: 
Se utiliza para gestionar un listado de instancias de la Clase Product y de administrar la persistencia de los objetos utilizando una instancia de FileManager.
Para garantizar la integridad de la información, es importante aclarar, que tanto para las operaciones de consulta o guardado de datos en la lista; se actualiza la misma con los datos almacenados en el archivo. 

| Función | Descripción | 
| --- | --- | 
| constructor | Crea instancia instancia del Objeto *ProductManager*, con un id autoincremtable por cada producto, una lista que almacena instancias de Objetos Product y una instancia del FileManager que se utilizará para todo lo asociado a la persistencia de la Lista de Objetos. 
| addProduct | Agrega un Producto a la ista y lo persiste |
| updateProduct | Actualiza un Producto en la Lista y lo persiste|
| eliminarProductoPorCodigo | Elimina un Producto de la Lista y del archivo|
| getProductById | Obtiene un producto de la lista por su ID, la lista previamente se actualiza con los datos del archivo. |
| getProducts | Obtiene lista de Productos , la lista previamente se actualiza con los datos del archivo. |
| getProductByCode |Obtiene un producto de la lista por su Código, la lista previamente se actualiza con los datos del archivo.  |

### Clase CartManager: 
Se utiliza para gestionar un listado de instancias de la Clase Cart y de administrar la persistencia de los objetos utilizando una instancia de FileManager.
Para garantizar la integridad de la información, es importante aclarar, que tanto para las operaciones de consulta o guardado de datos en la lista; se actualiza la misma con los datos almacenados en el archivo. 

| Función | Descripción | 
| --- | --- | 
| constructor | Crea instancia instancia del Objeto *CartManager*, una lista que almacena instancias de Objetos Cart y una instancia del FileManager que se utilizará para todo lo asociado a la persistencia de la Lista de Objetos. 
| addCart | Agrega un Cart a la ista y lo persiste |
| addProductCart | Dado un Cart si el mismo posee el producto lo incrementa en una unidad, sino lo tiene lo agrega al Cart.|
| getProductById | Obtiene un Cart de la lista por su ID, la lista previamente se actualiza con los datos del archivo. |
| getCarts | Obtiene lista de todos los Carts, la lista previamente se actualiza con los datos del archivo. |

### Clase FileManager: 
Se crea esta clase para desacoplar el manejo de archivos en las otras clases, de esta manera se pueden crear otros FileSystem para que guarden otras instancias de otros objetos en diferentes archivos.

| Función | Descripción | 
| --- | --- | 
| constructor | Crea instancia instancia del Objeto *FileManager* con el nombre del archivo. la ruta de almacenado y la metodología con la que se va a gestionar la persistencia  |
| setArchivo | Persiste los datos en el archivo, en este caso persiste una lista de productos en formato Json |
| getItemsArchivo | Consulta el total de items almacenados en el archivo, en este caso actualiza la lista de Productos con todos los Productos que se encuentran almacenados en el archivo.|
| eliminarArchivo | Elimina un archivo.|
| validarExistenciaArchivo | verifica la existencia de un archivo.|


### Info Escenario de los archivos Archivo: 

#### Para la prueba ya se encuentran registrados 10 productos en el archivo.json, igualmente en el caso que desee crearlos debajo se carga el código a corre en el ProductManage.

```bash

// Creo 10 productos

const p1 = new Product('Manzana', 'Fruta Manzana', 1, 500, 20, ['url Manzana1', 'url Manzana2'], true, 'Fruta');
const p2 = new Product('Pera', 'Fruta Pera', 2, 600, 21, ['url Pera1', 'url Pera2'], true, 'Fruta');
const p3 = new Product('Uva', 'Fruta Uva', 3, 700, 30, ['url Uva1'], true, 'Fruta');
const p4 = new Product('Banana', 'Fruta Banana', 4, 300, 31, ['url Banana1', 'url Banana2'], true, 'Fruta');
const p5 = new Product('Kiwi', 'Fruta Kiwi', 5, 700, 40, ['url Kiwi1', 'url Kiwi2', 'url Kiwi3'], true, 'Fruta');
const p6 = new Product('Naranja', 'Fruta Naranja', 6, 800, 41, [], true, 'Fruta');
const p7 = new Product('Lechuga', 'Verdura Lechuga', 7, 300, 12, ['url Lechuga1'], true, 'Verdura');
const p8 = new Product('Acelga', 'Verdura Acelga', 8, 100, 13, ['url Acelga1', 'url Acelga2'], true, 'Verdura');
const p9 = new Product('Rúcula', 'Verdura Rúcula', 9, 700, 15, [], true, 'Verdura');
const p10 = new Product('Rabanito', 'Verdura Rabanito', 10, 900, 8, ['url Rabanito1', 'url Rabanito2', 'url Rabanito3'], true, 'Verdura');

console.log('00 - Se crean los 10 productos');



// crea Instancia del Product Manager y setea el nombre del Archivo, el Origen de fatos y la ruta
//const farchivo = new FileManager('productos.json', 'C:/Proyectos/Coder/04-PrimeraEntrega/files');
const farchivo = new FileManager('productos.json', 'C:/Coderhouse/Backend/04-PrimeraEntrega/files');
console.log('01- el archivo es', farchivo.archivo);

// creo el ProductManager
const lp = new ProductManager(farchivo);
console.log('Paso 2 - Se crea el Product Manager');

// le agrego los productos al ProductManager

lp.addProductByCode(p1);
lp.addProductByCode(p2);
lp.addProductByCode(p3);
lp.addProductByCode(p4);
lp.addProductByCode(p5);
lp.addProductByCode(p6);
lp.addProductByCode(p7);
lp.addProductByCode(p8);
lp.addProductByCode(p9);
lp.addProductByCode(p10);

console.log('Paso 3 - Se cargan los 12 productos en el Product Manager');


```


#### Para la prueba ya se encuentran registrados 4 carritos en el carrito.json, igualmente en el caso que desee crearlos debajo se carga el código a corre en el CartManager.

```bash
const cart1 = new Cart([{ IdProd: 101, CantProd: 5 }, { IdProd: 102, CantProd: 2 }]);
const cart2 = new Cart([{ IdProd: 103, CantProd: 4 }]);
const cart3 = new Cart([{ IdProd: 104, CantProd: 5 }]);
const cart4 = new Cart([{ IdProd: 104, CantProd: 5 }]);

console.log('00- Se crean los 3 carritos');


// crea Instancia del Product Manager y setea el nombre del Archivo, el Origen de fatos y la ruta
//const farchivo = new FileManager('carrito.json', 'C:/Proyectos/Coder/04-PrimeraEntrega/files');
const farchivo = new FileManager('carrito.json', 'C:/Coderhouse/Backend/04-PrimeraEntrega/files');
console.log('01- el archivo es', farchivo.archivo);

// creo el ProductManager
const lc = new CartManager(farchivo);
console.log('02 - Se crea el Cart Manager');


// le agrego los productos al ProductManager

lc.addCart(cart1);
lc.addCart(cart2);
lc.addCart(cart3);
lc.addCart(cart4);

console.log('03 - Se cargan los 4 carritos en el Cart Manager');

lc.addProductCart(101, 0);
lc.addProductCart(101, 0);
lc.addProductCart(101, 0);
lc.addProductCart(104, 0);
lc.addProductCart(105, 0);


console.log('04 - Se Actualizan productos de carritos');


```
