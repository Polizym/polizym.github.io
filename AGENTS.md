# Reglas permanentes de desarrollo — POLIZYM

Estas instrucciones aplican únicamente a este proyecto y a su repositorio dedicado. POLIZYM y Lucuma Records deben permanecer completamente independientes.

- Carpeta local: `C:\Users\Usuario\Desktop\Polizym-Web`.
- Remoto autorizado: `https://github.com/Polizym/polizym.github.io.git` (`origin`).
- Sitio público: `https://polizym.github.io/`.

## Flujo de trabajo

- Antes de cualquier operación de Git, confirmar que la carpeta de trabajo y la raíz del repositorio correspondan a `Polizym-Web`.
- Comprobar que `origin` sea exactamente `https://github.com/Polizym/polizym.github.io.git` y que la raíz del repositorio sea la carpeta local de POLIZYM. No inferir ni inventar una URL. No operar sobre repositorios ni archivos de Lucuma Records.
- Analizar los archivos existentes antes de cada cambio. Implementar la solución más sencilla y mantenible, respetando el diseño y el contenido aprobados.
- Verificar los cambios y la compatibilidad con GitHub Pages antes de guardarlos en Git.
- Al completar una tarea, crear un commit claro y descriptivo y ejecutar `git push origin main` únicamente si el remoto POLIZYM está confirmado y las comprobaciones pasan.
- No usar `git push --force`, reescribir historial ni incluir cambios ajenos a la tarea. Revisar los archivos staged antes del commit.
- No eliminar archivos importantes sin autorización y no subir contraseñas, claves privadas ni información sensible.
- No publicar en otro repositorio, cambiar privacidad, permisos, dominios o configuración de seguridad sin autorización.
- Si falta el remoto, no configurar uno por cuenta propia. Informar qué dato o intervención se necesita.

## Sitio y publicación

- Este es un sitio institucional estático. Mantener HTML, CSS y JavaScript sencillos; no añadir CMS, frameworks, bases de datos ni servidores innecesarios.
- Mantener `index.html` en la raíz y usar rutas de recursos compatibles con GitHub Pages.
- Conservar la posibilidad de abrir `index.html` directamente en Chrome, sin Python.
- El destino es `https://polizym.github.io/`, publicado por GitHub Pages desde la rama `main` y la carpeta raíz (`/`). Comprobar la configuración de Pages cuando sea posible e informar si falta activación manual.
- No publicar automáticamente mediante cambios a la configuración de privacidad, permisos, dominios o seguridad.

## Entrega

Al terminar cada tarea, informar brevemente qué cambió, qué se comprobó, si el commit y el push se completaron y qué problemas quedan pendientes.
