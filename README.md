# delilahResto
Tercer y ultimo proyecto del curso DWFS de Acamica. Este proyecto consiste en hacer una API para un restaurante, en donde sera posible crear usuarios, listar productos y hacer pedidos (siendo usuario) y tambien se podra hacer CRUD de las ordenes, los productos e incluso los usuarios (teniendo permisos de administrador).

## **Antes de empezar:**
- Para usar la API es necesario:
  - Instalar Node.js
  - Instalar Postman o alguna herramienta similar para realizar peticiones HTTP
  - Tener instalado un IDE (como por ejemplo: Visual Studio Code)
  - Instalar XAMPP o algun otro gestor de base de datos MySQL.
  - Clonar el contenido del repositorio o descargarlo directamente.

## **Instrucciones:**
1- El primer paso sera abrir el proyecto en nuestro IDE, abrir la terminal y ejecutar el comando 

`npm i`

o

`npm install`

Esto instalara las dependencias necesarias listadas en el archivo package.json para el correcto funcionamiento de la API.

2- Seguidamente sera necesario importar nuestra base de datos (el archivo .sql) a nuestro gestor de bases de datos. Se recomienda nombrar la base de datos creada como:
*delilahresto*
Ya que en el archivo de configuracion (configDB) esta generado con este nombre. En caso de querer cambiar el nombre de la base de datos, se puede hacer, teniendo en cuenta cambiar el nombre de la base de datos en el archivo "congifDB.js".

**Al importar nuestra base de datos, la misma estara poblada con algunos productos de ejemplo, asi como un usuario administrador el cual tendra como username: <admin> y como contraseña: <admin>.** 

Este usuario permitira realizar todas las funciones de administrador (CRUD de ordenes, productos y usuarios) asi como tambien podra crear otros usuarios con rol de administrador.

Verificar que la base de datos este corriendo sobre el puerto 3000.

3- Una vez este la base de datos funcionando y tengamos instaladas nuestras dependencias, el ultimo paso antes de realizar las peticiones HTTP sera correr desde la terminal el comando

`npm start`

Esto hara que el servidor sea inicializado mostrando el mensaje "Bienvenido a delilah resto!". En este punto la API estara en funcionamiento para hacer peticiones.


## **Peticiones:**

Para realizar las peticiones se debera indicar el url del servidor local a traves de la ruta "http://localhost:3000" y a partir de alli usar la respectiva ruta para cada endpoint. 

Para realizar la mayoria de las peticiones se necesita tener un token. Este token sera proveido al usar el endpoint de login. Es un principio se puede logear como administrador usando el username: admin y contraseña: admin. Tambien sera proveido a los usuarios con rol de usuario.

El token debera ser guardado y usado al hacer las peticiones HTTP en el apartado de Authorization e indicar que el valor se trata de un bearer Token.
- **Usuarios**
  - **Login. (verbo: POST) Ruta:** */auth/login*  
  
Este endpoint permitira el logeo de los usuarios registrados. Se debera enviar la informacion a la api en formato JSON de la siguiente manera:
```
{
"username": "usuarioDeEjemplo" (String),
"password": "contraseñaFalsa123 (String)"
}
```

En caso de ser exitoso el request, la respuesta sera un objeto indicando el nombre de usuario y el token que debera ser utilizado en los endpoints que correspondan.
En caso de haber error en usuario o contraseña, la respuesta sera un mensaje en formato JSON indicando que el usuario o la contraseña no coinciden con ningun valor de la base de datos.

  - **SignUp. (verbo: POST) Ruta** */users/signup* <br>

Este endpoint permitira el ingreso de nuevos usuarios.
Para el ingreso de un usuario se debera ingresar la informacion en formato JSON de la siguiente manera:

```
{
"username": "usuarioDeEjemplo" (String),
"full_name": "Pedro Perez" (String),
"email": "emailDeEjemplo@delilah.com" (String),
"phone": "+1 234 344 344" (String),
"address": "Direccion tal" (String),
"password": "contraseñaFalsa123" (String)
}
```

