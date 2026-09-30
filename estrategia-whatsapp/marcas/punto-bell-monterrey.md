# Punto Bell Monterrey (San Pedro): estrategia de 10 mensajes para conseguir la cita por WhatsApp

> Marca: **Punto Bell – Medicina Estética** · Dr. Julio César Flores Rodríguez (Céd. Prof. 12049962)
> Sucursal: Av. Vasconcelos 342, San Pedro Garza García, N.L. · WhatsApp de citas: 81 2429 1155 · Aviso COFEPRIS 2619032002A00278
> Fecha: 30-09-2026 · Basado en el [Manual de respuesta](../MANUAL_RESPUESTA_WHATSAPP.md) de la agencia.

---

## 1. Lo que sabemos de la marca (fuentes internas de Grupo Dose)

| Fuente (Drive) | Qué aporta |
|---|---|
| *Guiones campañas Punto Bell Monterrey* (28-09-2026) | Precios y ofertas de la campaña de Monterrey y ángulos de los anuncios |
| *Entregable_Punto_Bell_Septiembre* | Copies de septiembre para San Pedro: Tox Refresh, Sculptra Week, Dysport Day, glúteos, Skinbooster, PDRN |
| *CRM de Punto Bell* (brief del bot, CDMX) | Ruta del paciente, perfil ideal, objeciones reales, reglas de lo que no se dice, cadencia actual, plantillas de confirmación |
| *Notas de Gemini 07-03-2026* | Datos de conversión de CDMX, quién atiende y qué falla en el seguimiento |
| Doc *Punto Bell* (guiones ganadores) | Anuncios ganadores ("más joven sin que se note", "natural") y resultado CRM: 800 mensajes → 30 citas |
| *Notas de Gemini 08-09-2026* | Protocolos de PDRN y NCTF y apertura de TikTok |

### Datos duros del histórico (CDMX; son el punto de partida para Monterrey)
- **Solo el 27 %** de los contactos contesta después del primer mensaje.
- **Tasa de agendamiento del 6 %** (6 citas de unos 120 contactos reales en una semana con $5,596 de pauta). La meta acordada es **10 %**.
- **Tiempo de respuesta de 1 h 15 min a 3 h.** Los contactos escriben a 4 o 5 clínicas a la vez y gana la que contesta primero.
- **Seguimiento inconsistente:** Juanma insiste 2 o 3 veces, pero otros asesores dejan el chat muerto.
- **Las llamadas cierran mucho mejor.** Una llamada de unos 20 minutos genera confianza y asistencia. Con el CRM: 800 mensajes → 30 citas (**25 de Juanma y solo 5 del bot**).
- **El bot anterior de "ponle 1, ponle 2" espantaba** a los contactos por impersonal.
- **Los mensajes de noche y madrugada son un pico de demanda**, porque el público ocupado busca información en esas horas.
- **Pedir anticipo genera desconfianza** y afecta que la paciente llegue a la cita.
- **Las leads que editan el mensaje del anuncio** y hacen preguntas concretas ("¿se inflama?", "me lo puse hace dos años…") son las más calientes.

### Oferta vigente en Monterrey (guiones del 28-09-2026) ⚠️ *validar precios de octubre con la clínica*
| Tratamiento | Precio |
|---|---|
| **Dysport** (toxina botulínica) | $90 por unidad → **30 U = $2,700** (el Dysport Day fue 30 U por $2,500) |
| **Sculptra facial** | **$9,000 por vial** (regular $11,000) |
| **Tox Refresh** (1 PDRN + Dysport hasta 30 U) | **$4,999** (por separado serían $2,500 + $2,700) |
| Sculptra + Skinboosters | $11,000 |
| PDRN de salmón (Evolution) | $2,500 por sesión |
| Sculptra glúteos | $33,000 (3+1) |

