Enlace al repositorio: https://github.com/enriquejoau/Bibliotecanestjs.git.

Se inicia el servidor con :
npm run start

Y si no se instalo las dependencias :
npm install

Endpoints principales
GET /libros: Obtiene todos los libros con sus autores y categorías.
POST /libros: Crea un nuevo libro con categorías.
PUT /libros/{id} : Actualiza un libro existente.
DELETE /libros/{id} : Elimina un libro.
GET /categorias: Obtiene todas las categorías.
GET /categorias/{id}: Obtienes la categoria segun id.
POST /categorias: Crea una nueva categoría.
PUT /categorias/{id} : Actualiza una categoria
DELETE /categorias/{id} : Elimina una categoria.
GET /autores: Obtiene todos los autores.
GET /autores/{id}: Obtienes el autor segun id.
POST /autores: Crea nuevos autores.
PUT /autores/{id} : Actualiza autores
DELETE /autores/{id} : Elimina autores.

Para Base de Datos
DATABASE_URL="postgresql://<usuario>:<contraseña>@localhost:5432/<nombre_de_base_de_datos>"

Ejecuta las migraciones para crear las tablas:
npx prisma migrate dev --name init

Genera el cliente de Prisma:
npx prisma generate
