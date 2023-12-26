## Programación Backend -  Comisión 55595 

*Segunda Prueba Integradora - Gelabert Francisco - Tutoría a cargo de Ivan Passalia*

## Descripción Funcional

Para probar la funcionalidad pincipal Registrar/autenticar, utilizar 

http://localhost:8080/login


En esta autenticación se agrega bcrypt para codificar el password del usuario y permite la autenticación vía JWT :


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