### Perfil y posicionamiento
- **Paciente ideal:** mujer de 20 a 60 años con ingreso mayor a $15,000 al mes. Le interesan el bienestar, la moda, los viajes y el gym. Le preocupa el envejecimiento y **tiene dudas del tratamiento, no del precio**.
- **Código simbólico** (Klarić): *"verte descansada y más joven sin que nadie note que te hiciste algo"*. Seguridad: producto original de **Galderma**, lo aplica un médico y se hace valoración antes.
- **Miedos reales:** la cara congelada o que no se vea como ella, el dolor o las agujas, esperar un resultado inmediato (Sculptra no es relleno), si el producto es original y si el médico está certificado.
- **Reglas de la clínica:** tono amigable, seguro, optimista y formal. **Nunca** ofrecer descuentos no autorizados, **nunca** garantizar resultados, **no** hablar de la competencia. Lo técnico se remite al doctor en la valoración. Se incluye siempre "requiere valoración médica".

---

## 2. Lógica de la secuencia

```
Contacto escribe (anuncio)
   └─ M1 Apertura (< 5 min, también de noche)
        ├─ responde → M2 Descubrimiento → M3 Propuesta de valor → M4 Cierre con horarios → CITA ✅
        └─ deja de responder en cualquier punto → S1…S7 (seguimientos) → al responder, se retoma en el paso donde se quedó
```

- **Objetivo único:** una **cita de valoración con aplicación**, no vender por chat.
- **Un solo tratamiento por conversación:** el del anuncio que trajo al contacto. Los mensajes traen variantes para **Dysport**, **Sculptra** y **Tox Refresh**.
- **El precio del anuncio se confirma de entrada**, porque ya es público y esconderlo genera desconfianza. La venta se hace por **seguridad y naturalidad**, no por precio.
- **Toda pregunta termina en algo fácil de contestar**: A/B, sí/no o un número.
- **Ofrecer llamada** en el momento de duda. El dato interno dice que es lo que más cierra.
- **Cadencia de seguimiento:** respeta la que ya usa la clínica (2 h, 1 día, 2 días, 5 días) y la extiende con el sistema Levantamuertos del manual.
- **API de WhatsApp:** de S3 en adelante (más de 24 h sin respuesta) los mensajes deben ir como **plantillas aprobadas por Meta** en el CRM.

---

## 3. Los 10 mensajes

> Variables: `{nombre}`, `{asesora}` (nombre de quien atiende), `{día/hora}`.
> ✅ Tono: "tú" cordial y profesional, como en los anuncios que ganan. Si la clínica prefiere "usted", se cambia solo la conjugación.

### Mensaje 1 · APERTURA (menos de 5 min desde el primer mensaje, a cualquier hora)
**Objetivo:** conectar, confirmar la oferta y abrir el descubrimiento con una pregunta A/B.
**Técnica:** velocidad (Hormozi), código simbólico A/B (Klarić), ayuda antes que producto (Juan Luis).

**Dysport**
> ¡Hola, {nombre}! 😊 Soy {asesora}, de Punto Bell San Pedro, la clínica del Dr. Julio César Flores.
>
> Te confirmo la promoción: Dysport a $90 por unidad (30 unidades = $2,700), con valoración médica incluida.
>
> Para orientarte mejor: ¿buscas suavizar líneas que ya se te marcan o prevenir que aparezcan?

**Sculptra**
> ¡Hola, {nombre}! 😊 Soy {asesora}, de Punto Bell San Pedro, la clínica del Dr. Julio César Flores.
>
> Te confirmo: Sculptra facial está en $9,000 por vial (precio regular $11,000).
>
> Para orientarte mejor: ¿sientes que tu rostro perdió firmeza o buscas prevenir antes de que se note?

**Tox Refresh**
> ¡Hola, {nombre}! 😊 Soy {asesora}, de Punto Bell San Pedro, la clínica del Dr. Julio César Flores.
>
> Te confirmo: Tox Refresh (PDRN de salmón + Dysport hasta 30 unidades) está en $4,999, en una sola cita.
>
> Para orientarte mejor: ¿qué te molesta más hoy, las líneas de expresión o la piel opaca?

*Si escribe de noche:* se contesta igual. Si lo contesta el bot, al día siguiente a primera hora una persona retoma con el M2.

---

### Mensaje 2 · CONVERSACIÓN 1: Descubrimiento (cuando responde al M1)
**Objetivo:** confirmar su motivo con un amarre y detectar su miedo principal (si es su primera vez).
**Técnica:** amarre (Dey), pregunta abierta (Vilma y Juan Luis), el dolor (Klarić).

