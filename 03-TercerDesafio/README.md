## Programación Backend -  Comisión 55595 

*Tercer Desafío - Gelabert Francisco - Tutoría a cargo de Juan Manuel Gonzalez*


## Descripción tercer desafío

Para este tercer desafío, se crea la carpeta class, donde se guardan las clases Product, FileManager y ProductManager (debajo se describen sus funcionalidades).
Por otro lado se crea la carpeta src y dentro se crea la app.js en la misma se publican las siguientes funcionalidades 

| Función | Descripción | 
| --- | --- | 
| get('/products', (req, res) | Devuelve el listado completo de archivos si se accede con /products?limit=valor  toma como cantidad de elementos a devolver el valor cargado en el limit|
| get('/products/:id', (req, res) | Devuelve el ítem con el Id especificado en la URL o error si no lo encuentra.|
| get('/products/code/:cod', (req, res) | Devuelve el ítem con el Código especificado en la URL o error si no lo encuentra.|


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

Verificar ruta de archivo en el Constructor del FileManager en src/app.js: 

```bash

const farchivo = new FileManager('archivo.json', 'C:/Coderhouse/Backend/03-TercerDesafio');

```

## Carpeta Class

### Clase Product: 

La misma se utiliza para la gestión de productos/articulos a guardar.

| Función | Descripción | 
| --- | --- | 
| constructor | Crea una instancia de un Objeto *Producto* con Título, Descripción, Precio, imágen Preliminar, Código y Stock|
| esValido | Valida que se hayan ingresado todos los datos.|

### Clase FileManager: 
Se crea esta clase para desacoplar el manejo de archivos en las otras clases, de esta manera se pueden crear otros FileSystem para que guarden otras instancias de otros objetos en diferentes archivos.

| Función | Descripción | 
| --- | --- | 
| constructor | Crea instancia instancia del Objeto *FileManager* con el nombre del archivo. la ruta de almacenado y la metodología con la que se va a gestionar la persistencia  |
| setArchivo | Persiste los datos en el archivo, en este caso persiste una lista de productos en formato Json |
| getItemsArchivo | Consulta el total de items almacenados en el archivo, en este caso actualiza la lista de Productos con todos los Productos que se encuentran almacenados en el archivo.|
| eliminarArchivo | Elimina un archivo.|
| validarExistenciaArchivo | verifica la existencia de un archivo.|

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



### Info Escenario del Archivo: 

#### Para la prueba ya se encuentran registrados 10 productos en el archivo.json, igualmente en el caso que desee crearlos debajo se carga el código a corre en el ProductManage.

```bash

// Creo 10 productos 

const p1 = new Product('Manzana', 'Fruta Manzana', 20, 'url imagen', 'cod1', 10);
const p2 = new Product('Banana', 'Fruta Banana', 20, 'url imagen', 'cod2', 12);
const p3 = new Product('Naranja', 'Fruta Naranja', 20, 'url imagen', 'cod3', 13);
const p4 = new Product('Berenjena', 'Verdura Berenjena', 20, 'url imagen', 'cod4', 14);
const p5 = new Product('Lechuga', 'Lechuga', 20, 'url imagen', 'cod5', 95);
const p6 = new Product('Mandarina', 'Fruta Mandarina', 15, 'url imagen', 'cod6', 54);
const p7 = new Product('Uva', 'Fruta Uva', 15, 'url imagen', 'cod7', 45);
const p8 = new Product('Kiwi', 'Fruta Kiwi', 15, 'url imagen', 'cod8', 12);
const p9 = new Product('Ananá', 'Fruta Ananá', 20, 'url imagen', 'cod9', 20);
const p10 = new Product('Acelga', 'Acelga', 20, 'url imagen', 'cod10', 30);


console.log('Paso 1 - Se crean los 10 productos');

// Crea Instancia del Product Manager y setea el nombre del Archivo, el Origen de fatos y la ruta

const farchivo = new FileManager('archivo.json', 'C:/Coderhouse/Backend/03-TercerDesafio');
console.log('paso 2 - el archivo es', farchivo.archivo);

// Creo el ProductManager
const lp = new ProductManager(farchivo);

console.log('Paso 3 - Se crea el Product Manager');

// Agrego los productos al ProductManager

lp.addProduct(p1);
lp.addProduct(p2);
lp.addProduct(p3);
lp.addProduct(p4);
lp.addProduct(p5);
lp.addProduct(p6);
lp.addProduct(p7);
lp.addProduct(p8);
lp.addProduct(p9);
lp.addProduct(p10);

console.log('Paso 4 - Se cargan los 10 productos en el Product Manager y se persisten en el archivo de Paso 2');


```
