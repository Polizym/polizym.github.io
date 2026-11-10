# POLIZYM — sitio institucional

Sitio estático de una sola página para POLIZYM. El repositorio es [Polizym/polizym.github.io](https://github.com/Polizym/polizym.github.io) y el sitio público está en [https://polizym.github.io/](https://polizym.github.io/). No requiere compilación ni dependencias.

## Verlo localmente

Abrí `index.html` directamente en Google Chrome o en otro navegador moderno. No requiere compilación ni servidor local.

## Archivos

- `index.html`: contenido, navegación, metadatos y estructura de secciones.
- `styles.css`: identidad visual, composición responsive y estilos de accesibilidad.
- `script.js`: menú móvil, tarjetas de productos, formulario mailto y año del pie.
- `config.js`: email y número de WhatsApp configurable.
- `assets/polizym.png`: logotipo original proporcionado para este proyecto.

El número de WhatsApp queda desactivado (`null`) hasta que se confirme su formato internacional. Al validarlo, actualizá `whatsappE164` en `config.js` con el número en formato `+549...`.

## Imágenes

- `assets/hero-film-rolls.png`: bobinas de film flexible para la portada.
- `assets/about-film-line.png`: línea genérica de conversión de film flexible para Nosotros.
- `assets/product-grid.png`: ocho escenas de productos, una por tarjeta.

Son imágenes generadas e ilustrativas; no deben identificarse como fotografías de la planta ni de productos reales de POLIZYM. Para sustituir una imagen de producto, editá el arreglo `products` en `script.js` y, si se reemplaza la lámina, ajustá el recorte asignado a cada tarjeta.
