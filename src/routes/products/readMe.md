Peticiones de Productos
1. Crear Producto (Paso 1 - Producto Base)
Crea un nuevo producto base en la base de datos.

Método: POST
URL: /api/product/
Body:

json
Copy
{
  "name": "Nombre del producto",
  "sku": "SKU123",
  "shortDesc": "Descripción corta",
  "longDesc": "Descripción larga",
  "categoryId": 1,
  "brandId": 1,
  "gallery": ["url1", "url2"],
  "basePrice": 99.99,
  "baseWeight": 1.5,
  "baseLength": 10.0,
  "baseWidth": 5.0,
  "baseHeight": 2.0,
  "isDisabled": false
}
Respuesta exitosa:

json
Copy
{
  "id": 1,
  "name": "Nombre del producto",
  "sku": "SKU123",
  "shortDesc": "Descripción corta",
  "longDesc": "Descripción larga",
  "categoryId": 1,
  "brandId": 1,
  "gallery": ["url1", "url2"],
  "basePrice": 99.99,
  "baseWeight": 1.5,
  "baseLength": 10.0,
  "baseWidth": 5.0,
  "baseHeight": 2.0,
  "isDisabled": false,
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-01T00:00:00Z",
  "category": {
    "id": 1,
    "name": "Categoría Ejemplo"
  },
  "brand": {
    "id": 1,
    "name": "Marca Ejemplo"
  }
}
Errores:

400: Si no se proporcionan los campos obligatorios (name, sku, shortDesc, longDesc, basePrice)

500: Si ocurre un error en el servidor

2. Asignar Atributos a Producto (Paso 2)
Asigna atributos existentes a un producto creado.

Método: POST
URL: /api/product/:productId/attributes
Body:

json
Copy
{
  "attributes": [
    {
      "attributeId": 1,
      "isRequired": true
    },
    {
      "attributeId": 2,
      "isRequired": false
    }
  ]
}
Respuesta exitosa:

json
Copy
[
  {
    "id": 1,
    "productId": 1,
    "attributeId": 1,
    "isRequired": true,
    "attribute": {
      "id": 1,
      "name": "Color",
      "options": [
        {"id": 1, "value": "Rojo", "code": "RED"},
        {"id": 2, "value": "Azul", "code": "BLUE"}
      ]
    }
  },
  {
    "id": 2,
    "productId": 1,
    "attributeId": 2,
    "isRequired": false,
    "attribute": {
      "id": 2,
      "name": "Tamaño",
      "options": [
        {"id": 3, "value": "S", "code": "S"},
        {"id": 4, "value": "M", "code": "M"}
      ]
    }
  }
]
3. Agregar Variaciones (Paso 3)
Agrega variaciones a un producto existente.

Método: POST
URL: /api/product/:productId/variations
Body:

json
Copy
{
  "variations": [
    {
      "sku": "PROD-RED-S",
      "price": 99.99,
      "stock": 50,
      "weight": 1.4,
      "length": 9.5,
      "width": 5.0,
      "height": 2.0,
      "imageUrl": "http://ejemplo.com/imagen.jpg",
      "isDefault": true,
      "options": [
        {"attributeOptionId": 1}, // Rojo
        {"attributeOptionId": 3}  // S
      ]
    }
  ]
}
Respuesta exitosa:

json
Copy
[
  {
    "id": 1,
    "productId": 1,
    "sku": "PROD-RED-S",
    "price": 99.99,
    "stock": 50,
    "weight": 1.4,
    "length": 9.5,
    "width": 5.0,
    "height": 2.0,
    "imageUrl": "http://ejemplo.com/imagen.jpg",
    "isDefault": true,
    "options": [
      {
        "id": 1,
        "attributeOptionId": 1,
        "attributeOption": {
          "id": 1,
          "value": "Rojo",
          "code": "RED"
        }
      },
      {
        "id": 2,
        "attributeOptionId": 3,
        "attributeOption": {
          "id": 3,
          "value": "S",
          "code": "S"
        }
      }
    ]
  }
]
4. Editar Producto Base
Actualiza un producto en la base de datos.

Método: PUT
URL: /api/product/:id
Body:

json
Copy
{
  "name": "Nuevo nombre",
  "shortDesc": "Nueva descripción corta",
  "longDesc": "Nueva descripción larga",
  "basePrice": 89.99,
  "isDisabled": false
}
Respuesta exitosa:

json
Copy
{
  "id": 1,
  "name": "Nuevo nombre",
  "sku": "SKU123",
  "shortDesc": "Nueva descripción corta",
  "longDesc": "Nueva descripción larga",
  "basePrice": 89.99,
  "updatedAt": "2023-01-02T00:00:00Z"
  /* ... otros campos ... */
}
5. Obtener Productos (Filtrados y Ordenados)
Obtiene un listado de productos con opciones de filtrado y ordenamiento.

Método: GET
URL: /api/product
Parámetros de consulta (opcionales):

page: Número de página (default: 1)

pageSize: Items por página (default: 18)

sortBy: Campo para ordenar (id, name, basePrice, createdAt, etc.)

sortOrder: asc o desc

category: ID de categoría para filtrar

brand: ID de marca para filtrar

isDisabled: true o false

search: Texto para buscar en nombre, SKU o descripciones

Ejemplo de URL:
/api/product?page=2&pageSize=12&sortBy=basePrice&sortOrder=desc&category=1&search=zapatilla

Respuesta exitosa:

json
Copy
{
  "data": [
    {
      "id": 1,
      "name": "Zapatilla Running",
      "sku": "ZAP-RUN-001",
      "shortDesc": "Zapatilla para running profesional",
      "basePrice": 120.99,
      "category": {"id": 1, "name": "Zapatillas"},
      "brand": {"id": 3, "name": "Nike"},
      "gallery": ["url1.jpg", "url2.jpg"]
    }
    /* ... más productos ... */
  ],
  "pagination": {
    "totalItems": 45,
    "totalPages": 4,
    "currentPage": 2,
    "pageSize": 12
  }
}
6. Deshabilitar/Habilitar Producto
Cambia el estado isDisabled de un producto.

Método: PUT
URL: /api/product/toggle/:id
Respuesta exitosa:

json
Copy
{
  "id": 1,
  "name": "Zapatilla Running",
  "isDisabled": true,
  "updatedAt": "2023-01-02T00:00:00Z"
}
7. Obtener Detalle de Producto Completo
Obtiene todos los detalles de un producto incluyendo variaciones.

Método: GET
URL: /api/product/:id
Respuesta exitosa:

json
Copy
{
  "id": 1,
  "name": "Zapatilla Running",
  /* ... campos base ... */
  "attributes": [
    {
      "id": 1,
      "name": "Color",
      "isRequired": true,
      "options": [
        {"id": 1, "value": "Rojo"},
        {"id": 2, "value": "Azul"}
      ]
    }
  ],
  "variations": [
    {
      "id": 1,
      "sku": "ZAP-RUN-RED",
      "price": 120.99,
      "stock": 50,
      "options": [
        {"attributeOptionId": 1, "value": "Rojo"}
      ]
    }
  ],
  "discount": {
    "type": "percentage",
    "value": 10.0,
    "startDate": "2023-01-01T00:00:00Z",
    "endDate": "2023-12-31T23:59:59Z"
  }
}
Notas importantes:

Todos los campos de texto (name, shortDesc, longDesc) son obligatorios

El precio base (basePrice) es requerido

Las variaciones ahora se manejan en pasos separados

Los atributos deben existir antes de asignarlos a productos

Cada variación debe incluir opciones de atributos válidas

