# TP_backend
* Pasos para levantar el servidor:
1. Ejecutar `$ https://github.com/Cecygold/TP_backend.git` para clonar el repositorio.
3. Renombrar el archivo "env.example" a ".env".
4. Editar el archivo .env completando los campos con los datos del "localhost".
5. En caso que la BD no exista previamente, crearla (CREATE DATABASE ...;).
6. Para instalar todas las librerias y dependencias ejecutar `$ nmp install`
7. Inicializar el backend, hubiquese en la carpeta del proyecto y ejecute cualquiera de las siguientes opciones:
   # Modo normal 
     `$ node index.js`
   # Modo desarrollo 
     `$ npm run dev`

* Rutas expuestas:
  GET "/provincias"
  POST "/usuarios/crear"
  POST "/usuarios/login"
  DELETE "/usuarios/borrar" 
  PUT "/usuarios/actualizar"
  POST "/telefonos/agregar"

## IMPORTANTE: se adjunta el archivo 'postman_import' con el fin de facilitar las pruebas con Postman.
Una vez que se logea el usuario se le da un token, mientras sea válido y no expirado, se podra acceder a estas rutas: 
  DELETE "/usuarios/borrar" 
  PUT "/usuarios/actualizar"
  POST "/telefonos/agregar"