En caso de ser exitoso el request la respuesta sera un objeto JSON con un mensaje indicando que el usuario fue creado correctamente.
En caso de fallar el request la respuesta indicara que no se pudo crear el usuario.

  - **SignUp de administrador. (verbo POST) Ruta** */users/admin* - Se Requiere permisos de administrador <br>

Este endpoint permitira el ingreso de nuevos usuarios con rol tanto de administrador como de usuarios.

Para el ingreso de un usuario se debera ingresar la informacion en formato JSON de la siguiente manera:

```
{
"username": "usuarioDeEjemplo" (String),
"full_name": "Pedro Perez" (String),
"email": "emailDeEjemplo@delilah.com" (String),
"phone": "+1 234 344 344" (String),
"address": "Direccion tal" (String),
"password": "contraseñaFalsa123" (String),
"role_id": "1"
}
```
Los valores de role_id seran de 1 en caso de administrador y 2 en caso de usuario.

En caso de ser exitoso el request la respuesta sera un objeto JSON con un mensaje indicando que el usuario fue creado correctamente.
En caso de fallar el request la respuesta indicara que no se pudo crear el usuario.

  - **Editar un usuario. (verbo PATCH Ruta** */users/id* - Se Requiere permisos de administrador <br>
Este endpoint permitira la modificacion de usuarios.
Para la modificacion de un usuario se debera ingresar la informacion en formato JSON de la siguiente manera:

```
{
"full_name": "Pedro Perez" (String),
"phone": "+1 234 344 344" (String),
"address": "Direccion tal" (String),
"password": "contraseñaFalsa123" (String),
}
```

Los valores de email y nombre de usuario no podran ser cambiados debido a que deberan ser unicos para cada usuario.
En caso de que el request sea exitoso la respuesta sera un mensaje informando que el usuario se ha modificado exitosamente.
En caso contrario, la respuesta indicara que no se pudo modificar o actualizar el usuario.

  - **Eliminar un usuario. (verbo DELETE Ruta** */users/id* - Se Requiere permisos de administrador <br>
Este endpoint permitira la eliminacion de usuarios 
Para la eliminacion de un usuario se debera hacer la peticion e indicar a traves del url, el id del usuario que se quiere eliminar

En caso de que el request sea exitoso la respuesta sera un mensaje informando que el usuario se ha eliminado exitosamente.
En caso contrario, la respuesta indicara que no se pudo eliminar el usuario.

- **Productos**
  - **Ingreso de productos. (verbo: POST) Ruta** */products* - Se Requiere permisos de administrador <br>
  Este endpoint permitira el ingreso de nuevos productos a la base de datos. 
  Se debera enviar la informacion en formato JSON de la siguiente manera:
  
  ```
  {
  "product_name": "Producto de ejemplo" (String
  "price": xxx (Integer)
  }
  ```
  
  En caso de que el request haya sido exitoso la respuesta sera un mensaje indicando que el producto fue agregado correctamente.
  En caso de no poder realizar el request el mensaje sera que no se pudo crear el producto.
  
    - **Modificacion de un producto. (verbo: PUT) Ruta** */products/id* - Se Requiere permisos de administrador <br>
  Este endpoint permitira la modificacion de informacion de productos.
  Se debera enviar la informacion en formato JSON de la siguiente manera:
  
  ```
  {
  "product_name": "Producto de ejemplo" (String
  "price": xxx (Integer)
  }
  ```
  
  Ademas se deberia indicar el ID del producto que se quiere modificar a traves del URL del endpoint.
  
  En caso de que el request haya sido exitoso la respuesta sera un mensaje indicando que el producto fue modificado correctamente.
  En caso de no poder realizar el request el mensaje sera que no se pudo modificar el producto.
  
    - **Eliminacion de un producto. (verbo: DELETE) Ruta** */products/id* - Se Requiere permisos de administrador <br>
  Este endpoint permitira la eliminacion de productos.
  Se debera enviar el id del producto que se quiera eliminar a traves del URL del endpoint.
  
  En caso de que el request haya sido exitoso la respuesta sera un mensaje indicando que el producto fue eliminado correctamente.
  En caso de no poder realizar el request el mensaje sera que no se pudo eliminar el producto.
  
    - **Informacion de productos. (verbo: GET) Ruta** */products* <br>
  Este endpoint permitira listar todos los productos disponibles.
  
  
  En caso de que el request haya sido exitoso la respuesta sera un objeto JSON con todos los procutos disponibles.
  En caso de no poder realizar el request el mensaje sera que no se pudo obtener informacion.
  
   - **Informacion de productos por ID. (verbo: GET) Ruta** */products/id* <br>
  Este endpoint permitira ver la informacion de un producto en especiifico.
  Se debera enviar el id del producto a traves del URL del endpoint.
  
  
  En caso de que el request haya sido exitoso la respuesta sera un objeto JSON con la informacion del producto.
  En caso de no poder realizar el request el mensaje sera que no se pudo obtener informacion.
  
  - Ordenes:
    - **Informacion de ordenes. (verbo: GET) Ruta** */orders* <br>
  Este endpoint permitira listar todas las pordenes que esten en la base de datos.
  
  
  En caso de que el request haya sido exitoso la respuesta sera un objeto JSON con toda la informacion referente a ordenes.
  En caso de no poder realizar el request el mensaje sera que no se pudo obtener informacion.
  
   - **Informacion de ordenes por id. (verbo: GET) Ruta** */orders/id* - se requiere permisos de administrador <br>
  Este endpoint permitira revisar toda la informacion ingresada referente a una orden especifica.
  Se debera enviar el id de la orden a traves del URL del endpoint.
  
  
  En caso de que el request haya sido exitoso la respuesta sera un objeto JSON con toda la informacion referente a la orden.
  En caso de no poder realizar el request el mensaje sera que no se pudo obtener informacion.
  
  - **Creacion de una orden. (verbo: POST) Ruta** */orders* - Se Requiere permisos de administrador <br>
  Este endpoint permitira la creacion de una orden 
  Se debera enviar la informacion **CON FORMATO ARRAY DE OBJETOS** de la siguiente manera:
  
  ```
  [
  {"payment_method_id": X (Integer)},
  {"user_id": X (integer)}, 
  {"product_id": x (integer)},
  {"product_id": x (Integer)}
  ]
  ```
  En el array enviado en el body, los dos primeros objetos perteneceran al metodo de pago y al usuario que esta generando la orden (en ese orden respectivamente), seguido de los productos que se desean ingresar a esa orden. En caso de querer agregar mas productos se debe hacer agregando mas objetos con la propiedad product_id y el valor del producto.
  
  
  En caso de que el request haya sido exitoso la respuesta sera un mensaje indicando que la orden fue generada correctamente.
  En caso de no poder realizar el request la respuesta tendra status code de 400 e indicara error a traves de la consola.
  
   - **modificacion de una orden. (verbo: PUT) Ruta** */orders/id* - Se Requiere permisos de administrador <br>
  Este endpoint permitira la modificacion de una orden 
  Se debera enviar la informacion en formato JSON de la siguiente manera:
  
  ```
  {
  "payment_method": x (integer),
  "status_id": x (integer)
  }
  ```
  Los id correspondientes para cada metodo de pago y estado de orden podran ser revisados a traves del gestor de base de datos.
  
  
  En caso de que el request haya sido exitoso la respuesta sera un mensaje indicando quela orden fue modificada correctamente.
  En caso de no poder realizar el request la respuesta sera que no se pudo modificar la orden.
  
   - **Eliminar una orden. (verbo DELETE Ruta** */orders/id* - Se Requiere permisos de administrador <br>
Este endpoint permitira la eliminacion de una orden. 
Para la eliminacion de una orden se debera hacer la peticion e indicar a traves del url el id de la orden que se quiere eliminar.

En caso de que el request sea exitoso la respuesta sera un mensaje informando que la orden se ha eliminado exitosamente.
En caso contrario, la respuesta indicara que no se pudo eliminar la orden.

  
  
  
  
