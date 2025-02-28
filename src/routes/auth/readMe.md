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