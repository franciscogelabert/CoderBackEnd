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
| constructor | Crea ina instancia del Objeto *FileManager* con el nombre del archivo. la ruta de almacenado y la metodología con la que se va a gestionar la persistencia  |
| setArchivo | Persiste los datos en el archivo, en este caso persiste una lista de productos en formato Json |
| getItemsArchivo | Consulta el total de items almacenados en el archivo, en este caso actualiza la lista de Productos con todos los Productos que se encuentran almacenados en el archivo.|
| eliminarArchivo | Elimina un archivo.|
| validarExistenciaArchivo | verifica la existencia de un archivo.|

### Clase ProductManager: 
Se utiliza para gestionar un listado de instancias de la Clase Product y de administrar la persistencia de los objetos utilizando una instancia de FileManager

| Función | Descripción | 
| --- | --- | 
| constructor | |
| addProduct | |
| updateProduct | |
| eliminarProductoPorCodigo | |
| getProductById | |
| getProducts | |
| getProductByCode | |

    

    
    
    
    
