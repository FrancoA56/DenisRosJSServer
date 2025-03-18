Peticiones Product

*********************************************************************


Crear Producto
Crea un nuevo producto en la base de datos.

Método: POST

URL: URL/api/product/

Body:

```json
{
  "name": "Nombre del producto",
  "sku": "SKU123",
  "shortDesc": "Descripción corta",
  "longDesc": "Descripción larga",
  "categoryId": 1,
  "brandId": 1,
  "gallery": ["url1", "url2"],
  "variations": [
    {
      "type": "Tamaño",
      "code": "S",
      "name": "Pequeño",
      "price": 10.0
    }
  ],
  "discount": {
    "type": "percentage",
    "value": 10.0,
    "startDate": "2023-01-01T00:00:00Z",
    "endDate": "2023-12-31T23:59:59Z"
  },
  "length": 10.0,
  "width": 5.0,
  "height": 2.0,
  "weight": 1.0,
  "isDisabled": false
}

Respuesta exitosa:

{
  "id": 1,
  "name": "Nombre del producto",
  "sku": "SKU123",
  "shortDesc": "Descripción corta",
  "longDesc": "Descripción larga",
  "categoryId": 1,
  "brandId": 1,
  "gallery": ["url1", "url2"],
  "variations": [
    {
      "id": 1,
      "type": "Tamaño",
      "code": "S",
      "name": "Pequeño",
      "price": 10.0
    }
  ],
  "discount": {
    "id": 1,
    "type": "percentage",
    "value": 10.0,
    "startDate": "2023-01-01T00:00:00Z",
    "endDate": "2023-12-31T23:59:59Z"
  },
  "length": 10.0,
  "width": 5.0,
  "height": 2.0,
  "weight": 1.0,
  "isDisabled": false,
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-01T00:00:00Z"
}

Errores:

400: Si no se proporcionan los campos obligatorios.

500: Si ocurre un error en el servidor.


*********************************************************************


Editar Producto
Actualiza un producto en la base de datos.

Método: PUT

URL: URL/api/product/:id

Body:

```json
{
  "shortDesc": "Descripción corta",
  "longDesc": "Descripción larga",
 }

Respuesta exitosa:

{
  "id": 1,
  "name": "Nombre del producto",
  "sku": "SKU123",
  "shortDesc": "Descripción corta",
  "longDesc": "Descripción larga",
  "categoryId": 1,
  "brandId": 1,
  "gallery": ["url1", "url2"],
  "variations": [
    {
      "id": 1,
      "type": "Tamaño",
      "code": "S",
      "name": "Pequeño",
      "price": 10.0
    }
  ],
  "discount": {
    "id": 1,
    "type": "percentage",
    "value": 10.0,
    "startDate": "2023-01-01T00:00:00Z",
    "endDate": "2023-12-31T23:59:59Z"
  },
  "length": 10.0,
  "width": 5.0,
  "height": 2.0,
  "weight": 1.0,
  "isDisabled": false,
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-01T00:00:00Z"
}

Errores:

400: Si no se proporcionan los campos obligatorios.

500: Si ocurre un error en el servidor.


*********************************************************************


Traer todos los productos, ordenados y filtrados.

Obtener todos los productos
Obtiene un listado de productos con opciones de filtrado y ordenamiento.

Método: GET

page: Número de la página (por defecto 1).
pageSize: Cantidad de productos por página (por defecto 18).

URL: URL/api/product?page=1&pageSize=18&sortBy=name&sortOrder=asc

Parámetros de consulta (opcionales):

- `sortBy`: Campo por el cual ordenar (opciones: `id`, `sku`, `name`, `category`, `brand`, `discount`, `isDisabled`, `createdAt`, `updatedAt`).
- `sortOrder`: Orden de clasificación (`asc` o `desc`).
- `category`: ID de la categoría para filtrar.
- `brand`: ID de la marca para filtrar.
- `isDisabled`: Estado del producto (`true` o `false`).
- `search`: Texto para buscar en nombre, SKU, descripción corta o larga.

Ejemplo de URL:

Ejemplos de uso
Filtrado por categoría y marca:
GET /api/product?category=1&brand=2

Ordenamiento por nombre ascendente:
GET /api/product?sortBy=name&sortOrder=asc

Filtrado por isDisabled y ordenamiento por fecha de creación descendente:
GET /api/product?isDisabled=false&sortBy=createdAt&sortOrder=desc

Búsqueda por texto (en nombre, SKU, descripción corta o larga):
GET /api/product?search=producto

Combinación de filtros y ordenamiento:
GET /api/product?category=1&brand=2&isDisabled=false&sortBy=name&sortOrder=asc&search=producto


*********************************************************************


Deshabilitar Producto
Deshabilita/Habilita un nuevo producto en la base de datos.

Método: PUT

URL: URL/api/product/toggle/:id

Params: Id del producto a modificar

Respuesta exitosa:

{
  "id": 1,
  "name": "Nombre del producto",
  "sku": "SKU123",
  "shortDesc": "Descripción corta",
  "longDesc": "Descripción larga",
  "categoryId": 1,
  "brandId": 1,
  "gallery": ["url1", "url2"],
  "variations": [
    {
      "id": 1,
      "type": "Tamaño",
      "code": "S",
      "name": "Pequeño",
      "price": 10.0
    }
  ],
  "discount": {
    "id": 1,
    "type": "percentage",
    "value": 10.0,
    "startDate": "2023-01-01T00:00:00Z",
    "endDate": "2023-12-31T23:59:59Z"
  },
  "length": 10.0,
  "width": 5.0,
  "height": 2.0,
  "weight": 1.0,
  "isDisabled": false|true,
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-01T00:00:00Z"
}

Errores:

400: Si no se proporcionan los campos obligatorios.

500: Si ocurre un error en el servidor.
