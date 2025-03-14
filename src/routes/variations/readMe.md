Peticiones Variations
Crear Variación
Crea una nueva variación para un producto en la base de datos.

Método: POST

URL: URL/api/variation/

Body:

json

{
  "productId": 1,
  "type": "Tamaño",
  "code": "S",
  "name": "Pequeño",
  "price": 10.0,
  "length": 15.0, // Opcional
  "width": 10.0,  // Opcional
  "height": 5.0,  // Opcional
  "weight": 1.5   // Opcional
}
Respuesta Exitosa:

json

{
  "id": 1,
  "productId": 1,
  "type": "Tamaño",
  "code": "S",
  "name": "Pequeño",
  "price": 10.0,
  "length": 15.0,
  "width": 10.0,
  "height": 5.0,
  "weight": 1.5
}
Errores:

400: Si faltan campos obligatorios (productId, type, code, name, price).

404: Si no se encuentra el producto asociado.

500: Si ocurre un error en el servidor.

Obtener una Variación por ID
Obtiene una variación específica según su ID.

Método: GET

URL: URL/api/variation/:id

Parámetros:

id: ID de la variación (número entero).

Respuesta Exitosa:

json

{
  "id": 1,
  "productId": 1,
  "type": "Tamaño",
  "code": "S",
  "name": "Pequeño",
  "price": 10.0,
  "length": 15.0,
  "width": 10.0,
  "height": 5.0,
  "weight": 1.5
}
Errores:

400: Si el ID no es válido.

404: Si no se encuentra la variación.

500: Si ocurre un error en el servidor.

Actualizar una Variación
Actualiza una variación existente según su ID.

Método: PUT

URL: URL/api/variation/:id

Parámetros:

id: ID de la variación (número entero).

Body (opcional):

json

{
  "type": "Tamaño",
  "code": "M",
  "name": "Mediano",
  "price": 15.0,
  "length": 20.0,
  "width": 15.0,
  "height": 10.0,
  "weight": 2.0
}
Respuesta Exitosa:

json

{
  "id": 1,
  "productId": 1,
  "type": "Tamaño",
  "code": "M",
  "name": "Mediano",
  "price": 15.0,
  "length": 20.0,
  "width": 15.0,
  "height": 10.0,
  "weight": 2.0
}
Errores:

400: Si el ID no es válido o no se proporcionan datos para actualizar.

404: Si no se encuentra la variación.

500: Si ocurre un error en el servidor.

Eliminar una Variación
Elimina una variación de la base de datos según su ID.

Método: DELETE

URL: URL/api/variation/:id

Parámetros:

id: ID de la variación (número entero).

Respuesta Exitosa:

Código de estado: 204 No Content (sin cuerpo de respuesta).

Errores:

400: Si el ID no es válido.

404: Si no se encuentra la variación.

500: Si ocurre un error en el servidor.

Obtener todas las Variaciones de un Producto
Obtiene todas las variaciones asociadas a un producto específico.

Método: GET

URL: URL/api/variation/product/:productId

Parámetros:

productId: ID del producto (número entero).

Respuesta Exitosa:

json

[
  {
    "id": 1,
    "productId": 1,
    "type": "Tamaño",
    "code": "S",
    "name": "Pequeño",
    "price": 10.0,
    "length": 15.0,
    "width": 10.0,
    "height": 5.0,
    "weight": 1.5
  },
  {
    "id": 2,
    "productId": 1,
    "type": "Tamaño",
    "code": "M",
    "name": "Mediano",
    "price": 15.0,
    "length": 20.0,
    "width": 15.0,
    "height": 10.0,
    "weight": 2.0
  }
]
Errores:

400: Si el productId no es válido.

404: Si no se encuentra el producto.

500: Si ocurre un error en el servidor.