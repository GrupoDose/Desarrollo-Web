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
  function pageUrl(page,params){var u=CFG.pages[page]||'#';if(params){var q=Object.keys(params).filter(function(k){return params[k]!==undefined&&params[k]!==''}).map(function(k){return encodeURIComponent(k)+'='+encodeURIComponent(params[k])}).join('&');if(q)u+=(u.indexOf('?')>-1?'&':'?')+q}return u}
  function getParam(k){var m=new RegExp('[?&]'+k+'=([^&#]*)').exec(location.search);return m?decodeURIComponent(m[1].replace(/\+/g,' ')):''}
  function catById(id){return CATEGORIES.filter(function(c){return c.id===id})[0]}
  function prodById(id){return PRODUCTS.filter(function(p){return p.id===id||p.sku===id})[0]}
  function slug(s){return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}

  /* ---- Logotipo ---- */
  function logoHTML(){
    if(CFG.logoUrl) return '<img src="'+esc(CFG.logoUrl)+'" alt="Loga Soluciones Científicas para Laboratorio">';
    return '<div class="logo-fallback">'+LOGO_MARK+'<div><div class="wm">LOGA<span>TECH</span></div><small>SOLUCIONES CIENTÍFICAS PARA LABORATORIO</small></div></div>';
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
      +'<a class="img" href="'+pageUrl('producto',{sku:p.id})+'" data-open>'+(p.img?photo(p.img,p.name,ART[p.art](),900,675):ART[p.art]())+(p.badge?'<span class="badge'+(p.badge==='Temporada'?' b2':'')+'">'+esc(p.badge)+'</span>':'')+'<button class="quick" type="button" data-quick>Vista rápida</button></a>'
      +'<div class="body"><span class="cat">'+esc((catById(p.cat)||{}).name||p.cat)+'</span><h3><a href="'+pageUrl('producto',{sku:p.id})+'">'+esc(p.name)+'</a></h3>'
      +'<div class="meta"><b>'+esc(p.brand)+'</b> · Clave '+esc(p.sku)+' · '+esc(p.pres)+'</div>'
      +'<div class="price">'+(p.price?'<div class="p">'+money(p.price)+'<small>+ IVA · Precio por volumen</small></div>':'<div class="p q">Cotiza en minutos<small>Precio especial en pedido recurrente</small></div>')
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
  function addQuote(p,q){var f=quote.filter(function(x){return x.id===p.id})[0];if(f)f.qty+=q;else quote.push({id:p.id,name:p.name,sku:p.sku,brand:p.brand,pres:p.pres,qty:q});saveQuote();toast('Agregado a tu cotización: '+p.name);renderDrawer()}
  function quoteText(){var notes=$('[data-qnotes]',drawer);return 'Hola Loga, quiero cotizar:\n'+quote.map(function(x){return '• '+x.qty+' × '+x.name+' (clave '+x.sku+', '+x.brand+')'}).join('\n')+(notes&&notes.value.trim()?'\n\nNotas: '+notes.value.trim():'')}
  function renderDrawer(){
    if(!drawer)return;var list=$('[data-qlist]',drawer);
    if(!quote.length){list.innerHTML='<div class="qempty"><svg viewBox="0 0 24 24"><path d="M5 4h14v16H5zM9 9h6M9 13h6M9 17h3"/></svg><b>Tu cotización está vacía</b><span>Agrega productos con el botón “Cotización” en cualquier tarjeta.</span><a class="btn btn-blue" href="'+pageUrl('catalogo')+'">Ver catálogo</a></div>'}
    else list.innerHTML=quote.map(function(x){var p=prodById(x.id);return '<div class="qi" data-qid="'+x.id+'"><div class="qim">'+(p?(p.img?photo(p.img,x.name,ART[p.art](),200,200):ART[p.art]()):'')+'</div><div class="qtx"><b>'+esc(x.name)+'</b><span>'+esc(x.brand)+' · '+esc(x.sku)+' · '+esc(x.pres)+'</span><div class="qq"><button type="button" data-qd="-1">−</button><input type="number" min="1" value="'+x.qty+'" data-qin><button type="button" data-qd="1">+</button><button class="rm" type="button" data-qrm>Quitar</button></div></div></div>'}).join('');
    var n=0;quote.forEach(function(x){n+=x.qty});$('[data-qtotal]',drawer).textContent=quote.length+' producto'+(quote.length===1?'':'s')+' · '+n+' pieza'+(n===1?'':'s');
    var wa=$('[data-qwa]',drawer);wa.href=waLink(quoteText());wa.classList.toggle('dis',!quote.length);
    var ml=$('[data-qmail]',drawer);ml.href='mailto:'+CFG.email+'?subject='+encodeURIComponent('Solicitud de cotización')+'&body='+encodeURIComponent(quoteText());ml.classList.toggle('dis',!quote.length);
    bindPhotos(drawer);
  }
  function openDrawer(){renderDrawer();drawer.classList.add('open');document.body.style.overflow='hidden'}
  function closeDrawer(){drawer.classList.remove('open');document.body.style.overflow=''}
  $$('[data-quote-open]').forEach(function(b){b.addEventListener('click',openDrawer)});
  if(drawer){
    drawer.addEventListener('click',function(e){
      if(e.target.hasAttribute('data-qclose'))return closeDrawer();
      var qi=e.target.closest('.qi');if(!qi)return;var id=qi.getAttribute('data-qid'),it=quote.filter(function(x){return x.id===id})[0];
      if(e.target.closest('[data-qrm]')){quote=quote.filter(function(x){return x.id!==id});saveQuote();renderDrawer();return}
      var d=e.target.closest('[data-qd]');if(d&&it){it.qty=Math.max(1,it.qty+parseInt(d.getAttribute('data-qd')));saveQuote();renderDrawer()}
    });
    drawer.addEventListener('input',function(e){var qi=e.target.closest('.qi');if(e.target.hasAttribute('data-qin')&&qi){var it=quote.filter(function(x){return x.id===qi.getAttribute('data-qid')})[0];if(it){it.qty=Math.max(1,parseInt(e.target.value)||1);saveQuote();var wa=$('[data-qwa]',drawer);wa.href=waLink(quoteText())}}if(e.target.hasAttribute('data-qnotes')){$('[data-qwa]',drawer).href=waLink(quoteText())}});
    $('[data-qclear]',drawer).addEventListener('click',function(){if(!quote.length)return;quote=[];saveQuote();renderDrawer()});
    $$('[data-qwa],[data-qmail]',drawer).forEach(function(a){a.addEventListener('click',function(e){if(a.classList.contains('dis')){e.preventDefault();toast('Agrega productos antes de enviar.')}})});
  }
  paintCount();

  var tt;function toast(m){var t=$('[data-toast]',modal);t.textContent=m;modal.style.display='block';t.classList.add('show');clearTimeout(tt);tt=setTimeout(function(){t.classList.remove('show');if(!modal.classList.contains('open'))modal.style.display=''},2200)}

  /* ===================== FICHA RÁPIDA (modal estilo Amazon) ===================== */
  function specsTable(p){var s='';Object.keys(p.specs).forEach(function(k){s+='<tr><td>'+esc(k)+'</td><td>'+esc(p.specs[k])+'</td></tr>'});return '<table>'+s+'</table>'}
  function specsGrid(p){return '<div class="grid2">'+Object.keys(p.specs).map(function(k){return '<div><b>'+esc(k)+'</b><span>'+esc(p.specs[k])+'</span></div>'}).join('')+'</div>'}
  function relatedOf(p,n){var same=PRODUCTS.filter(function(x){return x.id!==p.id&&x.cat===p.cat}),other=PRODUCTS.filter(function(x){return x.id!==p.id&&x.cat!==p.cat});return same.concat(other).slice(0,n||5)}
  function thumbsHTML(p){return ['Producto','Empaque','Detalle'].map(function(l,k){var inner=p.img?photo(p.img,p.name+' · '+l,ART[p.art](),k===0?900:k===1?800:700,k===0?900:k===1?800:700):ART[p.art](k===1?'#5FA33A':k===2?'#12305E':undefined);return '<button type="button" class="'+(k?'':'on')+'" data-th="'+k+'" title="'+l+'">'+inner+'</button>'}).join('')}
  function buyBoxHTML(p){
    return '<aside class="buy">'
      +(p.price?'<div class="pr">'+money(p.price)+'<small>+ IVA · Facturamos de inmediato</small></div>':'<div class="pr q">Precio por cotización<small>Respuesta en minutos en horario hábil</small></div>')
      +'<div class="ship"><div><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg><span><b>Envío GRATIS</b> en pedidos desde $5,000 a toda la República.</span></div>'
      +'<div><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg><span>Entrega local en Monterrey <b>sin costo</b>.</span></div>'
      +(p.cold?'<div><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg><span>Producto refrigerado: se embarca <b>lunes y miércoles</b> con hielera y geles.</span></div>':'')
      +'<div><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg><span>Pedido mínimo <b>$5,000</b> · Crédito a 15 y 30 días.</span></div></div>'
      +'<div class="stock">✔ Disponibilidad constante</div>'
      +'<div class="qty">Cantidad <div><button type="button" data-q="-1">−</button><input type="number" min="1" value="1" data-qty><button type="button" data-q="1">+</button></div><span>'+esc(p.pres.toLowerCase())+'</span></div>'
      +'<button class="btn b1" type="button" data-madd>Agregar a cotización</button>'
      +'<a class="btn b2" href="#" target="_blank" rel="noopener" data-mwa><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/></svg>Cotizar ahora por WhatsApp</a>'
      +'<a class="btn b3" href="mailto:'+CFG.email+'?subject='+encodeURIComponent('Cotización '+p.name+' ('+p.sku+')')+'">Solicitar por correo</a>'
      +'<div class="sold">Vendido y enviado por <b>Loga Soluciones Científicas</b><br>Garantía del fabricante · Factura CFDI 4.0 · Cambio físico en reactivos dañados</div>'
      +'</aside>';
  }
  function tabsHTML(p){
    return '<div class="tabs"><nav><button type="button" class="on" data-tab="0">Descripción</button><button type="button" data-tab="1">Especificaciones</button><button type="button" data-tab="2">Envío, garantía y pagos</button></nav>'
      +'<div class="pane on"><p>'+esc(p.desc)+'</p><p>Nuestros productos están dirigidos a laboratorios clínicos, industriales, institucionales y de investigación; atendemos hospitales, cadenas de laboratorio, empresas con reclutamiento de personal e industria en toda la República Mexicana.</p></div>'
      +'<div class="pane">'+specsGrid(p)+'</div>'
      +'<div class="pane"><p><b>Envíos:</b> locales sin costo; foráneos gratis desde $5,000. Productos especiales de importación: 4 a 6 semanas.</p><p><b>Cadena de frío:</b> reactivos refrigerados salen lunes y miércoles en hielera con geles; si llegan dañados hacemos cambio físico.</p><p><b>Garantía:</b> 1 año del fabricante contra defectos. En equipos incluimos instalación, capacitación y mantenimiento.</p><p><b>Crédito:</b> tras 3 compras de contado y solicitud aprobada, crédito a 15 o 30 días.</p></div></div>';
  }
  function bindProductUI(scope,p){
    var qty=$('[data-qty]',scope);
    function upd(){var q=Math.max(1,parseInt(qty.value)||1);qty.value=q;$('[data-mwa]',scope).href=waLink('Hola Loga, quiero cotizar '+q+' × '+p.name+' (clave '+p.sku+', '+p.brand+').')}
    upd();qty.addEventListener('input',upd);
    scope.addEventListener('click',function(e){
      var th=e.target.closest('[data-th]');if(th){$$('[data-th]',scope).forEach(function(b){b.classList.remove('on')});th.classList.add('on');$('[data-main]',scope).innerHTML=th.innerHTML;bindPhotos(scope);return}
      var q=e.target.closest('[data-q]');if(q){qty.value=(parseInt(qty.value)||1)+parseInt(q.getAttribute('data-q'));upd();return}
      var tb=e.target.closest('[data-tab]');if(tb){var n=+tb.getAttribute('data-tab');$$('[data-tab]',scope).forEach(function(b,k){b.classList.toggle('on',k===n)});$$('.pane',scope).forEach(function(b,k){b.classList.toggle('on',k===n)});return}
      if(e.target.closest('[data-madd]')){addQuote(p,parseInt(qty.value)||1);return}
    });
  }
  function openModal(p){
    var dlg=$('[data-dlg]',modal),cat=catById(p.cat)||{name:p.cat};
    var related=relatedOf(p,5).map(function(x){return '<a class="r" href="'+pageUrl('producto',{sku:x.id})+'">'+(x.img?photo(x.img,x.name,ART[x.art](),200,200):ART[x.art]())+'<div><b>'+esc(x.name)+'</b>'+esc(x.brand)+' · '+esc(x.sku)+'</div></a>'}).join('');
    dlg.innerHTML='<button class="close" type="button" aria-label="Cerrar" data-close>×</button>'
      +'<div class="crumb"><a href="'+pageUrl('inicio')+'">Inicio</a> › <a href="'+pageUrl('catalogo',{cat:p.cat})+'"><b>'+esc(cat.name)+'</b></a> › '+esc(p.name)+' <a class="full" href="'+pageUrl('producto',{sku:p.id})+'">Ver ficha completa →</a></div>'
      +'<div class="top"><div class="thumbs">'+thumbsHTML(p)+'</div>'
      +'<div class="main"><div data-main>'+(p.img?photo(p.img,p.name,ART[p.art](),1200,900):ART[p.art]())+'</div><span class="zoom">Pasa el cursor para ampliar</span></div>'
      +'<div class="info"><h2>'+esc(p.name)+'</h2><div class="brand">Marca: <a href="'+pageUrl('catalogo',{marca:p.brand})+'">'+esc(p.brand)+'</a> · Clave <b>'+esc(p.sku)+'</b> · '+esc(p.pres)+'</div>'
      +'<div class="flags"><span>Registro COFEPRIS</span><span class="b">Distribuidor autorizado</span>'+(p.cold?'<span class="b">Cadena de frío</span>':'')+(p.badge?'<span>'+esc(p.badge)+'</span>':'')+'</div>'
      +'<hr><h4>Acerca de este producto</h4><ul>'+p.bullets.map(function(b){return '<li>'+esc(b)+'</li>'}).join('')+'</ul>'
      +'<hr><h4>Especificaciones</h4>'+specsTable(p)+'</div>'+buyBoxHTML(p)+'</div>'
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
      $$('[name]',f).forEach(function(i){var lbl=i.getAttribute('data-label')||i.name;if(i.required&&!i.value.trim()){ok=false;i.classList.add('err')}else i.classList.remove('err');if(i.value.trim())lines.push(lbl+': '+i.value.trim())});
      if(!ok){toast('Completa los campos marcados.');return}
      var txt=lines.join('\n'),mode=(f.querySelector('[name=via]')||{}).value||'whatsapp';
      if(mode==='correo')location.href='mailto:'+CFG.email+'?subject='+encodeURIComponent(lines[0])+'&body='+encodeURIComponent(txt);
      else window.open(waLink(txt),'_blank');
      var okb=$('[data-ok]',f);if(okb){okb.style.display='block'}
    });
  });

  /* ---- Acordeones ---- */
  root.addEventListener('click',function(e){var h=e.target.closest('[data-acc]');if(!h)return;var it=h.parentNode;it.classList.toggle('open')});
