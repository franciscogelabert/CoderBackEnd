## Programación Backend -  Comisión 55595 

*Segunda PreEntrega - Gelabert Francisco - Tutoría a cargo de Juan Manuel Gonzalez*

## Descripción Funcional
Se disponibilzan diferentes API's para consumir servicios relacionados a Vistas, Gestión de Productos (Products) y de Carritos (Carts) de un e-commerce.
Debajo se detallan los mismos indicando Tipo de Método, URL, parámetros si aplica y Body si aplica; mas una breve descripción. En esta entrega se persisten y se consultan los datos en una Base de datos Mongo Atlas. En el caso que desee acceder al FileSystem, debe comnentar el código relacionado a la conexión con la base de datos y descomentar las dos líneas de código que se encuentra debajo de "Para usar con File Manager", en el archivo app.js.

Para probar la funcionalidad pincipal en la que se gestiona el carrito de compras se propone como ejemplo de URL de prueba:

http://localhost:8080/products?page=1&limit=3&category=Fruta&sort=DESC

al iniciar la misma se solicita un usuario, ingresar cualquier correo electrónico. 
Con la URL anterior se muetra la Página Nro 1 de productos, solo 3 por página, cuya cateroría es "Fruta" y los muestra en orden descendente por precio.
En dicho listado puede realizar dos actividades, ver le detalle del Producto y/o agregarlo al carrito. 
En el caso que presione agregar al carrito, en el caso de ser el primero, lo crea sino lo agrega y actualiza los valores de precio y cantidad.
Si presiona  el botón "ver carrito", y aún no ingresó ningún producto el sistema no realiza ninguna actividad. 
En el caso que ya haya cargado algún producto al carrito, se presenta una pantalla con el resúmen del mismo y permite la eliminación de productos.

### IMPORTANTE: en esta entrega se agregan variables de entorno, para utilizarlas cambiar el nombre del archivo ".env.example" a ".env" y completar las variables con los valores entregados.


## Descripción Técnica Cliente
Utilizando handlebars, se implementan tres layouts un con una vista estática (home) de los productos almacenados y otra que implementa websockets  (realTimeProducts) donde se visualizan los datos en tiempo real. Estos interactúan in un index.js que gestiona el comportamiento de la tabla de productos y de los botones de la página. De esta manera se interactúa visualizando, cargando y eliminando productos en tiempo real, y actualizando las vistas de todos los clientes que se encuentren conectados. De igual forma se crea un tercer layout con un chat en tiempo real, es importante aclarar que se jenera un nuevo JS para gestionar todo los reñacionado al chat (chat.js).

| Layout | Acceso | Descripción |
| --- | --- | --- | 
| Home | http://localhost:8080/api|  Listado de Productos |
| RealTimeProducts - gestión de Productos | http://localhost:8080/api/realtimeProducts| Listado de Productos - Premite la gestión de Productos  |
| Chat | http://localhost:8080/api/chat | Pantalla de Chat de Usuario |
| Products | http://localhost:8080/products | Gestión de Carrito de compras |
| Product | http://localhost:8080/api/chat | Muestra detalle de producto |


### Debajo se detallan las funciones utilizadas con WebSockets en el Cliente:

| Función | Archivo | Descripción | 
| --- | --- | --- | 
| socket.emit('agregar_producto', new_product) | index.js | Envía mensaje al Servidor indicando se proceda con el alta de un Nuevo Producto|
| socket.emit('eliminar_producto', cProd) | index.js | Envía mensaje al servidor, indicándole el código del producto que debe eliminar.|
| socket.on("productAdded", (product)) | index.js | Mensaje recibido desde el Servidor una vez que el Poducto se persiste |
| socket.on("productDeleted", (productId)) | index.js | Mensaje recibido desde el Servidor una vez que el Poducto se elimina.|
| socket.on("productNotAdded", (productId))  | index.js | Mensaje recibido desde el Servidor, que indica que el producto no pudo ser cargado.|
| socket.on("productNotDeleted", (productId))  | index.js | Mensaje recibido desde el Servidor, que indica que el producto no pudo ser eliminado.|
| socket.emit('agregar_mensaje', new_message)  | chat.js | Envía mensaje al Servidor indicando se proceda con el alta de un Nuevo Mensaje|
| socket.on("actualizarChat", (message)) | chat.js | Mensaje recibido desde el Servidor una vez que el Mensaje se persiste |

| socket.emit('crear_carrito', codigoProducto, nuevoUsuario) | cart.js | Envía mensaje al Servidor indicando se proceda con la creación de un Carrito|
| socket.emit('agregar_producto_carrito', codigoProducto, carrito) | carts.js | Envía mensaje al servidor, indicándole el código del producto que debe agregar al carrito.|
| socket.on("carritoCreado", (carritoId) )| cart.js | Mensaje recibido desde el Servidor una vez que se crea el carrito |
| socket.on("carritoActualizado", (precioProducto))| cart.js | Mensaje recibido desde el Servidor una vez que se agrega un producto al carrito |




## Descripción Técnica Servidor (app.js)

