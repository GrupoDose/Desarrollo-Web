# Logatech · Página de inicio · 5 propuestas

Propuestas de diseño para la nueva web de **Loga Soluciones Científicas para Laboratorio** (razón social: Logatech Corporation Industrial S.A. de C.V.), construidas a partir del cuestionario de rediseño y del boceto de la página de inicio.

Abre `index.html` para ver el índice, o cada archivo directamente:

| # | Archivo | Referencia | Idea |
|---|---------|------------|------|
| 1 | `01-catalogo-ctr.html` | ctrscientific.com | Catálogo tipo e-commerce: buscador, barra de categorías, tarjetas de producto, carrito de cotización. |
| 2 | `02-minimal-apple.html` | apple.com/mx | Minimal premium: tipografía grande, tiles blanco/negro, hero full-screen con crossfade. |
| 3 | `03-corporativo-labs.html` | Thermo Fisher · Sartorius · Eppendorf · bioMérieux | Corporativo científico: pestañas por cliente, catálogo, recursos, formulario B2B. |
| 4 | `04-futurista-salud.html` | — | Bio-futurista: fondo profundo, brillos cian/verde, cristal, ECG, ADN. |
| 5 | `05-editorial-bento.html` | — (libre) | Editorial bento: fondo cálido, serif, retícula bento, carrusel, barra sticky WhatsApp. |

## Componentes del boceto (presentes en las 5)

- **Hero enfocado en 4 audiencias** con flechas, indicadores, autoplay y transición distinta en cada propuesta: deslizamiento + Ken Burns (1), crossfade + desenfoque (2), revelado circular (3), barrido con línea de escaneo (4), volteo 3D (5). Audiencias: Hospitales · Laboratorios clínicos · Empresas con reclutamiento · Industria.
- **Marcas con las que trabajamos** (marquee o retícula con las marcas autorizadas del cuestionario).
- **Más pedidos en todo México**: 6 productos reales del cuestionario (DOA164, 368171, CAGD025E, PT7114, 64840, IDEC-425). Al hacer clic se abre un **pop-up de producto estilo Amazon adaptado** al diseño: miniaturas, imagen grande, viñetas "Acerca de este producto", tabla de especificaciones, caja de compra con cantidad, "Agregar a cotización", "Cotizar por WhatsApp" (arma el mensaje con producto, clave y cantidad), pestañas (descripción, especificaciones, envío y garantía) y productos relacionados.
- **Categorías**: las 4 principales destacadas + las otras 5 del cuestionario como accesos rápidos.
- Extras del cuestionario: envío gratis desde $5,000, cadena de frío lunes y miércoles, registro COFEPRIS, servicio técnico propio, crédito a 15 y 30 días, equipos nuevos de fábrica, contacto real y redes.

## Subir a Elementor

1. Abre el `.html` en un editor de texto.
2. Copia todo lo que está entre `<!-- ===== INICIO BLOQUE ELEMENTOR ===== -->` y `<!-- ===== FIN BLOQUE ELEMENTOR ===== -->`.
3. Página nueva con plantilla **Elementor Canvas** (o Full Width si conservas header/footer del tema; en ese caso borra el `<header>`/`<nav>` y `<footer>` del bloque).
4. Sección de ancho completo, sin padding → widget **HTML** → pegar → publicar.
5. En el `<script>` ajusta `CFG.logoUrl` (URL del logo subido a Medios) y `CFG.whatsapp`.

Notas técnicas:

- Sin jQuery ni librerías externas; solo Google Fonts.
- CSS aislado por prefijo (`#lg1`…`#lg5`) para no chocar con el tema. El modal (`#lgN-modal`) y el botón flotante de WhatsApp se mueven a `<body>` al cargar, para que `position:fixed` funcione aunque la sección de Elementor tenga efectos de movimiento (transform). Probado simulando el pegado dentro de una sección con `transform`.
- Los colores de marca están en variables CSS al inicio de cada `<style>` (`--navy`, `--blue`, `--green`) y se cambian en un solo lugar.
- Las ilustraciones de producto y del hero son SVG de relleno. Para poner fotos reales, cambia `ART[...]` o agrega `img` en el arreglo `PRODUCTS`.
- Precios: `price: null` muestra "Precio por cotización"; con un número muestra `$1,234.00 MXN + IVA`.
- Verificado en Chromium (escritorio 1366 px y móvil 390 px) sin errores de JavaScript ni scroll horizontal.

## Pendientes que dependen del cliente

- **Logo oficial**: el entorno no pudo descargar `logatech.mx` (bloqueado por la red), así que cada propuesta trae un logotipo SVG de respaldo y un campo `CFG.logoUrl` para el archivo real.
- Colores y tipografía se aproximaron a la marca (azul marino, azul, verde); se ajustan en las variables si el manual de marca indica otros valores.
- Fotos de producto, catálogos PDF y logos de marcas: sustituir los SVG cuando llegue el Drive del cliente.
