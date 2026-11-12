# POLIZYM — sitio institucional

Sitio estático de una sola página para POLIZYM. El repositorio es [Polizym/polizym.github.io](https://github.com/Polizym/polizym.github.io) y el sitio público está en [https://polizym.github.io/](https://polizym.github.io/). No requiere compilación ni dependencias.

## Verlo localmente

Abrí `index.html` directamente en Google Chrome o en otro navegador moderno. No requiere compilación ni servidor local.

## Archivos

- `index.html`: contenido, navegación, metadatos y estructura de secciones.
- `styles.css`: identidad visual, composición responsive y estilos de accesibilidad.
- `script.js`: menú móvil, tarjetas de productos, formulario AJAX con FormSubmit y año del pie.
- `config.js`: email y número confirmado de WhatsApp.
- `assets/polizym.png`: logotipo original proporcionado para este proyecto.

## SEO e indexación

El sitio incluye `sitemap.xml`, `robots.txt`, URL canónica y datos estructurados de organización. En Google Search Console:

1. Añadí una propiedad de tipo **Prefijo de URL** con `https://polizym.github.io/`.
2. Elegí el método **Archivo HTML** y descargá el archivo exacto que genere Google. Colocalo en la raíz del repositorio sin cambiar su nombre ni contenido, publicalo y comprobá que su URL pública abra sin iniciar sesión; luego pulsá **Verificar**. Como alternativa, elegí **Etiqueta HTML** y enviá la etiqueta generada para agregarla sin cambios dentro de `<head>` en `index.html`; publicá y luego pulsá **Verificar**. Google exige usar el archivo o la etiqueta exactos generados para esa propiedad. No hay un código de verificación incluido todavía.
3. Cuando la propiedad esté verificada, abrí **Sitemaps**, enviá `sitemap.xml` y revisá el resultado en Search Console.
4. En **Inspección de URLs**, probá la URL principal y, cuando esté disponible, solicitá su indexación. La presencia en el sitemap o la solicitud no garantiza que Google indexe la página.

## Imágenes

- `assets/hero-film-rolls.png`: bobinas de film flexible para la portada.
- `assets/about-film-line.png`: línea genérica de conversión de film flexible para Nosotros.
- `assets/product-grid.png`: ocho escenas de productos, una por tarjeta.

Son imágenes generadas e ilustrativas; no deben identificarse como fotografías de la planta ni de productos reales de POLIZYM. Para sustituir una imagen de producto, editá el arreglo `products` en `script.js` y, si se reemplaza la lámina, ajustá el recorte asignado a cada tarjeta.
