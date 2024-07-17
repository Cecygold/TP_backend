# TP_backend
* Pasos para levantar el servidor:
1. Renombrar el archivo "env.example" a ".env".
2. Editar el archivo .env completando los campos con los datos del "localhost".
3. En caso que la BD no exista previamente, crearla (CREATE DATABASE ...;).
4. Inicializar el backend, hubiquese en la carpeta del proyecto y ejecute cualquiera de las siguientes opciones:
   # Modo normal 
     $ node index.js
   # Modo desarrollo 
     $ npm run dev

* Rutas expuestas:
  GET "/provincias"
  POST "/usuarios/crear"
  POST "/usuarios/login"
  DELETE "/usuarios/borrar" 
  PUT "/usuarios/actualizar"
  POST "/telefonos/agregar"

## IMPORTANTE: se adjunta el archivo postman.js con el fin de facilitar las pruebas con Postman.
Una vez que se logea el usuario se le da un token, mientras sea válido y no expirado, se podra acceder a estas rutas: 
  DELETE "/usuarios/borrar" 
  PUT "/usuarios/actualizar"
  POST "/telefonos/agregar"
