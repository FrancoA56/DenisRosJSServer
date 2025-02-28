Peticiones Brand

*********************************************************************

Agregar una Marca
Crea una nueva marca en la base de datos.

Método: POST

URL: URL/api/brand/

Body:

json
Copy
{
  "name": "Nombre de la marca",
  "logo": "URL del logo", // Opcional
  "isDisable": false // Opcional, valor por defecto: false
}
Respuesta Exitosa:

json
Copy
{
  "id": 1,
  "name": "Nombre de la marca",
  "logo": "URL del logo",
  "isDisabled": false
}
Errores:

400: Si no se proporciona el campo name.

409: Si ya existe una marca con el mismo nombre.

500: Si ocurre un error en el servidor.


*********************************************************************


Actualizar una Marca
Actualiza el nombre o el logo de una marca existente según su id.

Método: PUT

URL: URL/api/brand/:id

Parámetros:

id: ID de la marca (número entero).

Body:

json
Copy
{
  "name": "Nuevo nombre de la marca", // Opcional
  "logo": "Nueva URL del logo" // Opcional
}
Respuesta Exitosa:

json
Copy
{
  "id": 1,
  "name": "Nuevo nombre de la marca",
  "logo": "Nueva URL del logo",
  "isDisabled": false
}
Errores:

400: Si no se proporciona un id válido o al menos un campo para actualizar.

404: Si no se encuentra una marca con el id proporcionado.

409: Si ya existe una marca con el nuevo nombre.

500: Si ocurre un error en el servidor.


*********************************************************************


Habilitar/Deshabilitar una Marca
Cambia el estado de una marca (habilitar o deshabilitar) según su id.

Método: PUT

URL: URL/api/brand/toggle-status/:id

Parámetros:

id: ID de la marca (número entero).

Respuesta Exitosa:

json
Copy
{
  "id": 1,
  "name": "Nombre de la marca",
  "logo": "URL del logo",
  "isDisabled": true // Estado actualizado
}
Errores:

400: Si no se proporciona un id válido.

404: Si no se encuentra una marca con el id proporcionado.

500: Si ocurre un error en el servidor.


*********************************************************************


Eliminar una Marca
Elimina completamente una marca de la base de datos según su id.

Método: DELETE

URL: URL/api/brand/:id

Parámetros:

id: ID de la marca (número entero).

Respuesta Exitosa:

Código de estado: 204 No Content (sin cuerpo de respuesta).

Errores:

400: Si no se proporciona un id válido.

404: Si no se encuentra una marca con el id proporcionado.

500: Si ocurre un error en el servidor.


*********************************************************************


Obtener Todas las Marcas
Obtiene todas las marcas, ordenadas alfabéticamente por nombre, con la opción de filtrar solo las habilitadas.

Método: GET
isDisable: false
URL: URL/api/brand/
isDisable: true
URL: URL/api/brand/?includeDisabled=true

Parámetros Opcionales:

includeDisabled: Si es true, incluye las marcas deshabilitadas. Por defecto es false.

Respuesta Exitosa:

json
Copy
[
  {
    "id": 1,
    "name": "Adidas",
    "logo": "https://example.com/adidas.png",
    "isDisabled": false
  },
  {
    "id": 2,
    "name": "Nike",
    "logo": "https://example.com/nike.png",
    "isDisabled": true
  }
]
Errores:

500: Si ocurre un error en el servidor.


*********************************************************************


Obtener una Marca por ID
Obtiene los detalles de una marca específica según su id.

Método: GET

URL: URL/brand/:id

Parámetros:

id: ID de la marca (número entero).

Respuesta Exitosa:

json
Copy
{
  "id": 1,
  "name": "Nombre de la marca",
  "logo": "URL del logo",
  "isDisabled": false
}
Errores:

400: Si no se proporciona un id válido.

404: Si no se encuentra una marca con el id proporcionado.

500: Si ocurre un error en el servidor.