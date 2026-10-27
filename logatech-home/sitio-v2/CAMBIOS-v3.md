# Cambios v3 · Correcciones del cliente (doc "Correcciones HOME", carpeta Drive de Logatech)

Fuente: documento "Correcciones HOME" de Felipe Pérez (Logatech), carpeta "Fotos Marcas" (41 logotipos), carpeta "Pruebas Rapidas" (85 fotos por clave) y "Pruebas rapidas.xlsx" (114 productos con presentación), todo en la carpeta de Drive compartida el 27 de octubre de 2026. Se trabajó sobre `src-v2/` → `sitio-v2/` (y `sitio-wp/` para WordPress). Diseño base, tipografías y estructura se conservan.

## Inicio
- **Banner central a todo lo ancho**: el slider ya no va dentro del contenedor con esquinas redondeadas; ocupa el ancho completo de la pantalla y el texto se alinea con el contenido.
- **Logotipo más grande y con "LOGA"**: isotipo a 66 px y palabra "LOGA" a 38 px con la leyenda "Soluciones Científicas para Laboratorio" debajo. En móvil se reduce para no desbordar.
- **Pleca superior eliminada** (teléfono, correo, dirección y promo). Esos datos siguen en Contacto y en el pie de página.
- **Zona de categorías rediseñada al estilo MCD LAB**: la barra de categorías se sustituye por un menú "Productos" en la navegación principal que despliega un panel con las 10 categorías y sus subcategorías en columnas (se abre al pasar el cursor; en pantallas táctiles con un toque; cierra con Escape o al hacer clic fuera). En móvil las categorías siguen en el menú hamburguesa.
- **Naranja → verde en todo el sitio**: variables de marca, botones "Cotizar", resaltados del hero y de los encabezados internos, círculos decorativos, iconos de las políticas, números de "Nosotros", pasos del servicio técnico y la etiqueta "Clave por confirmar" (ahora gris azulado). Verificado automáticamente: 0 elementos con tonos naranja en las 15 vistas probadas.
- **Bloque de confianza**: "Envíos a toda la República Mexicana · Tarifa para envío gratis y entrega local sin costo" y "Cadena seca y fría".
- **Compra con tranquilidad**: "Facilidades de crédito según solicitud y documentación; plazos de hasta 30 días de crédito o más." e "Importaciones especiales de productos en 4 a 6 semanas. Con clientes recurrentes y compras continuas mantenemos stock."
- **Pedido mínimo retirado** en todo el sitio (hero, bloque de confianza, pie de la foto de logística, banda final, panel de cotización, fichas, contacto, Nosotros y Envíos). Texto nuevo en su lugar: "Envíos a toda la República Mexicana. Entrega local sin costo. Consulta con tu asesor cómo llevarte el flete gratis."
- La sección "Explora por categoría" conserva sus 4 tarjetas con imagen (pruebas rápidas, antidoping, reactivos, equipos); si el cliente envía 4 fotos propias se sustituyen en `PHOTOS` de `src-v2/base.js`.

## Catálogo
- **Filtro de marcas sin scroll interno**: la lista se muestra completa (antes tenía una caja de 260 px con barra de desplazamiento).
- **Categoría Pruebas rápidas cargada desde el Excel del cliente**: 110 productos nuevos y 4 existentes actualizados (presentación "Caja con N pruebas", unidad "caja" en el cotizador, subcategoría y foto). 12 subcategorías nuevas: Respiratorias, Entéricas, Intestinales, Transmisión sexual, Vectoriales, Hepáticas, Fertilidad, Marcadores tumorales, Salud general, Alergias, Hemoclasificadores y Drogas de abuso. Total del catálogo: 143 productos.
- **Fotos reales de producto** (85 archivos del cliente, optimizadas a máximo 900 px en `sitio-v2/img/productos/`, nombradas por clave). Los 24 productos de Alergias comparten la imagen genérica que envió el cliente y 8 controles CerTest comparten otra imagen genérica; ambos casos quedan marcados como pendientes en su ficha.
- **Corrección de clave**: la clave IISC-425 que el cuestionario atribuía al BioFire RP2 corresponde, según el Excel del cliente, a la "Prueba para detección de anticuerpos de Sífilis (IgG e IgM) y VIH combo en cassette" de CERTUM. Ese producto ahora existe con su foto y el BioFire queda con clave "Por confirmar" (identificador interno `BIOFIRE-RP2`).
- Paginación del catálogo ajustada para que no desborde en móvil con 12 páginas.

## Marcas
- "Voule" corregido a **BOULE**; "Life Lock" corregido a **Lifeloc** (según el logotipo que envió el cliente).
- **Página de marcas llena con los 41 logotipos** del cliente (optimizados en `sitio-v2/logos/`, PNG ≤ 360×180 con transparencia; i-SENS en SVG). Las dos marcas sin logotipo (Dräger y BOULE) muestran su inicial. Si un logotipo no carga, se muestra la inicial automáticamente.
- El carrusel de marcas de inicio usa los mismos logotipos (en gris, a color al pasar el cursor).
- Marcas nuevas que aparecen en el Excel: Seratec, Provisión, Coris (sin logotipo por ahora); QuickVue/Quidel se agrupan bajo QuidelOrtho.

