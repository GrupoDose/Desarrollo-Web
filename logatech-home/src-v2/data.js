  /* ===================== CONFIGURACIÓN DEL SITIO ===================== */
  var CFG = {
    logoUrl: '',                 // URL del logotipo completo (PNG/SVG). Vacío = isotipo incrustado + wordmark.
    whatsapp: '528113638885',    // WhatsApp con lada país
    phone: '81 3376 0911',
    email: 'ventas@logatech.com.mx',
    currency: 'MXN',
    /* Rutas de las páginas. Para WordPress cambia cada valor por el slug real, ej. catalogo:'/catalogo/' */
    pages: { inicio:'inicio.html', catalogo:'catalogo.html', producto:'producto.html', nosotros:'nosotros.html', marcas:'marcas.html', servicio:'servicio-tecnico.html', envios:'envios-y-credito.html', contacto:'contacto.html' }
  };

  /* ===================== CATEGORÍAS (cuestionario A3.1 / A3.2) ===================== */
  var CATEGORIES = [
    {id:'pruebas-rapidas',name:'Pruebas rápidas',short:'Pruebas de diagnóstico inmunocromatográfico.',art:'cassette',photo:'cat_pr',subs:['Enfermedades infecciosas','Hepáticas','Tumorales e inflamatorias','Fertilidad','Vectoriales','Resistencia a antibióticos','Sepsis','Salud general']},
    {id:'antidoping',name:'Antidoping',short:'Pruebas de drogas en orina y saliva.',art:'cup',photo:'cat_ad',subs:['Pruebas individuales en orina','Frasco integrado','Cassette individual','Paneles y frascos multidrogas','Pruebas en saliva']},
    {id:'point-of-care',name:'Point of care',short:'Pruebas junto al paciente.',art:'kit',photo:'cat_eq',subs:['Química seca','Turbidimetría','HbA1c','Monitoreo portátil','Coagulación']},
    {id:'cuidados-criticos',name:'Cuidados críticos',short:'Gasometría, electrolitos y marcadores cardiacos.',art:'kit',photo:'hospital',subs:['Multiparamétrico','Cardio y sepsis','Electrolitos','Gasometría']},
    {id:'deteccion-alcohol',name:'Detección de alcohol',short:'Alcoholímetros profesionales, personales y fijos.',art:'cup',photo:'empresa',subs:['Alcoholímetros profesionales','Alcoholímetros personales','Alcoholímetros fijos de pared','Pruebas rápidas','Mantenimiento y servicio técnico']},
    {id:'reactivos',name:'Reactivos',short:'Química analítica, tinciones y soluciones.',art:'bottle',photo:'cat_re',subs:['Buffers y soluciones valoradas','Colorantes','Equipos de tinción','Detergentes y limpieza especializada','Solventes y sales','Aguas','Antibacteriales','Soluciones glucosadas','Patrones de absorción atómica']},
    {id:'diagnostico-molecular',name:'Diagnóstico molecular',short:'PCR, secuenciación y extracción.',art:'kit',photo:'lab',subs:['PCR tiempo real','Secuenciación','INNO-LiPA','Extracción de ARN/ADN','Termociclador']},
    {id:'microbiologia',name:'Microbiología',short:'Medios de cultivo, agares y consumibles.',art:'bottle',photo:'cat_re',subs:['Medios de cultivo','Peptonas y agares','Biología molecular','Equipos automáticos y semiautomáticos','Consumibles']},
    {id:'equipos',name:'Equipos para diagnóstico clínico',short:'Analizadores nuevos, de fábrica, con instalación.',art:'kit',photo:'cat_eq',subs:['Química','Hematología','Coagulación','Electrolitos','Uroanálisis']},
    {id:'consumibles',name:'Consumibles y toma de muestra',short:'Tubos, contenedores, cajas Petri, portaobjetos e hisopos.',art:'tube',photo:'scientist',subs:['Tubos de toma de muestra','Contenedores de orina','Cajas Petri','Portaobjetos','Medios de transporte']}
  ];
  var CAT_HOME = ['pruebas-rapidas','antidoping','reactivos','equipos']; // las 4 destacadas en inicio

  /* ===================== MARCAS (cuestionario A5.1) ===================== */
  var BRANDS = ['MCD LAB','HYCEL','JALMEK','BD','FERMONT','COPAN','YAMATO','GH MEDICAL','Thermo Scientific','Eppendorf','VELAB','CERTUM','SD Biosensor','Instant View','ARTRON','Life Lock','Dräger','Sentech','Mission','ELITech Group','Voule','MNCHIP','Maglumi','Corning','Wiener Lab','Spinreact','Bio-Rad','Falcon','Licon','Leica','Simport','QuidelOrtho','Alfa','CerTest','Vircell','Dymind','Diagon','GeneProof','i-SENS','Immunostics','Response Biomedical','Sugentech','bioMérieux'];
  var BRANDS_HOME = ['BD','Thermo Scientific','Eppendorf','Corning','Bio-Rad','Leica','Dräger','bioMérieux','MCD LAB','HYCEL','JALMEK','COPAN','CERTUM','SD Biosensor','ARTRON','Spinreact','Wiener Lab','QuidelOrtho','Maglumi','Mission','Sugentech','GH MEDICAL','FERMONT','YAMATO'];

  /* ===================== PRODUCTOS (cuestionario A4.1: los más vendidos) =====================
     v2 · Solo se muestran datos presentes en el listado comercial del cliente (nombre, marca, clave) y los
     datos técnicos contrastados con documentación oficial del fabricante (ver FUENTES-Y-PENDIENTES.md).
     pres:null  → "Consultar presentación con un asesor".  img:null → marcador "Imagen del producto pendiente".
     unit: palabra para contar en el cotizador (unidad, envase, kit). skuPending: clave por confirmar con el fabricante.
     pending: lo que falta confirmar. */
  var POL='Pedido mínimo de $5,000 MXN. Entrega local sin costo y envío foráneo gratis a partir de este monto. Consulta cobertura y condiciones con tu asesor.';
  function P(o){o.price=null;if(o.img===undefined)o.img=null;if(o.pres===undefined)o.pres=null;if(!o.unit)o.unit='unidad';if(!o.specs)o.specs={};if(!o.bullets)o.bullets=[];if(!o.pending)o.pending=[];if(o.cold===undefined)o.cold=false;return o}
  var PRODUCTS = [
    P({id:'DOA164',name:'Panel multidrogas 6 parámetros',brand:'CERTUM',sku:'DOA164',cat:'antidoping',sub:'Paneles y frascos multidrogas',art:'cup',badge:'Más vendido',home:true,
      specs:{'Parámetros':'6 (según listado comercial)'},desc:'Panel inmunocromatográfico para detección cualitativa de seis drogas de abuso. Uso frecuente en programas de reclutamiento y selección de personal, clínicas y hospitales.',pending:['Drogas incluidas y puntos de corte','Tipo de muestra, tiempo de lectura y almacenamiento','Presentación (piezas por caja)','Registro sanitario']}),
    P({id:'DOA154',name:'Panel multidrogas 5 parámetros',brand:'CERTUM',sku:'DOA154',cat:'antidoping',sub:'Paneles y frascos multidrogas',art:'cup',
      specs:{'Parámetros':'5 (según listado comercial)'},desc:'Panel inmunocromatográfico para detección cualitativa de cinco drogas de abuso.',pending:['Drogas incluidas y puntos de corte','Muestra, tiempo de lectura y almacenamiento','Presentación']}),
    P({id:'A04-17-140-A',name:'Panel multidrogas 5 parámetros',brand:'ARTRON',sku:'A04-17-140-A',cat:'antidoping',sub:'Paneles y frascos multidrogas',art:'cup',
      specs:{'Parámetros':'5 (según listado comercial)'},desc:'Panel inmunocromatográfico ARTRON para detección cualitativa de cinco drogas de abuso.',pending:['Drogas incluidas y puntos de corte','Muestra, tiempo de lectura y almacenamiento','Presentación']}),
    P({id:'HDOA-334',name:'Panel multidrogas 3 parámetros (THC/COC/AMP)',brand:'CERTUM',sku:'HDOA-334',cat:'antidoping',sub:'Paneles y frascos multidrogas',art:'cup',
      specs:{'Parámetros':'THC · COC · AMP'},desc:'Panel inmunocromatográfico para detección cualitativa de marihuana, cocaína y anfetaminas.',pending:['Puntos de corte','Muestra, tiempo de lectura y almacenamiento','Presentación']}),
    P({id:'A04-15-140-A',name:'Panel multidrogas 3 parámetros (COC/AMP/THC)',brand:'ARTRON',sku:'A04-15-140-A',cat:'antidoping',sub:'Paneles y frascos multidrogas',art:'cup',
      specs:{'Parámetros':'COC · AMP · THC'},desc:'Panel inmunocromatográfico ARTRON para detección cualitativa de cocaína, anfetaminas y marihuana.',pending:['Puntos de corte','Muestra, tiempo de lectura y almacenamiento','Presentación']}),
    P({id:'DTH-101',name:'Detección de marihuana (THC 50 ng/mL) en tiras',brand:'CERTUM',sku:'DTH-101',cat:'antidoping',sub:'Pruebas individuales en orina',art:'cassette',
      specs:{'Analito':'THC','Punto de corte':'50 ng/mL','Formato':'Tira'},desc:'Prueba individual en tira para detección cualitativa de cannabinoides.',pending:['Tipo de muestra, tiempo de lectura y almacenamiento','Presentación (tiras por caja)']}),
    P({id:'DCO-101',name:'Detección de cocaína (COC 300 ng/mL)',brand:'CERTUM',sku:'DCO-101',cat:'antidoping',sub:'Pruebas individuales en orina',art:'cassette',
      specs:{'Analito':'COC','Punto de corte':'300 ng/mL'},desc:'Prueba individual para detección cualitativa de cocaína.',pending:['Formato (tira o cassette), muestra, tiempo y almacenamiento','Presentación']}),
    P({id:'DME-101',name:'Detección de metanfetamina (MET 1000 ng/mL)',brand:'CERTUM',sku:'DME-101',cat:'antidoping',sub:'Pruebas individuales en orina',art:'cassette',
      specs:{'Analito':'MET','Punto de corte':'1000 ng/mL'},desc:'Prueba individual para detección cualitativa de metanfetamina.',pending:['Formato, muestra, tiempo y almacenamiento','Presentación']}),
    P({id:'DAM-101',name:'Detección de anfetamina (AMP 1000 ng/mL)',brand:'CERTUM',sku:'DAM-101',cat:'antidoping',sub:'Pruebas individuales en orina',art:'cassette',
      specs:{'Analito':'AMP','Punto de corte':'1000 ng/mL'},desc:'Prueba individual para detección cualitativa de anfetamina.',pending:['Formato, muestra, tiempo y almacenamiento','Presentación']}),

    P({id:'CAGD025E',name:'SGTi-flex COVID-19 / Influenza A/B Ag Duo',brand:'Sugentech',sku:'CAGD025E',cat:'pruebas-rapidas',sub:'Enfermedades infecciosas',art:'cassette',home:true,
      specs:{'Tipo':'Prueba de antígeno dual COVID-19 e Influenza A/B'},desc:'Prueba rápida de antígeno para SARS-CoV-2 e Influenza A/B en un mismo dispositivo.',pending:['Tipo de muestra, tiempo de lectura y almacenamiento','Presentación y accesorios incluidos','Registro sanitario']}),
    P({id:'166561',name:'Prueba rápida Influenza Ag A/B/A(H1N1) pandémica',brand:'SD Biosensor',sku:'166561',cat:'pruebas-rapidas',sub:'Enfermedades infecciosas',art:'cassette',
      specs:{'Tipo':'Prueba de antígeno Influenza A, B y A(H1N1) pandémica'},desc:'Prueba rápida de antígeno para influenza con diferenciación de A(H1N1) pandémica.',pending:['Tipo de muestra, tiempo de lectura y almacenamiento','Presentación','Marca: el listado dice "SD"; confirmar si es SD Biosensor']}),
    P({id:'FHC-201',name:'Embarazo Combo (hCG 25 mIU/mL) orina/suero en tiras',brand:'CERTUM',sku:'FHC-201',cat:'pruebas-rapidas',sub:'Fertilidad',art:'cassette',
      specs:{'Analito':'hCG','Sensibilidad':'25 mIU/mL','Muestra':'Orina / suero','Formato':'Tira'},desc:'Prueba rápida de embarazo en tira para orina o suero.',pending:['Tiempo de lectura y almacenamiento','Presentación']}),
    P({id:'IDEC-425',name:'Dengue Combo Duo IgG/IgM + NS1 en cassette',brand:'CERTUM',sku:'IDEC-425',cat:'pruebas-rapidas',sub:'Vectoriales',art:'cassette',badge:'Temporada',home:true,
      specs:{'Analitos':'Anticuerpos IgG/IgM y antígeno NS1','Formato':'Cassette'},desc:'Prueba rápida combinada para dengue: antígeno NS1 y anticuerpos IgG/IgM.',pending:['Tipo de muestra, tiempo de lectura y almacenamiento','Presentación','Registro sanitario']}),
    P({id:'02-7602',name:'Prueba de sangre oculta en heces (FOB) en cassette',brand:'Instant View',sku:'02-7602',cat:'pruebas-rapidas',sub:'Salud general',art:'cassette',
      specs:{'Analito':'Sangre oculta en heces (FOB)','Formato':'Cassette'},desc:'Prueba rápida para detección de sangre oculta en heces.',pending:['Método, tiempo de lectura y almacenamiento','Presentación']}),

    P({id:'368171',name:'Tubo Vacutainer® EDTA K2, tapa lila, 4 ml',brand:'BD',sku:'368171',skuPending:true,cat:'consumibles',sub:'Tubos de toma de muestra',art:'tube',badge:'Pedido recurrente',home:true,
      specs:{'Aditivo':'EDTA K2','Volumen nominal':'4 ml','Tapa':'Lila'},desc:'Tubo de toma de muestra con EDTA K2 para hematología.',pending:['Clave 368171 no localizada en bd.com (EUA); el equivalente listado ahí es 367861 (13 × 75 mm, 4 ml, K2EDTA 7.2 mg, tapa lila Hemogard). Confirmar clave con BD México','Dimensiones, material y presentación (caja/empaque)']}),
    P({id:'368175',name:'Tubo Vacutainer® tapa amarilla, 5 ml, suero con gel separador',brand:'BD',sku:'368175',skuPending:true,cat:'consumibles',sub:'Tubos de toma de muestra',art:'tube',
      specs:{'Aditivo':'Activador de coagulación y gel separador (SST™)','Volumen nominal':'5 ml','Tapa':'Amarilla'},desc:'Tubo de toma de muestra para obtención de suero con gel separador.',pending:['Clave 368175 no localizada en bd.com (EUA); el equivalente listado ahí es 367986 (13 × 100 mm, 5 ml, tapa dorada Hemogard). Confirmar clave con BD México','Dimensiones, material y presentación']}),
    P({id:'BD-ROJO-6ML',name:'Tubo Vacutainer® tapa roja, 6 ml, suero con activador de coagulación',brand:'BD',sku:'Por confirmar',skuPending:true,cat:'consumibles',sub:'Tubos de toma de muestra',art:'tube',
      specs:{'Aditivo':'Activador de coagulación (sin gel)','Volumen nominal':'6 ml','Tapa':'Roja'},desc:'Tubo de toma de muestra para obtención de suero sin gel separador.',pending:['El cuestionario repite la clave 368175 (que corresponde al tubo amarillo). En bd.com el tubo de suero 13 × 100 mm, 6 ml, plástico, tapa roja Hemogard es 367815; no se asigna hasta que BD México o el cliente lo confirmen','Dimensiones, material y presentación']}),
    P({id:'CY-151PZA',name:'Contenedor para muestra de orina, no estéril',brand:'GH MEDICAL',sku:'CY-151PZA',cat:'consumibles',sub:'Contenedores de orina',art:'cup',
      specs:{'Esterilidad':'No estéril'},desc:'Contenedor para recolección de muestras de orina.',pending:['Capacidad, material y presentación']}),
    P({id:'BK-25031',name:'Vaso para orina 120 ml, tapa roja, no ensamblada, no estéril',brand:'GH MEDICAL',sku:'BK-25031',cat:'consumibles',sub:'Contenedores de orina',art:'cup',
      specs:{'Capacidad':'120 ml','Tapa':'Roja, no ensamblada','Esterilidad':'No estéril'},desc:'Vaso recolector de orina de uso general.',pending:['Material y presentación']}),
    P({id:'BK-25032E-MX',name:'Vaso para orina 120 ml, tapa roja, estéril con etiqueta',brand:'GH MEDICAL',sku:'BK-25032E-MX',cat:'consumibles',sub:'Contenedores de orina',art:'cup',
      specs:{'Capacidad':'120 ml','Tapa':'Roja','Esterilidad':'Estéril','Etiqueta':'Incluida'},desc:'Vaso recolector de orina estéril con etiqueta de identificación.',pending:['Material, método de esterilización y presentación']}),
    P({id:'PETRI-100',name:'Caja Petri sencilla estéril 100 × 15 mm',brand:'LOGA',sku:'PETRI',cat:'consumibles',sub:'Cajas Petri',art:'bottle',
      specs:{'Dimensiones':'100 × 15 mm','Esterilidad':'Estéril'},desc:'Caja Petri desechable para microbiología (marca propia Loga).',pending:['Material, método de esterilización y presentación','Clave definitiva (el listado indica "petri")']}),
    P({id:'2947BN-25X75',name:'Portaobjetos 25 × 75 mm, banda esmerilada, grosor 0.90–1.10 mm',brand:'Corning',sku:'2947BN-25X75',cat:'consumibles',sub:'Portaobjetos',art:'kit',
      specs:{'Dimensiones':'25 × 75 mm','Grosor':'0.90–1.10 mm','Banda':'Esmerilada'},desc:'Portaobjetos de vidrio con banda esmerilada para rotular.',pending:['Presentación (piezas por caja)']}),
    P({id:'COP111C',name:'Tubo con medio de transporte Stuart',brand:'COPAN',sku:'COP111C',cat:'consumibles',sub:'Medios de transporte',art:'tube',
      specs:{'Medio':'Stuart'},desc:'Sistema de transporte con medio Stuart para muestras bacteriológicas.',pending:['Si incluye hisopo y de qué tipo','Esterilidad y presentación']}),

    P({id:'PT7494',name:'Agar sangre con azida',brand:'MCD LAB',sku:'PT7494',cat:'microbiologia',sub:'Peptonas y agares',art:'bottle',
      specs:{'Tipo':'Medio de cultivo deshidratado'},desc:'Medio de cultivo deshidratado con azida de sodio.',pending:['Presentación (gramos por frasco), rendimiento y almacenamiento']}),
    P({id:'PT7114',name:'Agar MacConkey',brand:'MCD LAB',sku:'PT7114',cat:'microbiologia',sub:'Medios de cultivo',art:'bottle',home:true,
      specs:{'Tipo':'Medio de cultivo deshidratado'},desc:'Medio de cultivo deshidratado selectivo y diferencial para enterobacterias.',pending:['Presentación (gramos por frasco), rendimiento y almacenamiento']}),

    P({id:'64840',name:'Kit Wright, equipo de tinción con buffer',brand:'HYCEL',sku:'64840',cat:'reactivos',sub:'Equipos de tinción',art:'kit',unit:'kit',home:true,
      specs:{'Contenido':'Colorante Wright y buffer (según listado comercial)'},desc:'Equipo de tinción Wright para frotis sanguíneos.',pending:['Volúmenes de cada componente y almacenamiento']}),
    P({id:'64293',name:'Kit Ziehl Neelsen, equipo para tinción BAAR',brand:'HYCEL',sku:'64293',cat:'reactivos',sub:'Equipos de tinción',art:'kit',unit:'kit',
      specs:{'Uso':'Tinción de bacilos ácido-alcohol resistentes (BAAR)'},desc:'Equipo de tinción Ziehl Neelsen.',pending:['Componentes, volúmenes y almacenamiento']}),
    P({id:'64287-100',name:'Aceite de inmersión tipo A',brand:'HYCEL',sku:'64287-100',cat:'reactivos',sub:'Colorantes',art:'bottle',unit:'envase',
      specs:{'Tipo':'A'},desc:'Aceite de inmersión para microscopía.',pending:['Volumen del envase (la clave sugiere 100 ml; confirmar) e índice de refracción']}),
    P({id:'5342',name:'Detergente líquido Plus neutro',brand:'HYCEL',sku:'5342',cat:'reactivos',sub:'Detergentes y limpieza especializada',art:'bottle',unit:'envase',
      specs:{'pH':'Neutro'},desc:'Detergente líquido para material de laboratorio.',pending:['Volumen del envase y dilución de uso']}),
    P({id:'1822',name:'Alcohol etílico (etanol) 96%',brand:'HYCEL',sku:'1822',cat:'reactivos',sub:'Solventes y sales',art:'bottle',unit:'envase',
      specs:{'Concentración':'96%'},desc:'Etanol al 96% para uso en laboratorio.',pending:['Volumen del envase y grado']}),
    P({id:'A1425-15',name:'Ácido clorhídrico 36–38% ACS, 3.5 L',brand:'JALMEK',sku:'A1425-15',cat:'reactivos',sub:'Solventes y sales',art:'bottle',unit:'envase',
      specs:{'Concentración':'36–38%','Grado':'ACS','Volumen':'3.5 L'},desc:'Ácido clorhídrico grado reactivo ACS.',pending:['Tipo de envase y hoja de seguridad']}),
    P({id:'917',name:'Xilol (dimetilbenceno) 19 L',brand:'HYCEL',sku:'917',cat:'reactivos',sub:'Solventes y sales',art:'bottle',unit:'envase',
      specs:{'Volumen':'19 L'},desc:'Xilol para histología y usos de laboratorio.',pending:['Grado y tipo de envase']}),

    P({id:'IISC-425',name:'BioFire® FilmArray® Respiratory Panel 2 (RP2)',brand:'bioMérieux',sku:'IISC-425',skuPending:true,cat:'diagnostico-molecular',sub:'PCR tiempo real',art:'kit',unit:'kit',cold:false,
      specs:{'Tecnología':'PCR multiplex (panel sindrómico respiratorio)','Almacenamiento':'15–25 °C. No refrigerar (instructivo del fabricante)','Equipo requerido':'Sistema BioFire® FilmArray®'},
      desc:'Panel molecular respiratorio para el sistema BioFire® FilmArray®. Se almacena a temperatura ambiente (15–25 °C) y no debe refrigerarse, según el instructivo del fabricante.',
      pending:['Confirmar modelo vendido: RP2 (RFIT-PRT-0522) o RP2.1/RP2.1plus; la clave "IISC-425" del cuestionario no coincide con las referencias de bioMérieux','Número de pruebas por kit y patógenos incluidos','Registro sanitario']})
  ];
