  /* ===================== NÚCLEO COMPARTIDO (todas las páginas) ===================== */
  var root = document.getElementById('lg1'), modal = document.getElementById('lg1-modal'), drawer = document.getElementById('lg1-quote');
  /* Elementos fijos a <body>: si la sección de Elementor tiene transform, position:fixed dejaría de funcionar */
  [modal, drawer].forEach(function(el){ if(el && el.parentNode!==document.body) document.body.appendChild(el); });
  var fl=root.querySelector('.lg1-wa'); if(fl) document.body.appendChild(fl);

  function $(s,c){return (c||root).querySelector(s)}
  function $$(s,c){return Array.prototype.slice.call((c||root).querySelectorAll(s))}
  function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(m){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]})}
  function money(n){return '$'+n.toLocaleString('es-MX',{minimumFractionDigits:2})+' '+CFG.currency}
  function waLink(text){return 'https://wa.me/'+CFG.whatsapp+'?text='+encodeURIComponent(text)}
  /* qmap: nombres alternos de parámetros para WordPress (cat y p son variables reservadas de WP) */
  function qname(k){return (CFG.qmap&&CFG.qmap[k])||k}
  function pageUrl(page,params){var u=CFG.pages[page]||'#';if(params){var q=Object.keys(params).filter(function(k){return params[k]!==undefined&&params[k]!==''}).map(function(k){return encodeURIComponent(qname(k))+'='+encodeURIComponent(params[k])}).join('&');if(q)u+=(u.indexOf('?')>-1?'&':'?')+q}return u}
  function getParam(k){var m=new RegExp('[?&]'+qname(k)+'=([^&#]*)').exec(location.search);return m?decodeURIComponent(m[1].replace(/\+/g,' ')):''}
  function catById(id){return CATEGORIES.filter(function(c){return c.id===id})[0]}
  function prodById(id){return PRODUCTS.filter(function(p){return p.id===id||p.sku===id})[0]}
  function unitWord(p,n){var u=(p&&p.unit)||'unidad';if(n===1)return u;return u==='kit'?'kits':u==='envase'?'envases':u==='caja'?'cajas':u==='paquete'?'paquetes':u==='pieza'?'piezas':'unidades'}
  function presText(p){return p.pres||'Consultar presentación con un asesor'}
  function skuText(p){return p.skuPending?(p.sku==='Por confirmar'?'por confirmar':p.sku+' (por confirmar)'):p.sku}
  function noImg(p){return '<div class="noimg" role="img" aria-label="Imagen pendiente: '+esc(p.name)+' · '+esc(p.brand)+'"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 16 5-5 4 4 3-3 6 6"/><circle cx="15" cy="9" r="1.5"/></svg><span>Imagen del producto pendiente</span></div>'}
  function prodImg(p,w,h){return p.img?photo(p.img,p.name+' · '+p.brand+(p.sku?' · '+p.sku:''),noImg(p),w,h):noImg(p)}
  function slug(s){return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}

  /* ---- Logotipo ---- */
  function logoHTML(){
    if(CFG.logoUrl) return '<img src="'+esc(CFG.logoUrl)+'" alt="Loga Soluciones Científicas para Laboratorio">';
    return '<div class="logo-fallback">'+LOGO_MARK+'<div><div class="wm">LOGA</div><small>Soluciones Científicas para Laboratorio</small></div></div>';
  }
  $$('[data-logo]').forEach(function(el){el.innerHTML=logoHTML()});

  /* ---- Enlaces entre páginas: <a data-page="catalogo" data-params="cat=antidoping"> ---- */
  function resolveLinks(scope){
    $$('[data-page]',scope).forEach(function(a){
      var page=a.getAttribute('data-page'),ps=a.getAttribute('data-params'),params={};
      if(ps)ps.split('&').forEach(function(kv){var p=kv.split('=');params[p[0]]=decodeURIComponent(p[1]||'')});
      a.setAttribute('href',pageUrl(page,params));
    });
  }
  resolveLinks(root);
  var CURRENT=root.getAttribute('data-current')||'';
  $$('.mainnav a[data-page], .catnav a[data-page]').forEach(function(a){if(a.getAttribute('data-page')===CURRENT&&!a.getAttribute('data-params'))a.classList.add('cur')});

  /* ---- Logotipos de marcas ---- */
  function brandLogo(b){var f=(typeof BRAND_LOGOS!=='undefined')&&BRAND_LOGOS[b];if(!f)return '';return (CFG.logos&&CFG.logos[b])||(CFG.logoBase||'')+f}
  var IMG_FB=' onerror="var s=document.createElement(\'span\');s.className=\'ini\';s.textContent=this.alt.split(/\\s/).map(function(w){return w[0]}).join(\'\').slice(0,2).toUpperCase();this.replaceWith(s)"';
  function brandMark(b,cls){var u=brandLogo(b);return u?'<img class="'+(cls||'blogo')+'" src="'+esc(u)+'" alt="'+esc(b)+'" loading="lazy"'+IMG_FB+'>':'<span class="ini">'+esc(b.split(/\s/).map(function(w){return w[0]}).join('').slice(0,2).toUpperCase())+'</span>'}

  /* ---- Mega menú "Productos" (categorías con subcategorías, estilo MCD LAB) ---- */
  $$('[data-megamenu]').forEach(function(el){
    el.innerHTML='<div class="mm-grid">'+CATEGORIES.map(function(c){return '<div class="mm-col"><a class="mm-h" href="'+pageUrl('catalogo',{cat:c.id})+'">'+esc(c.name)+'</a>'+c.subs.slice(0,6).map(function(s){return '<a href="'+pageUrl('catalogo',{cat:c.id,sub:s})+'">'+esc(s)+'</a>'}).join('')+(c.subs.length>6?'<a class="mm-more" href="'+pageUrl('catalogo',{cat:c.id})+'">Ver todo →</a>':'')+'</div>'}).join('')+'</div><div class="mm-foot"><a href="'+pageUrl('catalogo')+'">Ver catálogo completo →</a><a href="'+pageUrl('marcas')+'">Marcas →</a><a href="'+pageUrl('servicio')+'">Servicio técnico →</a></div>';
  });
  $$('[data-mm]').forEach(function(mm){var btn=$('.mm-btn',mm);
    btn.addEventListener('click',function(e){if(window.matchMedia('(hover:none)').matches||e.detail===0){e.preventDefault();var o=mm.classList.toggle('open');btn.setAttribute('aria-expanded',o)}});
    document.addEventListener('click',function(e){if(!mm.contains(e.target)){mm.classList.remove('open');btn.setAttribute('aria-expanded','false')}});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){mm.classList.remove('open');btn.setAttribute('aria-expanded','false')}});
  });

  /* ---- Navegación de categorías y listas del footer (generadas desde CATEGORIES) ---- */
  $$('[data-catnav]').forEach(function(el){el.innerHTML=CATEGORIES.map(function(c){return '<a href="'+pageUrl('catalogo',{cat:c.id})+'"'+(CURRENT==='catalogo'&&getParam('cat')===c.id?' class="cur"':'')+'>'+esc(c.name)+'</a>'}).join('')+'<a class="hl" href="'+pageUrl('servicio')+'">Servicio técnico</a>'});
  $$('[data-catlist]').forEach(function(el){el.innerHTML=CATEGORIES.map(function(c){return '<li><a href="'+pageUrl('catalogo',{cat:c.id})+'">'+esc(c.name)+'</a></li>'}).join('')});
  $$('[data-catselect]').forEach(function(el){el.innerHTML='<option value="">Todas las categorías</option>'+CATEGORIES.map(function(c){return '<option value="'+c.id+'">'+esc(c.name)+'</option>'}).join('');var cur=getParam('cat');if(cur)el.value=cur});

  /* ---- Buscador del header → catálogo?q= ---- */
  $$('form[data-search]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var q=f.querySelector('input').value.trim(),c=f.querySelector('select');location.href=pageUrl('catalogo',{q:q,cat:c?c.value:''})})});
  var qi=$('form[data-search] input');if(qi&&getParam('q'))qi.value=getParam('q');

  /* ---- Menú móvil ---- */
  var burger=$('[data-burger]'),mnav=$('[data-mobile-nav]');
  if(burger&&mnav){burger.addEventListener('click',function(){var o=mnav.classList.toggle('open');burger.setAttribute('aria-expanded',o)});}
  if(mnav){mnav.innerHTML='<a href="'+pageUrl('inicio')+'">Inicio</a><a href="'+pageUrl('catalogo')+'">Catálogo</a>'+CATEGORIES.map(function(c){return '<a class="sub" href="'+pageUrl('catalogo',{cat:c.id})+'">'+esc(c.name)+'</a>'}).join('')+'<a href="'+pageUrl('marcas')+'">Marcas</a><a href="'+pageUrl('servicio')+'">Servicio técnico</a><a href="'+pageUrl('envios')+'">Envíos y crédito</a><a href="'+pageUrl('nosotros')+'">Nosotros</a><a href="'+pageUrl('contacto')+'">Contacto</a>'}

  /* ---- Ilustraciones / fotos ---- */
  $$('[data-art]').forEach(function(el){var k=el.getAttribute('data-art'),f=ART[k];var fb=f?f():'';el.innerHTML=PHOTOS[k]?photo(PHOTOS[k],'Loga · '+k,fb,1400):fb});
  $$('[data-photo]').forEach(function(el){var k=el.getAttribute('data-photo'),fbk=el.getAttribute('data-fb');var fb=fbk&&ART[fbk]?ART[fbk]():'';if(PHOTOS[k])el.insertAdjacentHTML('afterbegin',photo(PHOTOS[k],el.getAttribute('data-alt')||'Loga',fb,1200))});
  bindPhotos(root);

  /* ---- Tarjeta de producto (inicio, catálogo, relacionados) ---- */
  function cardHTML(p){
    return '<article class="card" data-id="'+p.id+'">'
      +'<a class="img" href="'+pageUrl('producto',{sku:p.id})+'" data-open>'+prodImg(p,900,675)+(p.badge?'<span class="badge'+(p.badge==='Temporada'?' b2':'')+'">'+esc(p.badge)+'</span>':'')+'<button class="quick" type="button" data-quick>Vista rápida</button></a>'
      +'<div class="body"><span class="cat">'+esc((catById(p.cat)||{}).name||p.cat)+'</span><h3><a href="'+pageUrl('producto',{sku:p.id})+'">'+esc(p.name)+'</a></h3>'
      +'<div class="meta"><b>'+esc(p.brand)+'</b> · Clave '+esc(skuText(p))+'</div>'
      +'<div class="price">'+(p.price?'<div class="p">'+money(p.price)+'<small>+ IVA</small></div>':'<div class="p q">Precio por cotización<small>'+esc(presText(p))+'</small></div>')
      +'<button class="add" type="button" data-add><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>Cotización</button></div></div></article>';
  }
  root.addEventListener('click',function(e){
    var card=e.target.closest('.card');if(!card)return;
    var p=prodById(card.getAttribute('data-id'));if(!p)return;
    if(e.target.closest('[data-add]')){e.preventDefault();addQuote(p,1);return}
    if(e.target.closest('[data-quick]')){e.preventDefault();openModal(p);return}
  });

  /* ===================== COTIZACIÓN PERSISTENTE (localStorage) ===================== */
  var quote=[];try{quote=JSON.parse(localStorage.getItem('loga_quote')||'[]')}catch(e){quote=[]}
  function saveQuote(){try{localStorage.setItem('loga_quote',JSON.stringify(quote))}catch(e){}paintCount()}
  function paintCount(){var n=0;quote.forEach(function(x){n+=x.qty});$$('[data-quote-count]').forEach(function(c){c.textContent=n;c.classList.remove('bump');void c.offsetWidth;c.classList.add('bump')})}
  function clampQty(v){v=parseInt(v,10);if(isNaN(v)||v<1)v=1;if(v>9999)v=9999;return v}
  function addQuote(p,q){q=clampQty(q);var f=quote.filter(function(x){return x.id===p.id})[0];if(f)f.qty=clampQty(f.qty+q);else quote.push({id:p.id,qty:q});saveQuote();toast('Agregado a tu cotización: '+p.name);renderDrawer()}
  quote=quote.filter(function(x){return prodById(x.id)}).map(function(x){return {id:x.id,qty:clampQty(x.qty)}});
  function quoteText(){var notes=drawer?$('[data-qnotes]',drawer):null;return 'Hola Loga, solicito cotización de:\n'+quote.map(function(x,i){var p=prodById(x.id);return (i+1)+'. '+p.name+'\n   Marca: '+p.brand+' · Clave: '+skuText(p)+'\n   Presentación: '+presText(p)+'\n   Cantidad: '+x.qty+' '+unitWord(p,x.qty)}).join('\n')+'\n\nNotas: '+((notes&&notes.value.trim())||'(sin notas)')}
  function syncLinks(){if(!drawer)return;var n=0;quote.forEach(function(x){n+=x.qty});$('[data-qtotal]',drawer).textContent=quote.length?quote.length+' producto'+(quote.length===1?'':'s')+' · '+n+' '+(n===1?'unidad':'unidades')+' en total':'Sin productos';var txt=quoteText();var wa=$('[data-qwa]',drawer);wa.href=quote.length?waLink(txt):'#';wa.classList.toggle('dis',!quote.length);var ml=$('[data-qmail]',drawer);ml.href=quote.length?'mailto:'+CFG.email+'?subject='+encodeURIComponent('Solicitud de cotización · '+quote.length+' producto'+(quote.length===1?'':'s'))+'&body='+encodeURIComponent(txt):'#';ml.classList.toggle('dis',!quote.length)}
  function renderDrawer(){
    if(!drawer)return;var list=$('[data-qlist]',drawer);
    if(!quote.length){list.innerHTML='<div class="qempty"><svg viewBox="0 0 24 24"><path d="M5 4h14v16H5zM9 9h6M9 13h6M9 17h3"/></svg><b>Tu cotización está vacía</b><span>Agrega productos con el botón “Cotización” en cualquier tarjeta.</span><a class="btn btn-blue" href="'+pageUrl('catalogo')+'">Ver catálogo</a></div>'}
    else list.innerHTML=quote.map(function(x){var p=prodById(x.id);return '<div class="qi" data-qid="'+x.id+'"><div class="qim">'+prodImg(p,200,200)+'</div><div class="qtx"><b>'+esc(p.name)+'</b><span>'+esc(p.brand)+' · Clave '+esc(skuText(p))+'<br>'+esc(presText(p))+'</span><div class="qq"><button type="button" data-qd="-1" aria-label="Menos">−</button><input type="number" min="1" max="9999" step="1" inputmode="numeric" value="'+x.qty+'" data-qin aria-label="Cantidad"><button type="button" data-qd="1" aria-label="Más">+</button><span class="un" data-un>'+unitWord(p,x.qty)+'</span><button class="rm" type="button" data-qrm>Quitar</button></div></div></div>'}).join('');
    syncLinks();bindPhotos(drawer);
  }
  function openDrawer(){renderDrawer();drawer.classList.add('open');document.body.style.overflow='hidden'}
  function closeDrawer(){drawer.classList.remove('open');document.body.style.overflow=''}
  $$('[data-quote-open]').forEach(function(b){b.addEventListener('click',openDrawer)});
  if(drawer){
    drawer.addEventListener('click',function(e){
      if(e.target.hasAttribute('data-qclose'))return closeDrawer();
      var qi=e.target.closest('.qi');if(!qi)return;var id=qi.getAttribute('data-qid'),it=quote.filter(function(x){return x.id===id})[0];
      if(e.target.closest('[data-qrm]')){quote=quote.filter(function(x){return x.id!==id});saveQuote();renderDrawer();return}
      var d=e.target.closest('[data-qd]');if(d&&it){it.qty=clampQty(it.qty+parseInt(d.getAttribute('data-qd')));saveQuote();renderDrawer()}
    });
    /* Cantidad escrita a mano: se valida, guarda y sincroniza sin re-dibujar (para no perder el foco); al salir del campo se normaliza */
    drawer.addEventListener('input',function(e){var qi=e.target.closest('.qi');if(e.target.hasAttribute('data-qin')&&qi){var it=quote.filter(function(x){return x.id===qi.getAttribute('data-qid')})[0];if(it){it.qty=clampQty(e.target.value);saveQuote();var p=prodById(it.id),un=qi.querySelector('[data-un]');if(un)un.textContent=unitWord(p,it.qty);syncLinks()}}if(e.target.hasAttribute('data-qnotes')){syncLinks()}});
    drawer.addEventListener('change',function(e){if(e.target.hasAttribute('data-qin')){var qi=e.target.closest('.qi'),it=quote.filter(function(x){return x.id===qi.getAttribute('data-qid')})[0];if(it){e.target.value=it.qty=clampQty(e.target.value);saveQuote();syncLinks()}}});
    $('[data-qclear]',drawer).addEventListener('click',function(){if(!quote.length)return;quote=[];saveQuote();renderDrawer()});
    $$('[data-qwa],[data-qmail]',drawer).forEach(function(a){a.addEventListener('click',function(e){if(a.classList.contains('dis')||!quote.length){e.preventDefault();toast('Agrega productos antes de enviar.');return}syncLinks();toast(a.hasAttribute('data-qwa')?'Se abre WhatsApp con tu solicitud; revísala y envíala.':'Se abre tu correo con la solicitud; revísala y envíala.')})});
  }
  paintCount();renderDrawer();
  /* altura del encabezado fijo, para elementos sticky (filtro de marcas) */
  (function(){var h=$('.header');function m(){if(h)root.style.setProperty('--hdr',h.offsetHeight+'px')}m();window.addEventListener('resize',m)})();

  var tt;function toast(m){var t=$('[data-toast]',modal);t.textContent=m;modal.style.display='block';t.classList.add('show');clearTimeout(tt);tt=setTimeout(function(){t.classList.remove('show');if(!modal.classList.contains('open'))modal.style.display=''},2200)}

  /* ===================== FICHA RÁPIDA (modal estilo Amazon) ===================== */
  function specsTable(p){var ks=Object.keys(p.specs);if(!ks.length)return '<p class="specnote">Consultar especificaciones con un asesor.</p>';var s='';ks.forEach(function(k){s+='<tr><td>'+esc(k)+'</td><td>'+esc(p.specs[k])+'</td></tr>'});s+='<tr><td>Presentación</td><td>'+esc(presText(p))+'</td></tr>';return '<table>'+s+'</table>'}
  function specsGrid(p){var ks=Object.keys(p.specs);if(!ks.length)return '<p class="specnote">Consultar especificaciones con un asesor.</p>';return '<div class="grid2">'+ks.map(function(k){return '<div><b>'+esc(k)+'</b><span>'+esc(p.specs[k])+'</span></div>'}).join('')+'<div><b>Presentación</b><span>'+esc(presText(p))+'</span></div></div>'}
  function flagsHTML(p){var f=[];if(p.brand==='LOGA')f.push('<span class="b">Marca propia</span>');else if(BRANDS.some(function(b){return b.toLowerCase()===p.brand.toLowerCase()}))f.push('<span class="b">Distribuidor autorizado</span>');if(p.cold)f.push('<span class="b">Cadena de frío</span>');if(p.skuPending)f.push('<span class="w">Clave por confirmar</span>');if(p.badge)f.push('<span>'+esc(p.badge)+'</span>');return f.join('')}
  function relatedOf(p,n){var same=PRODUCTS.filter(function(x){return x.id!==p.id&&x.cat===p.cat}),other=PRODUCTS.filter(function(x){return x.id!==p.id&&x.cat!==p.cat});return same.concat(other).slice(0,n||5)}
  function thumbsHTML(p){var imgs=p.images&&p.images.length?p.images:(p.img?[p.img]:[]);if(!imgs.length)return '<button type="button" class="on" data-th="0" title="Imagen pendiente">'+noImg(p)+'</button>';return imgs.map(function(im,k){return '<button type="button" class="'+(k?'':'on')+'" data-th="'+k+'" title="Vista '+(k+1)+'">'+photo(im,p.name+' · '+p.brand+' · vista '+(k+1),noImg(p),800,800)+'</button>'}).join('')}
  function buyBoxHTML(p){
    return '<aside class="buy">'
      +(p.price?'<div class="pr">'+money(p.price)+'<small>+ IVA</small></div>':'<div class="pr q">Precio por cotización<small>Atención de lunes a viernes de 8:30 a 17:30 h</small></div>')
      +'<div class="ship"><div><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg><span>'+POL+' Consulta nuestras políticas de envío gratis.</span></div>'
      +(p.cold?'<div><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg><span>Producto refrigerado: se embarca <b>lunes y miércoles</b> con hielera y geles.</span></div>':'')
      +'<div><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg><span>Facilidades de crédito según solicitud y documentación; plazos de hasta 30 días de crédito o más.</span></div></div>'
      +'<div class="stock">Consulta disponibilidad y fecha estimada de entrega al cotizar.</div>'
      +'<div class="qty">Cantidad <div><button type="button" data-q="-1" aria-label="Menos">−</button><input type="number" min="1" max="9999" step="1" inputmode="numeric" value="1" data-qty aria-label="Cantidad"><button type="button" data-q="1" aria-label="Más">+</button></div><span data-qunit>'+unitWord(p,1)+' · '+esc(presText(p))+'</span></div>'
      +'<button class="btn b1" type="button" data-madd>Agregar a cotización</button>'
      +'<a class="btn b2" href="#" target="_blank" rel="noopener" data-mwa><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/></svg>Cotizar ahora por WhatsApp</a>'
      +'<a class="btn b3" href="#" data-mmail>Solicitar por correo</a>'
      +'<div class="sold">Vendido y enviado por <b>Loga Soluciones Científicas</b><br>Garantía del fabricante · Cambio físico en reactivos que lleguen con problema en el envío</div>'
      +'</aside>';
  }
  function tabsHTML(p){
    return '<div class="tabs"><nav><button type="button" class="on" data-tab="0">Descripción</button><button type="button" data-tab="1">Especificaciones</button><button type="button" data-tab="2">Envío, garantía y pagos</button></nav>'
      +'<div class="pane on"><p>'+esc(p.desc)+'</p><p>Las especificaciones completas (muestra, tiempo de lectura, presentación, almacenamiento y registro sanitario) están en la ficha técnica del fabricante, disponible a solicitud. Atendemos laboratorios clínicos, industriales, institucionales y de investigación en toda la República Mexicana.</p></div>'
      +'<div class="pane">'+specsGrid(p)+'<p class="specnote">Datos tomados del listado comercial y de la documentación del fabricante disponible. '+(p.pending&&p.pending.length?'Por confirmar: '+esc(p.pending.join('; '))+'.':'')+'</p></div>'
      +'<div class="pane"><p><b>Envíos:</b> '+POL+'</p><p><b>Entregas urgentes</b> sujetas a disponibilidad, ubicación y confirmación del asesor. Productos especiales de importación: 4 a 6 semanas.</p><p><b>Cadena de frío:</b> los productos refrigerados salen lunes y miércoles en hielera con geles; si un reactivo llega con problema, se realiza cambio físico.</p><p><b>Garantía:</b> 1 año del fabricante contra defectos de fabricación. En equipos de laboratorio se incluye instalación, capacitación y servicio de mantenimiento.</p><p><b>Crédito:</b> sujeto a aprobación después de 3 compras de contado, solicitud y documentación; plazos de 15 o 30 días según autorización.</p></div></div>';
  }
  function bindProductUI(scope,p){
    var qty=$('[data-qty]',scope);
    function upd(){var q=clampQty(qty.value);if(String(q)!==qty.value&&document.activeElement!==qty)qty.value=q;var un=$('[data-qunit]',scope);if(un)un.textContent=unitWord(p,q)+' · '+presText(p);var msg='Hola Loga, solicito cotización de:\n1. '+p.name+'\n   Marca: '+p.brand+' · Clave: '+skuText(p)+'\n   Presentación: '+presText(p)+'\n   Cantidad: '+q+' '+unitWord(p,q);$('[data-mwa]',scope).href=waLink(msg);var ml=$('[data-mmail]',scope);if(ml)ml.href='mailto:'+CFG.email+'?subject='+encodeURIComponent('Cotización '+p.name+' ('+skuText(p)+')')+'&body='+encodeURIComponent(msg)}
    upd();qty.addEventListener('input',upd);qty.addEventListener('change',function(){qty.value=clampQty(qty.value);upd()});
    scope.addEventListener('click',function(e){
      var th=e.target.closest('[data-th]');if(th){$$('[data-th]',scope).forEach(function(b){b.classList.remove('on')});th.classList.add('on');$('[data-main]',scope).innerHTML=th.innerHTML;bindPhotos(scope);return}
      var q=e.target.closest('[data-q]');if(q){qty.value=(parseInt(qty.value)||1)+parseInt(q.getAttribute('data-q'));upd();return}
      var tb=e.target.closest('[data-tab]');if(tb){var n=+tb.getAttribute('data-tab');$$('[data-tab]',scope).forEach(function(b,k){b.classList.toggle('on',k===n)});$$('.pane',scope).forEach(function(b,k){b.classList.toggle('on',k===n)});return}
      if(e.target.closest('[data-madd]')){addQuote(p,clampQty(qty.value));return}
    });
  }
  function openModal(p){
    var dlg=$('[data-dlg]',modal),cat=catById(p.cat)||{name:p.cat};
    var related=relatedOf(p,5).map(function(x){return '<a class="r" href="'+pageUrl('producto',{sku:x.id})+'">'+prodImg(x,200,200)+'<div><b>'+esc(x.name)+'</b>'+esc(x.brand)+' · '+esc(skuText(x))+'</div></a>'}).join('');
    dlg.innerHTML='<button class="close" type="button" aria-label="Cerrar" data-close>×</button>'
      +'<div class="crumb"><a href="'+pageUrl('inicio')+'">Inicio</a> › <a href="'+pageUrl('catalogo',{cat:p.cat})+'"><b>'+esc(cat.name)+'</b></a> › '+esc(p.name)+' <a class="full" href="'+pageUrl('producto',{sku:p.id})+'">Ver ficha completa →</a></div>'
      +'<div class="top"><div class="thumbs">'+thumbsHTML(p)+'</div>'
      +'<div class="main"><div data-main>'+prodImg(p,1200,900)+'</div></div>'
      +'<div class="info"><h2>'+esc(p.name)+'</h2><div class="brand">Marca: <a href="'+pageUrl('catalogo',{marca:p.brand})+'">'+esc(p.brand)+'</a> · Clave <b>'+esc(skuText(p))+'</b></div>'
      +'<div class="flags">'+flagsHTML(p)+'</div>'
      +'<hr><h4>Acerca de este producto</h4><p>'+esc(p.desc)+'</p>'
      +'<hr><h4>Datos del producto</h4>'+specsTable(p)+'<p class="specnote">Especificaciones completas en la ficha técnica del fabricante, disponible a solicitud.</p></div>'+buyBoxHTML(p)+'</div>'
      +tabsHTML(p)+'<div class="related"><h4>Los clientes también piden</h4><div class="row">'+related+'</div></div>';
    modal.style.display='block';modal.classList.add('open');document.body.style.overflow='hidden';bindPhotos(dlg);
    bindProductUI(dlg,p);
    dlg.addEventListener('click',function(e){if(e.target.closest('[data-close]'))closeModal()});
    $('.close',dlg).focus();
  }
  function closeModal(){modal.classList.remove('open');modal.style.display='';document.body.style.overflow=''}
  modal.addEventListener('click',function(e){if(e.target.hasAttribute('data-close'))closeModal()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){if(modal.classList.contains('open'))closeModal();if(drawer&&drawer.classList.contains('open'))closeDrawer()}});

  /* ---- Formularios → WhatsApp + correo (sin backend) ---- */
  $$('form[data-waform]').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var lines=[f.getAttribute('data-waform')],ok=true;
      $$('[name]',f).forEach(function(i){if(i.type==='radio')return;var lbl=i.getAttribute('data-label')||i.name;if(i.required&&!i.value.trim()){ok=false;i.classList.add('err')}else i.classList.remove('err');if(i.value.trim())lines.push(lbl+': '+i.value.trim())});
      if(!ok){toast('Completa los campos marcados.');return}
      var txt=lines.join('\n'),mode=(f.querySelector('[name=via]:checked')||{}).value||'whatsapp';
      if(mode==='correo')location.href='mailto:'+CFG.email+'?subject='+encodeURIComponent(lines[0])+'&body='+encodeURIComponent(txt);
      else window.open(waLink(txt),'_blank');
      var okb=$('[data-ok]',f);if(okb){okb.textContent=mode==='correo'?'Se abrió tu programa de correo con la solicitud. Revísala y envíala para completarla. Atención de lunes a viernes de 8:30 a 17:30 h.':'Se abrió WhatsApp con la solicitud. Revísala y envíala para completarla. Atención de lunes a viernes de 8:30 a 17:30 h.';okb.style.display='block'}
    });
  });

  /* ---- Acordeones ---- */
  root.addEventListener('click',function(e){var h=e.target.closest('[data-acc]');if(!h)return;var it=h.parentNode;it.classList.toggle('open')});