Las Apis's se consumen a travéz de una apps.js la cual instancia un Express Router para Vistas (view.router.js), Productos (products.Router.js) como para Cart (cart.Router.js). En dichas clases se accede a los diferentes métodos (GET, PUT, DELETE y POST) para acceder a los Manager de las diferentes clases. Mediante funciones tanto del ProductManager como del CartManager, se accede a un FileManager para todo lo relacionado al acceso a la Info persistida en archivos. (carrito.json y productos.json).
Respecto al tema vistas, tanto para consultar o persistir info, utiliza los managers antes mencionados.

### Debajo se detallan las funciones utilizadas con WebSockets en el Servidor:

| Función | Descripción | 
| --- | --- | 
| socketServer.on('connection', socket) | Para establecer la conexión|
| socket.on('agregar_producto', (data)) | Escucha pedido desde el Cliente para agregar un productos|
| socketServer.emit("productAdded", newProduct) | Mensaje enviado al Cliente indicándole que el producto se pudo persistir |
| socket.emit('productNotAdded', data.code); | Mensaje enviado al Cliente indicándole que el producto no se pudo persistir |
| socket.on ('eliminar_producto', data)   | Escucha pedido desde el Cliente para eliminar un productos..|
| socket.emit('productDeleted', cProd)  | Mensaje enviado al Cliente indicándole que el producto se pudo eliminar.|
| socket.on('agregar_mensaje', (data)) | Escucha pedido desde el Cliente para agregar un mensajes.|
| socketServer.emit("actualizarChat", mensaje) | Mensaje enviado al Cliente indicándole que el mensaje se pudo persistir.|

| socket.on('crear_carrito', (codigoProducto, usuario)) | Escucha pedido desde el Cliente para agregar un carrito.|
| socket.emit("carritoCreado", cartId, result[0].price); | Mensaje enviado al Cliente indicándole que el carrito se pudo persistir.|
| socket.on('agregar_producto_carrito', (codigoProducto, carrito)) | Escucha pedido desde el Cliente para agregar un producto al carrito.|
| socket.emit("carritoActualizado", result[0].price); | Mensaje enviado al Cliente indicándole que el producto se pudo agregar al carrito.|

## APIs 

### Descripción API Views

| Función | Descripción | 
| --- | --- | 
| get('/', (req, res) )| Renderiza el listado de productos en el layout home. El mismo se presenta de forma estática, al menos que sea actualizado desde realTimeProducts.|
| get('/realTimeProducts', (req, res))  | Renderiza el listado de productos en el layout realTimeProducts. El mismo se presenta en tiempo real, permite actualizar y recibir actualizaciones de los diferentes clientes en tiempo real. Desde el layout se brinda la funcionalidad de agregar y eliminar productos.|
| post('/realTimeProducts', (req, res))| Recibe un nuevo producto en el Body y lo persiste, actualiza la info presentada en los diferentes layouts  |

## APIS Mongo DB

### Descripción API Products DB

| Función | Descripción | 
| --- | --- | 
| get('/api', (req, res) )| Devuelve el listado completo de productos, si se accede con ?limit=valor  toma como cantidad de elementos a devolver el valor cargado en el limit|
| get('/api/realtimeproducts', (req, res) )| Devuelve el listado completo de productos en tiempo real, si se accede con ?limit=valor  toma como cantidad de elementos a devolver el valor cargado en el limit|
| get('api/products/:id', (req, res)) | Devuelve el ítem con el Id especificado en la URL o error si no lo encuentra.|
| post('api/products/', (req, res)) | Recibe un nuevo producto en el Body y lo persiste.|
| put('/:id', (req, res))  | Actualiza un producto cuya referencia se recibe por parámetro id y la nueva información se recibe en el Body.|
| delete('/:id', (req, res))  | Borra un producto cuya referencia se recibe por parámetro id.|

### Descripción API Carts DB

| Función | Descripción | 
| --- | --- | 
| get('api/carts/', (req, res)) | Devuelve el listado completo de carritos|
| get('api/carts/:id', (req, res)) | Devuelve el ítem con el Id especificado en la URL o error si no lo encuentra.|
| post('/', (req, res))| Recibe un nuevo cart en el Body y lo persiste.|
| post('/:cid/product/:pid', (req, res) ) | recibe como parámetro un id de carrito y un id de producto, si el carrito tiene dicho producto incrementa su cantidad en 1 y si no lo tiene lo ahgrega.|
| put('/:cid/product/:pid', (req, res)) | actualiza la cantidad de ejemplares del producto por cantidad pasada desde req.body|
| delete('/:cid/product/:pid', (req, res))  | elimina un producto del carrito|
| delete('/:cid', (req, res))  | elimina todos los productos del carrito|

## Apis FileSystem. 

### Descripción API FileSystem Products (router -> /api/products)