> Te entiendo perfecto, {nombre}. Lo que buscas es verte {descansada / más firme / con la piel luminosa} sin que se note que te hiciste algo, ¿verdad? ✨
>
> ¿Ya te habías aplicado {Dysport / Sculptra / PDRN} antes o sería tu primera vez?

- **Si es su primera vez:** en el M3 se atiende el miedo a verse "congelada", al dolor o al resultado.
- **Si ya se lo aplicó:** se pregunta "¿Qué te gustó y qué no de tu experiencia anterior?" y en el M3 se diferencia por producto original y médico.

---

### Mensaje 3 · CONVERSACIÓN 2: Propuesta de valor y seguridad
**Objetivo:** quitar el miedo y dar razones para elegir Punto Bell frente a la clínica de al lado.
**Técnica:** código de seguridad (Klarić), historia o prueba real (Klarić y Vilma), anticipar la objeción (Vilma).

**Dysport**
> Es la duda más común, y es justo lo que cuidamos. 🙌 El Dr. Julio César decide contigo en la valoración cuánto y dónde aplicar, para que sigas teniendo expresión, solo sin las líneas marcadas. Usamos Dysport original de Galderma y los cambios se notan en unos días (resultado completo a las 2 semanas).
>
> Te comparto cómo se ve un resultado natural 👇 *[video o antes/después autorizado]*
>
> ¿Así es como te gustaría verte?

**Sculptra**
> Algo importante: Sculptra no es un relleno. Lo que hace es estimular tu propio colágeno, por eso el resultado es natural y progresivo: se nota desde las primeras semanas y se consolida hacia el 2.º o 3.er mes. Es original de Galderma y la aplicación la define el Dr. Julio César en tu valoración, según tu rostro. 🙌
>
> Te comparto un caso real 👇 *[antes/después autorizado]*
>
> ¿Te gustaría un cambio así, que se vea como tú pero más firme?

**Tox Refresh**
> Lo bueno del Tox Refresh es que en una sola cita resuelves las dos cosas: el Dysport suaviza las líneas y el PDRN regenera la piel para que se vea más luminosa. Por separado serían $5,200; en el combo, $4,999. Todo lo aplica el Dr. Julio César, con producto original y después de tu valoración. 🙌
>
> ¿Te hace sentido para lo que buscas?

*(Si en el M2 dijo que teme al dolor, se añade: "Se sienten piquetitos rápidos, es más molestia que dolor, y la aplicación toma unos minutos.")*

---

### Mensaje 4 · CONVERSACIÓN 3: Cierre con horarios
**Objetivo:** conseguir la cita.
**Técnica:** doble alternativa (Dey) y envolvente (Dey). Silencio después de la pregunta.

> ¡Perfecto! Para tu valoración y aplicación con el Dr. Julio César tengo:
> 📅 {día 1} a las {hora}
> 📅 {día 2} a las {hora}
>
> ¿Cuál te acomoda más?

**No se envía nada más hasta que responda.**

**Cuando elige horario (envolvente y confirmación):**
> ¡Listo, {nombre}! ✅ Solo necesito tu nombre completo para dejar tu lugar a tu nombre.

> Queda agendada tu cita:
> ✅ {Tratamiento} · 📅 {día} a las {hora}
> 📍 Av. Vasconcelos 342, San Pedro Garza García · {link de Maps}
> 💳 Efectivo, transferencia o tarjeta.
> Será un gusto recibirte en Punto Bell. ☺️

*Sobre el anticipo:* el histórico muestra que pedirlo genera desconfianza. No se pide en el chat. Si la clínica lo exige, se presenta después de confirmar el horario y como "apartado de lugar", nunca antes.

---

## 4. Los 7 seguimientos (cuando deja de responder)

> Arrancan en el paso donde se quedó la conversación. **Si responde, se detiene la secuencia** y se retoma en el M2, M3 o M4 según corresponda.
> Nada de "¿?", "¿me leíste?" ni mensajes en cadena.

