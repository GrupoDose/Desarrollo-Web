# Cambios v2 · Logatech (copia corregida)

Trabajo hecho sobre una copia. **Originales intactos:** `src/` y `sitio/`. **Copia corregida:** `src-v2/` (fuente) y `sitio-v2/` (8 páginas listas para pegar en Elementor). Se construye con `python3 build.py src-v2 sitio-v2`. Diseño, colores, tipografías y estructura no cambiaron. No se publicó nada ni se envió ningún mensaje.

Documentos complementarios: `FUENTES-Y-PENDIENTES.md` (fuentes, claves por confirmar, datos e imágenes pendientes).

## 1. Fichas técnicas (33 productos)

- Se reescribió el bloque de productos de `src-v2/data.js` dejando **solo** nombre, marca y clave del listado comercial (Parte A) y los datos deducibles del propio nombre (p. ej. "THC 50 ng/mL", "100 × 15 mm", "36–38% ACS, 3.5 L"). Se retiraron todas las especificaciones, viñetas y presentaciones que no se pudieron verificar con el fabricante (tiempos de lectura, almacenamientos, contenidos por caja, dimensiones, registros, etc.).
- **BioFire® FilmArray® RP2:** almacenamiento corregido a **15–25 °C, no refrigerar** según el etiquetado del fabricante; se retiró la etiqueta "Cadena de frío" y la nota de envío refrigerado; clave "IISC-425" marcada por confirmar; se pide confirmar si el modelo vendido es RP2, RP2.1 o RP2.1plus.
- **Tubos BD:** la clave 368175 aparecía en el tubo amarillo de 5 ml y en el rojo de 6 ml. El amarillo conserva 368175 y el lila 368171, ambas marcadas "por confirmar" porque no se localizan en bd.com (equivalentes en EUA: 367986 y 367861). El rojo queda con clave "Por confirmar" sin número; no se asignó la 367815 de bd.com por suposición.
- Presentación: todas las fichas muestran "Consultar presentación con un asesor" hasta tener datos del fabricante. Donde no hay especificaciones verificadas se muestra "Consultar especificaciones con un asesor".
- Cada ficha muestra en la pestaña "Especificaciones" la lista de datos pendientes de confirmar, y las claves por confirmar llevan una etiqueta visible en tarjeta, ficha, vista rápida y mensajes de cotización.
- Se retiró de las fichas: "Registro COFEPRIS" y "Garantía de fábrica" como etiquetas automáticas en todos los productos (solo se afirma a nivel política: "los productos que lo requieren cuentan con registro"), la línea "CFDI" y las promesas de entrega.
- Unidades por producto: `unit` = kit (tinciones, BioFire), envase (reactivos líquidos), unidad (resto). Cajas o paquetes se asignarán cuando el fabricante confirme la presentación.

## 2. Imágenes

- Se retiraron las 33 fotos genéricas de Pexels de producto. Ningún producto usa la foto de otro.
- Marcador neutro "Imagen del producto pendiente" con proporción uniforme (4:3 en tarjetas y ficha, 1:1 en cotizador y vista rápida) y texto alternativo descriptivo con el nombre del producto.
- Las fotos ambientales (hero, categorías, páginas internas) se conservan.
- Para cargar imágenes reales: campo `img` (y `images` para galería) en `src-v2/data.js`.

## 3. Cotizador

- Un solo generador de mensaje (`quoteText`) alimenta WhatsApp y correo; `syncLinks()` se ejecuta al agregar, quitar, vaciar, pulsar +/−, escribir una cantidad a mano y editar notas. El contador del encabezado, el total del panel y `localStorage` (`loga_quote`) se actualizan en el mismo paso.
- Mensaje (WhatsApp y correo idénticos): nombre, marca, clave (con "por confirmar" cuando aplica), presentación, cantidad con su unidad y notas. Asunto del correo: "Solicitud de cotización · N producto(s)".
- Cantidades: entero de 1 a 9999. 0, negativos, decimales, vacío o texto se corrigen (0/−4/vacío → 1; 2.9 → 2; 99999 → 9999). El botón − no baja de 1. Al salir del campo se normaliza el valor visible.
- Unidades: "unidad/unidades", "kit/kits", "envase/envases", "caja/cajas", "paquete/paquetes", "pieza/piezas" según el producto; ya no se llama "piezas" a todo.
- Cotización vacía: los botones de WhatsApp y correo quedan desactivados (`href="#"`), al pulsarlos no se navega y aparece el aviso "Agrega productos antes de enviar".
- Al pulsar enviar: aviso "Se abre WhatsApp / tu correo con tu solicitud; revísala y envíala". Ya no hay confirmaciones de "recibido".
- Ficha de producto y vista rápida: los enlaces "Cotizar ahora por WhatsApp" y "Solicitar por correo" se regeneran con cada cambio de cantidad e incluyen los mismos campos.
- Formularios de contacto y servicio técnico: el mensaje de éxito dice "Se abrió WhatsApp (o tu programa de correo) con la solicitud. Revísala y envíala para completarla. Atención de lunes a viernes de 8:30 a 17:30 h."; la nota al pie explica que la solicitud se completa al enviar. Corregido un error por el que la opción "Correo" nunca se tomaba en cuenta (siempre abría WhatsApp) y por el que la opción elegida se añadía dos veces al mensaje.
- Corrección visual del panel de cotización: heredaba la tipografía y colores del tema en vez de los de la marca (faltaban las variables CSS en `#lg1-quote`).