## Envíos y crédito
- Título: "Envíos a toda la República Mexicana con entrega local sin costo".
- Lista de envíos: "Políticas de envío gratis: consulta con tu asesor cómo llevarte el flete gratis", "Entrega local: sin costo", "Envío foráneo: a toda la República Mexicana", urgencias, importaciones especiales (con la frase de stock) y horario.
- Sección "Cadena seca y fría".
- Crédito: "Facilidades de crédito según solicitud y documentación", trámite, "Plazos: hasta 30 días de crédito o más". Se retiró el requisito de 3 compras de contado y la línea de compras de contado mientras se aprueba.
- Preguntas frecuentes actualizadas con los mismos textos.

## Nosotros
- Se retiraron las tarjetas "$5,000 de pedido mínimo" y "0 equipos usados". En su lugar: "L–V · atención de 8:30 a 17:30 h" y "MX · envíos a toda la República Mexicana".
- Textos de entregas, precios y marcas alineados con las nuevas políticas.

## Técnico
- `CFG.logoBase`, `CFG.imgBase` (archivos locales) y `CFG.logos` / `CFG.images` (URLs de Medios en WordPress). `photo()` acepta ahora archivos propios además de fotos de Pexels.
- `deploy_wp.py` sube logotipos y fotos a Medios de WordPress, reconstruye `sitio-wp/` con esas URLs y publica las 8 páginas. Sigue pendiente de ejecutarse porque el dominio logatech.doseskill.com está bloqueado por la política de red de este entorno.
- Pruebas (Chromium, escritorio 1366 px y móvil 390 px, sin enviar mensajes): 36 comprobaciones, 36 correctas. Cubren las 15 vistas (sin errores de consola, sin desbordes, sin tonos naranja, sin textos retirados, sin imágenes rotas), encabezado sin pleca y con mega menú, hero a todo lo ancho, filtro de marcas, 115 productos en pruebas rápidas con fotos, filtro por subcategoría, cotizador con "caja/cajas" y presentación, ficha IISC-425 y BioFire, página de marcas con BOULE, formulario y menú móvil.

## Ajustes finales según el prompt "Cambios — Web LOGATECH (27-oct)"

- **Token de color**: `--loga-green` (#5FA33A) y `--loga-green-d` (#3F8A31) definidos una sola vez en `src-v2/base.css`; todos los antiguos alias del naranja apuntan a ellos. El botón "Buscar" del encabezado también pasa a verde.
- **Fila de garantías bajo el hero (6 tarjetas, 3 por fila)**: Envíos a toda la República Mexicana ("Consulta con tu asesor cómo llevarte el flete gratis. Entrega local sin costo."), Cadena seca y fría, Facilidades de crédito (hasta 30 días o más), Importaciones especiales (4 a 6 semanas; stock para recurrentes), Registro COFEPRIS y Servicio técnico propio. La tarjeta de pedido mínimo se eliminó.
- **"Explora por categoría" rediseñada estilo MCD LAB**: 4 tarjetas con imagen grande, título sobre degradado, descripción, subcategorías y enlace. Los placeholders para las 4 imágenes del cliente están listos: carpeta `sitio-v2/img/categorias/` (ver LEEME.txt) y mapa `CAT_IMAGES` en `src-v2/data.js`; mientras llegan, se muestran fotos de banco. Además, el menú "Productos" despliega las categorías con sus subcategorías como en el menú de MCD LAB (es lo que marcaba la captura del documento del cliente).
- **Catálogo**: la frase "Consulta nuestras políticas de envío gratis" aparece en el subtítulo del catálogo, en la ayuda del filtro y en la caja de cotización de cada ficha.
- **Página de marcas**: la barra de búsqueda y el filtro alfabético (Todas / A / B / … / Y) quedan fijos (sticky) debajo del encabezado al hacer scroll; también se dejó el filtro de marcas del catálogo sin scroll interno. La ficha de **BOULE** está dada de alta en la letra B (sin logotipo hasta que el cliente lo envíe).
- **Capturas antes/después** de cada bloque en `capturas-v3/` (encabezado y hero, garantías, categorías, compra con tranquilidad, banda final, menú de productos, catálogo, marcas con filtro fijo, cifras de Nosotros, políticas de envíos y móvil). "Antes" = versión publicada (commit 3a0246d); "después" = esta versión.

### Checklist de aceptación
- [x] Cero naranjas en todo el sitio (verde como acento; verificado automáticamente en 15 vistas).
- [x] Pleca superior eliminada en todas las páginas.
- [x] Logo más grande y dice "LOGA" con el tagline debajo.
- [x] Hero central a ancho completo.
- [x] Zona de categorías rediseñada estilo MCD LAB; placeholders de las 4 imágenes listos (faltan las fotos del cliente).
- [x] "Cadena seca y fría", envíos nacionales, crédito e importaciones visibles en la fila de garantías.
- [x] Ninguna mención de "pedido mínimo $5,000" (home, catálogo, nosotros, envíos, contacto, fichas ni cotizador).
- [x] Mensajes de flete gratis / políticas de envío colocados (home, catálogo, fichas, envíos).
- [x] Filtro de marcas sticky; ficha BOULE cargada (pendiente su logotipo y contenido).
- [ ] Publicación en logatech.doseskill.com: pendiente de que se permita el dominio en la red de este entorno (`deploy_wp.py` ya está listo).
