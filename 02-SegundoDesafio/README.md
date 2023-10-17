La solución del Segundo Desafío se plantea con tres clases:

### Clase Product: 

La misma se utiliza para la gestión de productos/articulos a guardar.

| Función | Descripción | 
| --- | --- | 
| constructor | |
| esValido | |

### Clase FileManager: 
Se crea esta clase para desacoplar el manejo de archivos en las otras clases, de esta manera se pueden crear otros FileSystem para que guarden otras instancias de otros objetos en diferentes archivos.

| Función | Descripción | 
| --- | --- | 
| constructor | |
| setArchivo | |
| getItemsArchivo | |
| eliminarArchivo | |
| validarExistenciaArchivo | |

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

    

    
    
    
    
