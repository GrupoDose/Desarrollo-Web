# Prompt de auditoría — Web LOGATECH (logatech.doseskill.com)

Eres un auditor de QA web. Entra a https://logatech.doseskill.com/ y a sus páginas internas (/catalogo/, /producto/?sku=IISC-425, /marcas/, /nosotros/, /envios-y-credito/, /servicio-tecnico/, /contacto/) en escritorio (1366 px) y en móvil (390 px). Verifica, uno por uno, si los cambios de la lista de abajo ya están aplicados en el sitio en vivo. No modifiques nada: solo evalúa y reporta.

Contexto: Loga Soluciones Científicas para Laboratorio (LOGATECH), distribuidor B2B de insumos de laboratorio en Monterrey. Los cambios los pidió el cliente en el documento "Correcciones HOME" y se resumen en el checklist siguiente. El azul marino es el color primario; el verde sustituye al naranja como acento.

## Cómo reportar
Para cada punto devuelve una tabla con: `#`, `Cambio`, `Estado` (Hecho / Parcial / No hecho / No aplica), `Evidencia` (qué viste exactamente y en qué página) y `Captura` (nombre del archivo). Toma una captura por bloque en escritorio y móvil. Al final da un resumen: porcentaje de puntos hechos, lista de lo que falta y cualquier error adicional que detectes (textos rotos, imágenes que no cargan, errores de consola, desbordes horizontales en móvil, enlaces a "#").

## Cambios a evaluar

