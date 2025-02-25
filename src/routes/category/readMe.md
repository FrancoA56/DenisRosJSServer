Peticiones Category

*********************************************************************
Crear Categoría
Crea una nueva categoría en la base de datos.

Método: POST

URL: URL/category/

Body:

json
Copy
{
  "name": "Nombre de la categoría",
  "isDisable": false // Opcional, valor por defecto: false
}

Respuesta Exitosa:

json
Copy
{
  "id": 1,
  "name": "Nombre de la categoría",
  "isDisabled": false
}
Errores:

400: Si no se proporciona el campo name.

500: Si ocurre un error en el servidor.


*********************************************************************


Habilitar/Deshabilitar Categoría
Cambia el estado de una categoría (habilitar o deshabilitar) según su id.

Método: PUT

URL: URL/category/toggle/:id

Parámetros:

id: ID de la categoría (número entero).

Respuesta Exitosa:

json
Copy
{
  "id": 1,
  "name": "Nombre de la categoría",
  "isDisabled": true // Estado actualizado
}
Errores:

400: Si no se proporciona un id válido.

404: Si no se encuentra una categoría con el id proporcionado.

500: Si ocurre un error en el servidor.


*********************************************************************


Actualizar Nombre de una Categoría
Actualiza el nombre de una categoría existente según su id.

Método: PUT

URL: URL/category/:id

Parámetros:

id: ID de la categoría (número entero).

Body:

json
Copy
{
  "name": "Nuevo nombre de la categoría"
}
Respuesta Exitosa:

json
Copy
{
  "id": 1,
  "name": "Nuevo nombre de la categoría",
  "isDisabled": false
}
Errores:

400: Si no se proporciona un id válido o un nuevo nombre.

404: Si no se encuentra una categoría con el id proporcionado.

409: Si ya existe una categoría con el nuevo nombre.

500: Si ocurre un error en el servidor.


*********************************************************************


Obtener todas las categorías
Obtiene todas las categorías, con la opción de filtrar solo las habilitadas.

Método: GET

URL: URL/category/

Parámetros Opcionales:

includeDisabled: Si es true, incluye las categorías deshabilitadas. Por defecto es false.

Ejemplos:

Obtener solo categorías habilitadas:

bash
Copy
curl -X GET URL/category/
Obtener todas las categorías (incluyendo deshabilitadas):

bash
Copy
curl -X GET URL/category/?includeDisabled=true
Respuesta Exitosa:

json
Copy
[
  {
    "id": 1,
    "name": "Electrónica",
    "isDisabled": false
  },
  {
    "id": 2,
    "name": "Ropa",
    "isDisabled": true
  }
]
Errores:

500: Si ocurre un error en el servidor.

*********************************************************************


Obtener una categoría por ID
Método: GET

URL: URL/category/:id

Respuesta Exitosa:

json
Copy
{
  "id": 1,
  "name": "Electrónica",
  "isDisabled": false
}
Errores:

400: Si el ID no es válido.

404: Si no se encuentra la categoría.

500: Si ocurre un error en el servidor.


*********************************************************************


Eliminar una Categoría
Elimina completamente una categoría de la base de datos según su id.

Método: DELETE

URL: URL/category/:id

Parámetros:

id: ID de la categoría (número entero).

Respuesta Exitosa:

Código de estado: 204 No Content (sin cuerpo de respuesta).

Errores:

400: Si no se proporciona un id válido.

404: Si no se encuentra una categoría con el id proporcionado.

500: Si ocurre un error en el servidor.