| Función | Descripción | 
| --- | --- | 
| get('/', (req, res) )| Devuelve el listado completo de productos, si se accede con /products?limit=valor  toma como cantidad de elementos a devolver el valor cargado en el limit|
| get('/:id', (req, res)) | Devuelve el ítem con el Id especificado en la URL o error si no lo encuentra.|
| get('/code/:cod', (req, res)) | Devuelve el ítem con el Código especificado en la URL o error si no lo encuentra.|
| post('/', (req, res)) | Recibe un nuevo producto en el Body y lo persiste.|
| put('/:id', (req, res))  | Actualiza un producto cuya referencia se recibe por parámetro id y la nueva información se recibe en el Body.|
| delete('/:id', (req, res))  | Borra un producto cuya referencia se recibe por parámetro id.|

### Descripción API FileSystem Carts (router -> /api/carts)

| Función | Descripción | 
| --- | --- | 
| get('/', (req, res)) | Devuelve el listado completo de carritos|
| get('/:id', (req, res)) | Devuelve el ítem con el Id especificado en la URL o error si no lo encuentra.|
| post('/', (req, res))| Recibe un nuevo cart en el Body y lo persiste.|
| post('/:cid/product/:pid', (req, res) ) | recibe como parámetro un id de carrito y un id de producto, si el carrito tiene dicho producto incrementa su cantidad en 1 y si no lo tiene lo ahgrega.|


## Carpeta Class

### Clase Product: 

La misma se utiliza para la gestión de productos/articulos a guardar. 

Es importante aclarar, que tal cual se solicitó en la consigna, cada producto se registra con un único ID autoincrementable, por otro lado tambien se utiliza un código para el manejo comercial de los mismos. 

| Función | Descripción | 
| --- | --- | 
| constructor | Crea una instancia de un Objeto *Producto* con Título, Descripción, Precio, imágen Preliminar, Código y Stock|
| esValido | Valida que se hayan ingresado todos los datos.|

### Clase ProductManager: 
Se utiliza para gestionar un listado de instancias de la Clase Product y de administrar la persistencia de los objetos utilizando una instancia de FileManager.
Para garantizar la integridad de la información, es importante aclarar, que tanto para las operaciones de consulta o guardado de datos en la lista; se actualiza la misma con los datos almacenados en el archivo. Se crea el ProductManagerDB para gestionar los productos de la Base de datos y no borrar la clase ProductManager. 

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
Para garantizar la integridad de la información, es importante aclarar, que tanto para las operaciones de consulta o guardado de datos en la lista; se actualiza la misma con los datos almacenados en el archivo. Se crea el CartManagerDB para gestionar los carritos de la Base de datos y no borrar la clase CartManager.

| Función | Descripción | 
| --- | --- | 
| constructor | Crea instancia instancia del Objeto *CartManager*, una lista que almacena instancias de Objetos Cart y una instancia del FileManager que se utilizará para todo lo asociado a la persistencia de la Lista de Objetos. 
| addCart | Agrega un Cart a la ista y lo persiste |
| addProductCart | Dado un Cart si el mismo posee el producto lo incrementa en una unidad, sino lo tiene lo agrega al Cart.|
| getProductById | Obtiene un Cart de la lista por su ID, la lista previamente se actualiza con los datos del archivo. |
| getCarts | Obtiene lista de todos los Carts, la lista previamente se actualiza con los datos del archivo. |


## DAO

###  Mongo DB Modelos

| Modelo | Descripción | 
| --- | --- | 
| cart |  Crea el modelo de datos para gestionar los carritos|
| message | Crea el modelo de datos para gestionar los los mensajes en el chat |
| product | Crea el modelo de datos para gestionar los productos|

### Clase FileManager: 
Se crea esta clase para desacoplar el manejo de archivos en las otras clases, de esta manera se pueden crear otros FileSystem para que guarden otras instancias de otros objetos en diferentes archivos.

| Función | Descripción | 
| --- | --- | 
| constructor | Crea instancia instancia del Objeto *FileManager* con el nombre del archivo. la ruta de almacenado y la metodología con la que se va a gestionar la persistencia  |
| setArchivo | Persiste los datos en el archivo, en este caso persiste una lista de productos en formato Json |
| getItemsArchivo | Consulta el total de items almacenados en el archivo, en este caso actualiza la lista de Productos con todos los Productos que se encuentran almacenados en el archivo.|
| eliminarArchivo | Elimina un archivo.|
| validarExistenciaArchivo | verifica la existencia de un archivo.|

### Info para Pruebas: 

Recordar correr: 

```bash

npm init -y

```

Instalar *Nodemon*

```bash

npm install -g nodemon

```

Modificar *Packaje.json*

```bash

Agregar → "type": "module",

```

Instalar *Express*

```bash

npm install express  

```

Instalar *Handle Bars*

```bash

npm install express-handlebars 

```

Instalar *WebSockets*

```bash

npm install  socket.io

```

Instalar *MongoDB*

```bash

npm install mongodb

```

Instalar *DOTeNV*

Para las variables de entorno instalar dotenv, cambiar el nombre del archivo ".env.example"  a ".env" y completar las variables con los valores entregados.

```bash

npm install dotenv

```

Instalar *Paginate*

Plugin para la paginación de las pantallas.

```bash

npm install mongoose-paginate-v2

```







Para correr la app

```bash

nodemon src/app.js

```

