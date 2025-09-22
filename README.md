# Bookstore – Parcial
## Daniel Felipe Ortiz - 202221234

## Arquitectura
Aplicación en Next.js (App Router) con TypeScript y Tailwind. El CRUD de autores consume `http://127.0.0.1:8080/api/authors`.  
El estado de la lista se gestiona con un Context (`AuthorsProvider`). Para el parcial, se añadió la funcionalidad de **favoritos**, almacenando en memoria (Set de IDs) y persistiendo mientras se navega.  
Rutas:
- `/authors`: listado, con acciones de editar, eliminar y marcar favorito.
- `/crear`: formulario controlado para crear autor.
- `/authors/[id]/edit`: edición del autor.
- `/favoritos`: listado filtrado de autores marcados como favoritos.

## Parte B elegida: Accesibilidad
- Foco de teclado visible (`focus:ring` en botones y links).
- Atributos ARIA en acciones: `aria-label` y `aria-pressed` para favoritos.
- Formularios con `aria-invalid` y mensajes de error con `role="alert"`.
- Botón de envío deshabilitado si el formulario es inválido.

## Cómo correr
1. Backend (Docker):
   ```bash
   docker build . -t bookstore
   docker run -d -p 127.0.0.1:8080:8080 bookstore

2. Fronted:
    npm install
    npm run dev
