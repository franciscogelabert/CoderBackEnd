## Programación Backend -  Comisión 55595 

*Octavo desafío - Gelabert Francisco - Tutoría a cargo de Ivan Passalia*

## Descripción Funcional
Se disponibilzan diferentes API's para consumir servicios relacionados a Vistas, Gestión de Productos (Products) y de Carritos (Carts) de un e-commerce.
En esta entrega se persisten y se consultan los datos en una Base de datos Mongo Atlas.

En esta entrega se desacopla la lógica de los routeres, se crean controladores para acceder a los DAO y desde los DAO se maneja el acceso a los datos.

Para probar la funcionalidad pincipal en la que se gestiona el carrito de compras, inicialmente se debe Registrar/autenticar. En esta autenticación se puede se agrega bcrypt para codificar el password del usuario y permite la autenticación vía Paswword (previo registro) y utilizando las credenciales de GitHub, para acceder al loguin debe utilizar :

http://localhost:8080/login

### IMPORTANTE: Tal cual se pidió en la consigna, el usuario adminCoder@coder.com (Pass: adminCod3r123) posee el rol de admin, a los efectos de la prueba se eliminó de la base de datos, lo que implica que debe Registrarlo antes de utilizar.


una vez autenticado se presenta la Página Nro 1 de productos, solo 5 por página, cuya cateroría es "Verdura" y los muestra en orden descendente por precio.
En dicho listado puede realizar dos actividades, ver le detalle del Producto y/o agregarlo al carrito. 
En el caso que presione agregar al carrito, en el caso de ser el primero, lo crea sino lo agrega y actualiza los valores de precio y cantidad.
Si presiona  el botón "ver carrito", y aún no ingresó ningún producto el sistema no realiza ninguna actividad. 
En el caso que ya haya cargado algún producto al carrito, se presenta una pantalla con el resúmen del mismo y permite la eliminación de productos.

### IMPORTANTE: en esta entrega se agregan variables de entorno, para utilizarlas cambiar el nombre del archivo ".env.example" a ".env" y completar las variables con los valores entregados.


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

Instalar *Mongoose*

```bash

npm install mongoose

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


Para las cookies

```bash

npm install cookie-parser

```


Para las sesiones 

```bash

npm install express-session

```

Para las sesiones 

```bash

npm install express-session

```


Para persistir las sesiones en archivo (solo se uso para las pruebas)

```bash

npm install session-file-store

```

Para persistir las sesiones en mongo

```bash

npm install connect-mongo

```

Para codificar la Pass

```bash

npm install bcrypt

```


Para codificar la Passport

```bash

npm install passport passport-local

```


Para codificar la Passport GitHub

```bash

npm install passport-github2

```


Para correr la app

```bash

nodemon src/app.js

```