### S1 · +2 horas: Recordatorio con contexto
**Técnica:** contexto y pregunta fácil (Juan Luis).
> {nombre}, te dejo los horarios de arriba por si te acomoda alguno 👆 ¿Te aparto uno o prefieres otro día?

*(Si se quedó antes del M4:)* "{nombre}, ¿te quedó alguna duda sobre {tratamiento}? Con gusto te la resuelvo por aquí."

### S2 · +1 día: Nombrar el miedo silencioso y ofrecer llamada
**Técnica:** las objeciones como miedos disfrazados (Vilma) y el dato interno de que la llamada es lo que más cierra.
> Hola, {nombre}. ☀️ Muchas pacientes, antes de agendar, tienen dudas como si se verá natural, si duele o cuánto dura. Es totalmente normal.
>
> ¿Prefieres que te llame 5 minutos para resolverlas o te las contesto por aquí?

*(Si pide llamada, se avisa al asesor al momento para que marque ese mismo día.)*

### S3 · +2 días: Prueba social y el doctor
**Técnica:** historia real (Klarić) y tribu (Klarić). *Plantilla de Meta.*
> {nombre}, te comparto este video del Dr. Julio César donde explica cómo trabaja {Dysport / Sculptra / el Tox Refresh} para que el resultado se vea natural 🎥 *[video corto]*
>
> Varias pacientes de San Pedro lo eligieron por eso. ¿Te gustaría agendar tu valoración esta semana o la próxima?

### S4 · +5 días: Proceso de eliminación
**Técnica:** eliminación (Dey), en forma de encuesta de un toque.
> {nombre}, no quiero insistirte 🙂 Solo para ayudarte mejor: ¿qué te detuvo?
> 1️⃣ Tengo dudas del tratamiento
> 2️⃣ No es el momento
> 3️⃣ El presupuesto
> 4️⃣ Prefiero hablarlo con alguien
>
> Con un número me ayudas muchísimo.

**Según la respuesta:**
- **1** → se resuelve la duda y se ofrece llamada (vuelve al M3).
- **2** → "¿Te escribo a inicios de {mes}?" y se programa el recordatorio.
- **3** → rebote (Dey): Dysport se ajusta a las unidades que indique el doctor, o se ofrece la opción de menor inversión (PDRN $2,500). **Sin descuentos no autorizados.**
- **4** → "¡Claro! Te mando un resumen de 3 líneas para que lo compartas." (Compromiso de Dey.)

### S5 · +10 días: Mensaje de 9 palabras (Dean Jackson)
**Técnica:** reactivación con una sola pregunta sobre el resultado que buscaba. Sin emoji, sin link, sin precio.
- **Dysport:** "{nombre}, ¿sigues queriendo suavizar tus líneas sin perder tu expresión?"
- **Sculptra:** "{nombre}, ¿sigues queriendo recuperar la firmeza de tu rostro?"
- **Tox Refresh:** "{nombre}, ¿sigues queriendo una piel más luminosa y descansada?"

*Si responde "sí":* no se manda el precio. Se pregunta "¡Qué gusto! ¿Qué te gustaría resolver primero?" y se retoma en el M3.

### S6 · +21 días: Novedad real o fecha especial
**Técnica:** urgencia **real** (Klarić: "no inventes") y doble alternativa (Dey).
> {nombre}, te aviso porque te interesó {tratamiento}: este {mes} tenemos {promoción vigente real / Dysport Day el {fecha}} en Punto Bell San Pedro, con lugares limitados en agenda.
>
> ¿Te aparto un lugar para {día 1} o {día 2}?

*(Solo si existe una promoción o fecha especial confirmada por la clínica. Si no la hay, se usa la agenda real: "Me quedan 2 lugares el sábado".)*

### S7 · +35 a 45 días: Levantamuertos, cierre de expediente
**Técnica:** desapego y posición de fuerza (Julio iero). La respuesta es de una palabra.
> {nombre}, estoy depurando las solicitudes para no llenarte de mensajes. ¿Cierro la tuya o te la sigo guardando para cuando quieras tu valoración? 😊