## 6. Política de pedido y envío (única, en todo el sitio)

Texto único: **"Pedido mínimo de $5,000 MXN. Entrega local sin costo y envío foráneo gratis a partir de este monto. Consulta cobertura y condiciones con tu asesor."** Aparece en: barra superior del encabezado, hero y bloque de confianza de inicio, caja de cotización de cada ficha, pestaña "Envío, garantía y pagos", panel de cotización, página Envíos y crédito (lista y FAQ), formulario de contacto y Nosotros.

Retirado: "por debajo se cotiza el flete" y toda aceptación de pedidos menores; "precio especial" por recurrencia; "facturación inmediata / CFDI 4.0 de inmediato"; "formas de pago: transferencia y depósito"; "facilidades de pago"; "plazos… en casos especiales, más"; "32 estados con entrega".

Crédito (texto único): sujeto a aprobación después de 3 compras de contado, solicitud y documentación; plazos de 15 o 30 días según autorización.

## 7. Promesas comerciales

Sustituidas en inicio, catálogo, fichas, contacto, servicio técnico, envíos y Nosotros por:
- "Entregas urgentes sujetas a disponibilidad, ubicación y confirmación del asesor."
- "Consulta disponibilidad y fecha estimada de entrega al cotizar."
- "Atención de lunes a viernes de 8:30 a 17:30 h."

Retirado: "entrega el mismo día", "recolectamos el mismo día", "incluso fuera de horario", "sin faltantes", "disponibilidad constante", "cotización/respuesta en minutos", "resultados en 5 min / en minutos", "cadena de frío garantizada". Las urgencias se presentan como capacidad sujeta a evaluación (nueva pregunta en la FAQ). No se añadió ningún compromiso nuevo.

## Archivos tocados en `src-v2/`

`data.js` (productos y textos de categoría), `core.js` (cotizador, ficha, vista rápida, formularios, marcador de imagen), `base.css` (variables para `#lg1-quote`), `extra.css` (estilos del marcador, etiqueta "Clave por confirmar", notas), `header.html` (barra de política), `overlays.html` (textos del panel), `pages/inicio.html`, `pages/catalogo.html`, `pages/producto.html`, `pages/contacto.html`, `pages/servicio-tecnico.html`, `pages/envios-y-credito.html`, `pages/nosotros.html`. `build.py` ahora acepta carpeta de origen y destino.

## Pruebas realizadas (Chromium / Playwright, sin enviar mensajes reales)

Entorno: Chromium headless; peticiones a wa.me y whatsapp.com bloqueadas; `window.open` simulado; `mailto:` no se dispara (solo se lee el `href`). Fotos de Pexels sustituidas por marcadores locales. Resultado: **51 comprobaciones, 51 correctas, 0 fallidas.**

| Área | Comprobación | Resultado |
|---|---|---|
| 16 vistas (8 páginas + catálogo con filtros/búsqueda, 5 fichas, ficha inexistente) | Sin errores de consola, sin desbordamiento horizontal en móvil (390 px), sin fotos Pexels en productos, sin textos retirados (búsqueda de "en minutos", "mismo día", "sin faltantes", "CFDI", "flete", etc.) | 16/16 |
| Cotizador vacío | Enlaces desactivados, contador 0, clic no navega y avisa | OK |
| Agregar desde tarjeta | Contador, panel, WhatsApp y correo con nombre, marca, clave, presentación, cantidad, notas; asunto del correo | OK |
| Mismo producto | Suma cantidad y cambia a plural | OK |
| Botones + / − | Enlaces y totales actualizados; − no baja de 1 | OK |
| Cantidad manual | 5, 0, −4, 2.9, 99999, vacío; normalización al salir del campo | OK |
| Notas | Aparecen y desaparecen en ambos enlaces | OK |
| Unidades | kits, envase, unidad en el mismo mensaje; "por confirmar" en clave BD; sin "piezas" genérico | OK |
| Persistencia | Recarga conserva 4 productos y cantidades | OK |
| Quitar / vaciar | Enlaces y `localStorage` actualizados; vacío vuelve a bloquear | OK |
| Ficha BioFire | 15–25 °C, sin "Cadena de frío", clave por confirmar, +/− y manual, política sin promesas | OK |
| Vista rápida tubo rojo | Clave "Por confirmar", marcador de imagen | OK |
| Catálogo | Filtro de marca en URL, búsqueda "agar" (2 resultados), navegación a ficha | OK |
| Formularios | Incompleto: no abre nada (validación nativa y propia); WhatsApp: abre wa.me con los datos sin campos duplicados y mensaje honesto; Correo: mensaje de correo honesto | OK |
| Móvil | Panel de cotización abre y cabe en pantalla | OK |
| Seguridad | 0 peticiones a WhatsApp durante toda la prueba | OK |

Revisión visual de capturas en escritorio y móvil de las 8 páginas, ficha BioFire, tarjetas de inicio, panel de cotización y página de envíos.
