Peticiones Users

*********************************************************************


Registrar un Usuario
Crea un nuevo usuario en la base de datos.

Método: POST

URL: URL/api/user/register

Body:

json
Copy
{
  "email": "correo@example.com", // Obligatorio 
  "password": "contraseña" // Obligatorio
}
Respuesta Exitosa:

json
Copy
{
  "id": 1,
  "email": "correo@example.com",
  "isDisabled": false,
  "createdAt": "2023-10-01T12:00:00.000Z",
  "updatedAt": "2023-10-01T12:00:00.000Z"
}
Errores:

400: Si no se proporciona el correo electrónico o la contraseña.

409: Si ya existe un usuario con el mismo correo electrónico.

500: Si ocurre un error en el servidor.


*********************************************************************


Iniciar Sesión
Inicia sesión con un usuario registrado.

Método: POST

URL: URL/api/user/login

Body:

json
Copy
{
  "email": "correo@example.com", // Obligatorio
  "password": "contraseña" // Obligatorio
}
Respuesta Exitosa:

json
Copy
{
  "token": "token_jwt_generado"
}
Errores:

400: Si no se proporciona el correo electrónico o la contraseña.

401: Si las credenciales son incorrectas.

500: Si ocurre un error en el servidor.


*********************************************************************


Obtener Perfil del Usuario
Obtiene la información del perfil del usuario autenticado.

Método: GET

URL: URL/api/user/profile

Headers:

Authorization: Bearer <token> (token JWT obtenido al iniciar sesión).

Respuesta Exitosa:

json
Copy
{
  "id": 1,
  "firstName": "Nombre",
  "lastName": "Apellido",
  "email": "correo@example.com",
  "ciudad": "Ciudad",
  "provincia": "Provincia",
  "direccion": "Dirección",
  "numeroDireccion": "Número de dirección",
  "codigoPostal": "Código Postal",
  "isDisabled": false,
  "createdAt": "2023-10-01T12:00:00.000Z",
  "updatedAt": "2023-10-01T12:00:00.000Z"
}
Errores:

401: Si el token no es válido o no se proporciona.

404: Si no se encuentra el usuario.

500: Si ocurre un error en el servidor.


*********************************************************************


Actualizar los Datos del Usuario
Actualiza los datos del usuario en la base de datos.

Método: PUT

URL: URL/api/user/:id

Headers:

Authorization: Bearer <token> (token JWT obtenido al iniciar sesión).

Body:

json
Copy
{
  "firstName": "Nombre", // Opcional
  "lastName": "Apellido", // Opcional
  "phone" : "XXXXXXXX" // Opcional
  "bday" : "fecha" // Opcional
  "ciudad": "Ciudad", // Opcional
  "provincia": "Provincia", // Opcional
  "direccion": "Dirección", // Opcional
  "numeroDireccion": "Número de dirección", // Opcional
  "codigoPostal": "Código Postal" // Opcional
}
Respuesta Exitosa:

json
Copy
{
  "id": 1,
  "firstName": "Nombre",
  "lastName": "Apellido",
  "phone": "+5491123882021",
  "bday": "07/11/1996",
  "email": "correo@example.com",
  "ciudad": "Ciudad",
  "provincia": "Provincia",
  "direccion": "Dirección",
  "numeroDireccion": "Número de dirección",
  "codigoPostal": "Código Postal",
  "isDisabled": false,
  "createdAt": "2023-10-01T12:00:00.000Z",
  "updatedAt": "2023-10-01T12:00:00.000Z"
}
Errores:

400: Si no se proporciona un id válido.

401: Si el token no es válido o no se proporciona.

404: Si no se encuentra un usuario con el id proporcionado.

500: Si ocurre un error en el servidor.


*********************************************************************


Actualizar el Rol de un Usuario
Actualiza el rol de un usuario en la base de datos.

Método: PUT

URL/api/user/role/:id

Headers:

Authorization: Bearer <token> (token JWT obtenido al iniciar sesión).

Body:
json

{
  "role": "GESTOR" // CLIENTE, GESTOR o ADMIN (obligatorio)
}

Respuesta Exitosa:
json

{
  "id": 1,
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan.perez@example.com",
  "phone": "+5491123456789",
  "bday": "1990-05-20",
  "ciudad": "Buenos Aires",
  "provincia": "Buenos Aires",
  "direccion": "Av. Siempre Viva",
  "numeroDireccion": "742",
  "codigoPostal": "1000",
  "role": "GESTOR",
  "isDisabled": false
}
Errores:
400 - Si no se proporciona un id válido o un role válido.
401 - Si el token no es válido o no se proporciona.
404 - Si no se encuentra un usuario con el id proporcionado.
500 - Si ocurre un error en el servidor.


*********************************************************************


Obtener la Lista de Usuarios
Obtiene todos los usuarios con opción de ordenarlos por id o nombre en orden ascendente o descendente.

Método: GET

URL/api/user

Headers:

Authorization: Bearer <token> (token JWT obtenido al iniciar sesión).

Query Params (Opcionales):
Parámetro	Tipo	Valores Permitidos	Descripción
orderBy	string	id, nombre	Campo por el cual ordenar los usuarios.
orderDirection	string	asc, desc	Dirección de ordenamiento (asc = ascendente, desc = descendente)

Ejemplos de Uso:
Obtener usuarios ordenados por id de forma ascendente (por defecto):

GET /users

Obtener usuarios ordenados por id de forma descendente:

GET /users?orderBy=id&orderDirection=desc

Obtener usuarios ordenados por nombre de forma ascendente:

GET /users?orderBy=nombre&orderDirection=asc

Respuesta Exitosa:
json
[
  {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan.perez@example.com",
    "phone": "+5491123456789",
    "bday": "1990-05-20",
    "ciudad": "Buenos Aires",
    "provincia": "Buenos Aires",
    "direccion": "Av. Siempre Viva",
    "numeroDireccion": "742",
    "codigoPostal": "1000",
    "role": "CLIENTE",
    "isDisabled": false
  },
  {
    "id": 2,
    "nombre": "Ana",
    "apellido": "Gómez",
    "email": "ana.gomez@example.com",
    "phone": "+549116543210",
    "bday": "1985-08-15",
    "ciudad": "Córdoba",
    "provincia": "Córdoba",
    "direccion": "Calle Falsa",
    "numeroDireccion": "123",
    "codigoPostal": "5000",
    "role": "GESTOR",
    "isDisabled": false
  }
]
Errores:
400 - Si orderBy o orderDirection contienen valores inválidos.
401 - Si el token no es válido o no se proporciona.
500 - Si ocurre un error en el servidor.