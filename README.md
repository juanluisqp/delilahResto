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




### Esto es un H3
#### Esto es un H4
*Esto es cursiva*
- Esto es viñeta 1.
  - Viñeta 1.1 con sangria.
  - Viñeta N.
```
//bloque de codigo...
```
[texto a mostrar](#mi-titulo-a-anclar)
*