### 0. Color global
0.1 No queda ningún tono naranja en todo el sitio: resaltados de texto (p. ej. "hospitales", "trabajamos"), botones ("Ver más pedidos", "Cotizar por WhatsApp", "Buscar", "Agregar a cotización"), badges ("MÁS VENDIDO", "TEMPORADA"), iconos, círculos decorativos, números de "Nosotros", pasos de Servicio técnico, estados hover y bordes activos. Usa el inspector o una captura para confirmar que el acento es verde (#5FA33A / #3F8A31) y que el azul marino se mantiene como primario.

### 1. Barra superior
1.1 No existe la pleca superior con "Pedido mínimo $5,000 MXN · Entrega local sin costo… · Lun-Vie 8:30–17:30" en ninguna página (revisar home y /marcas/ al menos).

### 2. Logo
2.1 El logo es visiblemente más grande que antes (isotipo ≈ 66 px de alto en escritorio).
2.2 El texto dice "LOGA" (no "LOGATECH") con el tagline "Soluciones Científicas para Laboratorio" debajo.

### 3. Home — banner central
3.1 El slider "Abasto continuo para hospitales públicos y privados" ocupa el ancho completo de la pantalla (sin márgenes laterales ni esquinas redondeadas).
3.2 La palabra resaltada del título es verde.

### 4. Home — categorías
4.1 El menú principal tiene un ítem "Productos" que despliega un panel con las 10 categorías y sus subcategorías en columnas (estilo mega menú de MCD LAB). Se abre al pasar el cursor; en móvil las categorías aparecen en el menú hamburguesa.
4.2 La sección "Explora por categoría" muestra 4 tarjetas con imagen grande y el nombre de la categoría sobre la imagen (Pruebas rápidas, Antidoping, Reactivos, Equipos). Indica si las imágenes son fotos propias del cliente o fotos de banco (placeholder).

### 5. Home — tarjetas de garantías (fila bajo el banner)
5.1 Hay seis tarjetas: "Envíos a toda la República Mexicana" (con "consulta con tu asesor cómo llevarte el flete gratis" y "entrega local sin costo"), "Cadena seca y fría", "Facilidades de crédito" (según solicitud y documentación; plazos de hasta 30 días de crédito o más), "Importaciones especiales" (4 a 6 semanas; con clientes recurrentes y compras continuas mantenemos stock), "Registro COFEPRIS" y "Servicio técnico propio".
5.2 No existe la tarjeta "Pedido mínimo $5,000 MXN". El texto dice "Cadena seca y fría" (no "Cadena de frío").

### 6. "Pedido mínimo" eliminado en todo el sitio
6.1 Busca el texto "pedido mínimo" y "$5,000" en: home, catálogo, fichas de producto, panel "Mi cotización", Nosotros, Envíos y crédito, Contacto. No debe aparecer en ninguna parte.
6.2 En su lugar aparece "Envíos a toda la República Mexicana. Entrega local sin costo. Consulta con tu asesor cómo llevarte el flete gratis." (home, fichas, cotizador, contacto, envíos).

### 7. Catálogo
7.1 El subtítulo del catálogo, la ayuda del filtro y la caja de cotización de cada ficha incluyen "Consulta nuestras políticas de envío gratis".
7.2 La categoría Pruebas rápidas muestra 115 productos con 12 subcategorías (Respiratorias, Entéricas, Intestinales, Transmisión sexual, Vectoriales, Hepáticas, Fertilidad, Marcadores tumorales, Salud general, Alergias, Hemoclasificadores, Drogas de abuso), con foto real y presentación "Caja con N pruebas".
7.3 La ficha /producto/?sku=IISC-425 corresponde a la prueba CERTUM Sífilis/VIH combo en cassette (no al BioFire). El BioFire aparece con clave "Por confirmar" y almacenamiento 15–25 °C sin etiqueta de cadena de frío.
7.4 Los filtros por categoría, subcategoría y marca cambian la URL con los parámetros `categoria`, `sub`, `marca` y `pagina` (no `cat` ni `p`) y los resultados se actualizan sin recargar errores.

### 8. Página de marcas (/marcas/)
8.1 La barra de búsqueda y el filtro alfabético (Todas / A / B / … / Y) quedan fijos debajo del encabezado al hacer scroll.
8.2 Las tarjetas muestran los logotipos reales de las marcas (41 logotipos); las marcas sin logotipo muestran su inicial.
8.3 Existe la tarjeta "BOULE" en la letra B (no "Voule") y "Lifeloc" (no "Life Lock").
8.4 El carrusel de marcas de la home usa los mismos logotipos.

### 9. Nosotros
9.1 No existen las tarjetas "$5,000 de pedido mínimo" ni "0 equipos usados o reconstruidos". Las cifras visibles son "10+ años", "40+ marcas", "L–V 8:30 a 17:30 h" y "MX envíos a toda la República Mexicana".
9.2 Los textos de entregas, precios y marcas dicen: envíos a toda la República con flete gratis a consultar, facilidades de crédito según solicitud y documentación, importaciones de 4 a 6 semanas con stock para recurrentes.

### 10. Envíos y crédito
10.1 Título "Envíos a toda la República Mexicana con entrega local sin costo"; lista con "Políticas de envío gratis", "Entrega local: sin costo", "Envío foráneo: a toda la República Mexicana", urgencias sujetas a confirmación, importaciones especiales y horario.
10.2 Sección "Cadena seca y fría". Crédito: "Facilidades de crédito según solicitud y documentación", "Plazos: hasta 30 días de crédito o más". No se mencionan "3 compras de contado", "15 o 30 días según autorización", "CFDI", "formas de pago" ni "facilidades de pago".

### 11. Cotizador y formularios (funcional)
11.1 Agregar un producto desde una tarjeta incrementa el contador y abre el panel "Mi cotización"; los botones "Enviar por WhatsApp" y "Enviar por correo" contienen nombre, marca, clave, presentación, cantidad con su unidad (caja/cajas, kit/kits, unidad/unidades) y notas. Con el panel vacío los botones no abren nada y avisan "Agrega productos antes de enviar".
11.2 Cantidades inválidas (0, negativos, decimales, texto) se corrigen a un entero entre 1 y 9999.
11.3 Los formularios de Contacto y Servicio técnico muestran, tras enviar, "Se abrió WhatsApp (o tu programa de correo) con la solicitud. Revísala y envíala para completarla." Sin confirmaciones de "recibido". No envíes mensajes reales: cancela el envío en WhatsApp o en el correo.

### 12. Calidad general
12.1 Sin errores de JavaScript en consola, sin desbordamiento horizontal en móvil, sin imágenes rotas, tipografías Montserrat/Open Sans cargadas, enlaces del menú y del pie funcionando.
12.2 Enlace "Aviso de privacidad" del pie: indica si sigue apuntando a "#".

## Entregable
Tabla completa con los 30 puntos, capturas nombradas `NN-bloque-escritorio.png` / `NN-bloque-movil.png`, resumen de pendientes y, si algo no está aplicado, la página y el bloque exactos donde falta.
