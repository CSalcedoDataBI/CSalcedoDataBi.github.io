# Plan de Reestructuración y Profesionalización Web CSalcedoDataBI

## 1. Diagnóstico Actual

Tu sitio web actual funciona bajo la tecnología **Jekyll** con el tema **Chirpy**.

* **Puntos Fuertes:**
  * Extremadamente rápido (carga casi instantánea).
  * Diseño limpio y fácil de leer, ideal para código y tutoriales técnicos.
  * Hospedaje gratuito y seguro en GitHub Pages.
* **Puntos Débiles (Oportunidades):**
  * **Identidad de Marca:** Usa los colores por defecto del tema (gris/blanco) en lugar de tu paleta vibrante (Amarillo/Azul/Negro).
  * **Enfoque de Ventas:** No tiene una sección dedicada a productos/servicios; el usuario debe "buscarlos" entre los posts.
  * **Homepage:** Es solo un listado cronológico de posts. No dice "quién eres" ni "qué ofreces" a primera vista.

---

## 2. Estrategia: "Evolución Profesional"

El objetivo es transformar el blog en una **Plataforma de Recursos y Servicios**, manteniendo la velocidad y estructura actual.

### Etapa 1: Identidad Corporativa (Branding)

Aplicar tus colores de marca para que el sitio se sienta único.

* **Acción:** Modificar variables CSS (`_sass/addon/variables.scss` o similar) para usar tu Amarillo (#FFDD00) y Azul (#003366) en enlaces, botones y hovers.

### Etapa 2: Nueva Sección "TIENDA / RECURSOS"

Crear un espacio centralizado donde los usuarios encuentren todas tus plantillas.

* **Acción:** Crear archivo `_tabs/shop.md`.
* **Diseño:** Implementar una rejilla (Grid) de tarjetas.
  * *Tarjeta:* Imagen de la plantilla + Título + Descripción corta + Botón "Obtener" (Enlace a Buy Me a Coffee Shop).

### Etapa 3: Transformación de la Homepage

Convertir el inicio en una "Landing Page" que convierta visitas en seguidores/clientes.

* **Sección Hero (Banner):** Un encabezado visual fuerte al principio con tu foto/logo, título ("Visualización de Datos con Impacto") y subtítulo.
* **Sección Destacados:** Un carrusel o fila con tus 3 mejores plantillas.
* **Últimos Artículos:** El listado actual de posts, pero debajo de lo anterior.

### Etapa 4: Optimización de Monetización

* Integrar botones de "Paga lo que quieras" en los artículos individuales (ya empezamos con el botón de café, ahora los de producto).

---

## 3. Hoja de Ruta (Pasos a Seguir)

1. **[HECHO]** Integrar botón "Invítame a un café" en sidebar.
2. **[PENDIENTE]** Crear página `_tabs/shop.md` (Página de Tienda).
3. **[PENDIENTE]** Personalizar colores (CSS) con tu marca.
4. **[PENDIENTE]** Diseñar e insertar el "Banner Hero" en la Home.
5. **[PENDIENTE]** Actualizar posts antiguos con botones de descarga de la Tienda.

Este documento servirá como guía maestra para no perder el norte en futuras sesiones.
