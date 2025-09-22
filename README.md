# Parcial Bookstore (Autores)
## Daniel Felipe Ortiz - 202221234

App hecha con Next.js (App Router) + TypeScript + Tailwind. Es una extensión del preparcial.
Se conecta al back en "http://127.0.0.1:8080/api/authors".

## Qué hice (rápido)
- Lista de autores en "/authors" (lee del api).
- Crear autor en "/crear".
- Editar en "/authors/[id]/edit".
- **Favoritos**: agregué un botón ":D" para marcar y una vista "/favoritos" que solo muestra los marcados. El estado de favs queda en memoria mientras uno navega (no guardo en BD).

## Parte B -  ACCESIBILIDAD
- **Accesibilidad** básica: usé "aria-label" para los botones (editar, eliminar, favorito), "aria-pressed" para favorito, y en el form puse Waria-invalid" + mensajes con "role="alert"". No es súper completo pero funciona :p.

## Cómo correr (como yo lo hice)
1. Backend con Docker:
    docker build . -t bookstore
    docker run -d -p 127.0.0.1:8080:8080 bookstore
    "Abres http://127.0.0.1:8080/api/authors y debe salir json."

2.  Fronted:
    npm install
    npm run dev
    Ir a http://localhost:3000


## Notas
- Eliminar: si el autor tiene libros, el back tira 412 y no deja (yo muestro un alert y ya).
- Favoritos: se pierden si recargo (porque no los guardé en server ni localStorage). En clase pedían que se mantenga **mientras se navega**, y eso sí pasa.

## Cosas que me faltaron (por tiempo)
- Validaciones más chéveres (tipo RHF/Zod). Dejé lo básico con useState.
- Estilos podrían estar mejor, pero preferí que funcione primero :D
