La solución del Segundo Desafío se plantea con tres clases:

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

    

    
    
    
    