- **"Guárdala"** → se pregunta "¿Para cuándo te la agendo?" y se va al M4.
- **"Ciérrala"** → "¡Gracias por avisarme! Aquí estaremos cuando lo necesites. ✨" Se etiqueta *no interesada* y no se vuelve a escribir. Pasados 90 días puede entrar a una difusión con una promoción nueva.

---

## 5. Respuestas rápidas a lo que más preguntan (sale del brief del CRM y de los guiones)

| Pregunta u objeción | Respuesta |
|---|---|
| "¿Me voy a ver congelada?" | "No es la idea. El doctor decide contigo cuánto y dónde aplicar para que conserves tu expresión. Se nota el resultado, no el tratamiento." |
| "¿Duele?" | "Se sienten piquetitos rápidos, más molestia que dolor, y toma unos minutos." |
| "¿Es original?" | "Sí. Trabajamos con producto original adquirido directamente con Galderma." |
| "¿Quién aplica?" | "El Dr. Julio César Flores, médico cirujano especialista en medicina estética (Céd. Prof. 12049962)." |
| "¿Cuánto dura / cuándo se nota?" | Dysport: cambios en días, completo a las 2 semanas. Sculptra: progresivo, se consolida al 2.º o 3.er mes y puede durar hasta unos 2 años. PDRN: se nota desde la primera semana y mejora en 2 o 3 sesiones. *Siempre se agrega: "depende de tu valoración y los resultados varían".* |
| "Está caro" / "Vi más barato" | Sin hablar de la competencia: "Te entiendo. Aquí el precio incluye producto original de Galderma y la aplicación del doctor con valoración. En tu rostro, eso es lo que marca la diferencia. ¿Te aparto tu valoración para que lo veas en persona?" |
| "Lo voy a pensar" | "¡Claro! Si lo quieres pensar es porque quieres decidir bien, ¿verdad? ¿Qué te gustaría tener más claro: el resultado, la aplicación o la inversión?" (Franklin + aislar) |
| Pregunta médica compleja | "Esa te la resuelve mejor el doctor en tu valoración, antes de aplicar nada. ¿Te aparto un espacio?" |
| "¿Dónde están?" | "En Av. Vasconcelos 342, San Pedro Garza García 📍 {Maps}. ¿Te queda mejor venir entre semana o en sábado?" |

---

## 6. Operación y medición
- **Etiquetas en el CRM:** `M1-enviado`, `M2`, `M3`, `M4-horarios`, `S1`…`S7`, `pidió-llamada`, `cita`, `no-interesada`, además de una por tratamiento (`dysport`, `sculptra`, `toxrefresh`).
- **Avisar a una persona** cuando la contacto pide llamada, cuando elige horario, cuando está molesta, cuando hace una pregunta médica o cuando escribe "humano", "persona" o "gerente".
- **Recordatorio de la cita:** 24 h antes (plantilla de la clínica) y el mismo día con la ubicación.

| Métrica | Base histórica (CDMX) | Meta en Monterrey |
|---|---|---|
| Tiempo de primera respuesta | 1 h 15 min – 3 h | **< 5 min** (también de noche) |
| % que responde al M1 | 27 % | **> 40 %** |
| % de agendamiento sobre contactos | 6 % | **≥ 10 %** |
| % de contactos que recibieron los 7 seguimientos | bajo (dependía del asesor) | **100 %** automatizado |
| % de citas que asisten | sin dato | medir desde el mes 1 |

*Las metas son propuesta de la agencia y hay que validarlas después de 30 días.*

---

## 7. Pendientes por validar con la clínica
1. **Precios y promociones de octubre.** La oferta de septiembre (Sculptra Week, Dysport Day) ya venció. NCTF aparece a $2,500/$6,000 en los guiones y a $3,000/$8,000 en la junta del 08-09.
2. **Horarios reales de agenda** de la sucursal San Pedro para el M4.
3. **Nombre de la asesora o persona del bot en Monterrey.** En CDMX es "Sofía Garza".
4. **Antes y después autorizados** del Dr. Julio César. En la junta del 08-09 quedó pendiente que los enviara.
5. **Política de anticipo** en Monterrey.
6. **Registro como plantillas de Meta** de S3 a S7 en el CRM.
