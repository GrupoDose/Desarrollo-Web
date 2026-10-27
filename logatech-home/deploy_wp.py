#!/usr/bin/env python3
"""Publica las páginas de sitio-wp/ en un WordPress con Elementor.

Uso:  WP_URL=https://sitio.com WP_USER=usuario WP_PASS='contraseña' python3 deploy_wp.py [carpeta=sitio-wp]
- Crea o actualiza una página por archivo (slug = nombre del archivo; inicio = portada).
- Si Elementor está activo, guarda cada página como página de Elementor (plantilla Canvas, sección a ancho
  completo con un widget HTML que contiene el bloque). Si no, deja el bloque como contenido HTML de la página.
- Sube a Medios los logotipos (sitio-v2/logos) y las fotos de producto (sitio-v2/img/productos) y reconstruye
  sitio-wp/ con las URLs reales antes de publicar (build.py con LOGA_CFG_JSON).
- Activa enlaces permanentes /%postname%/ si estaban en modo simple.
No imprime credenciales.
"""
import os, re, sys, json, html, pathlib, secrets, time
import requests

BASE=os.environ['WP_URL'].rstrip('/'); USER=os.environ['WP_USER']; PASS=os.environ['WP_PASS']
SRC=pathlib.Path(__file__).parent/(sys.argv[1] if len(sys.argv)>1 else 'sitio-wp')
PAGES=[('inicio','Inicio'),('catalogo','Catálogo'),('producto','Producto'),('nosotros','Nosotros'),('marcas','Marcas'),
       ('servicio-tecnico','Servicio técnico'),('envios-y-credito','Envíos y crédito'),('contacto','Contacto')]
S=requests.Session(); S.headers['User-Agent']='Mozilla/5.0 (deploy_wp.py)'
def die(m): print('ERROR:',m); sys.exit(1)

# 1) Login por cookie
S.get(BASE+'/wp-login.php',timeout=60)
S.cookies.set('wordpress_test_cookie','WP Cookie check',domain=requests.utils.urlparse(BASE).hostname)
r=S.post(BASE+'/wp-login.php',data={'log':USER,'pwd':PASS,'wp-submit':'Log In','redirect_to':BASE+'/wp-admin/','testcookie':'1'},timeout=60,allow_redirects=True)
if 'wp-admin' not in r.url or 'wp-login.php' in r.url: die('no se pudo iniciar sesión (revisa usuario/contraseña)')
nonce=S.get(BASE+'/wp-admin/admin-ajax.php?action=rest-nonce',timeout=60).text.strip()
if not re.fullmatch(r'[0-9a-f]{10}',nonce): die('no se obtuvo nonce REST')
S.headers['X-WP-Nonce']=nonce
def rest(method,path,**kw):
    r=S.request(method,BASE+'/wp-json'+path,timeout=120,**kw)
    if r.status_code>=400: die(f'{method} {path} → {r.status_code}: {r.text[:300]}')
    return r.json()
me=rest('GET','/wp/v2/users/me?context=edit'); print('Sesión:',me.get('name'),'· roles:',me.get('roles'))

# 2) Entorno
plugins=rest('GET','/wp/v2/plugins'); el=[p for p in plugins if p['plugin'].startswith('elementor/')]
ELEMENTOR=bool(el) and el[0]['status']=='active'
print('Elementor:',('activo '+el[0]['version']) if ELEMENTOR else 'no activo')
theme=[t for t in rest('GET','/wp/v2/themes') if t.get('status')=='active']; print('Tema:',theme[0]['name']['rendered'] if theme else '?')
settings=rest('GET','/wp/v2/settings'); print('Sitio:',settings.get('title'),'·',settings.get('url'))

# 3) Enlaces permanentes
probe=rest('GET','/wp/v2/pages?per_page=1&status=any')
sample=S.get(BASE+'/wp-admin/options-permalink.php',timeout=60).text
cur=re.search(r'name="permalink_structure"[^>]*value="([^"]*)"',sample)
if cur and cur.group(1)=='' :
    n=re.search(r'name="_wpnonce" value="([^"]+)"',sample).group(1)
    S.post(BASE+'/wp-admin/options-permalink.php',data={'_wpnonce':n,'_wp_http_referer':'/wp-admin/options-permalink.php','selection':'custom','permalink_structure':'/%postname%/','category_base':'','tag_base':'','submit':'Save Changes'},timeout=60)
    print('Enlaces permanentes: activados /%postname%/')
else: print('Enlaces permanentes:',cur.group(1) if cur else '(no leído)')

# 4) Plantillas disponibles
tpls=rest('OPTIONS','/wp/v2/pages')['schema']['properties']['template']['enum'] if False else None
def page_templates():
    r=S.get(BASE+'/wp-admin/post-new.php?post_type=page',timeout=60).text
    return re.findall(r'<option value="([^"]+)"[^>]*>[^<]*</option>',r.split('name="page_template"')[1].split('</select>')[0]) if 'name="page_template"' in r else []
TPLS=page_templates(); TEMPLATE='elementor_canvas' if 'elementor_canvas' in TPLS else ''
print('Plantilla de página:',TEMPLATE or '(por defecto del tema)')

# 4b) Medios: logotipos y fotos de producto (se reutilizan si ya existen por título)
import subprocess,mimetypes
ROOTD=pathlib.Path(__file__).parent
def media_index():
    idx={};page=1
    while True:
        r=rest('GET',f'/wp/v2/media?per_page=100&page={page}&_fields=id,title,source_url,slug')
        for m in r:idx[m['title']['rendered']]=m['source_url']
        if len(r)<100:break
        page+=1
    return idx
def upload(path,title):
    mime=mimetypes.guess_type(str(path))[0] or 'application/octet-stream'
    r=S.post(BASE+'/wp-json/wp/v2/media',headers={'Content-Disposition':f'attachment; filename="{path.name}"','Content-Type':mime},data=path.read_bytes(),timeout=180)
    if r.status_code>=400:die(f'media {path.name} → {r.status_code}: {r.text[:200]}')
    j=r.json();S.post(BASE+f"/wp-json/wp/v2/media/{j['id']}",json={'title':title,'alt_text':title},timeout=60)
    return j['source_url']
idx=media_index();logos={};images={}
for f in sorted((ROOTD/'sitio-v2'/'logos').glob('*')):
    t='loga-logo-'+f.name;logos[f.name]=idx.get(t) or upload(f,t)
for f in sorted((ROOTD/'sitio-v2'/'img'/'productos').glob('*')):
    t='loga-producto-'+f.name;images[f.name]=idx.get(t) or upload(f,t)
print(f'Medios: {len(logos)} logotipos, {len(images)} fotos de producto')
# mapa marca→URL para CFG.logos (BRAND_LOGOS usa nombres de archivo)
dj=(ROOTD/'src-v2'/'data.js').read_text(encoding='utf-8')
bl=json.loads(re.search(r"var BRAND_LOGOS = (\{.*?\});",dj).group(1).replace("'",'"'))
cfg={"pages":{"inicio":"/","catalogo":"/catalogo/","producto":"/producto/","nosotros":"/nosotros/","marcas":"/marcas/","servicio":"/servicio-tecnico/","envios":"/envios-y-credito/","contacto":"/contacto/"},
     "qmap":{"cat":"categoria","p":"pagina"},"logos":{b:logos[f] for b,f in bl.items() if f in logos},"images":images}
subprocess.run(['python3',str(ROOTD/'build.py'),'src-v2',str(SRC.name)],env={**os.environ,'LOGA_CFG_JSON':json.dumps(cfg,ensure_ascii=False)},check=True,cwd=str(ROOTD))
print('sitio-wp reconstruido con URLs de Medios')

def block_of(name):
    s=(SRC/(name+'.html')).read_text(encoding='utf-8')
    return s.split('<!-- ===== INICIO BLOQUE ELEMENTOR ===== -->')[1].split('<!-- ===== FIN BLOQUE ELEMENTOR ===== -->')[0].strip()
def eid(): return secrets.token_hex(4)[:7]

def elementor_save(pid,block):
    ed=S.get(BASE+f'/wp-admin/post.php?post={pid}&action=elementor',timeout=120).text
    m=re.search(r'"ajax":\{"url":"[^"]+","nonce":"([0-9a-f]{10})"',ed) or re.search(r'elementorCommonConfig[^;]*?"nonce":"([0-9a-f]{10})"',ed)
    if not m: return 'sin nonce del editor'
    elements=[{"id":eid(),"elType":"section","settings":{"layout":"full_width","gap":"no","content_position":"top","margin":{"unit":"px","top":"0","right":0,"bottom":"0","left":0,"isLinked":True},"padding":{"unit":"px","top":"0","right":"0","bottom":"0","left":"0","isLinked":True}},
               "elements":[{"id":eid(),"elType":"column","settings":{"_column_size":100,"_inline_size":None},
                            "elements":[{"id":eid(),"elType":"widget","widgetType":"html","settings":{"html":block},"elements":[]}],"isInner":False}],"isInner":False}]
    actions={"save_builder":{"action":"save_builder","data":{"status":"publish","elements":elements,"settings":{"template":TEMPLATE or "default","post_status":"publish"}}}}
    r=S.post(BASE+'/wp-admin/admin-ajax.php',data={'action':'elementor_ajax','_nonce':m.group(1),'editor_post_id':pid,'initial_document_id':pid,'actions':json.dumps(actions)},timeout=180)
    try: j=r.json()
    except Exception: return 'respuesta no JSON: '+r.text[:200]
    ok=j.get('success') and j['data']['responses']['save_builder'].get('success')
    return 'guardado en Elementor' if ok else 'fallo: '+json.dumps(j)[:300]

ids={}
for slug,title in PAGES:
    block=block_of(slug)
    body={'title':title,'slug':slug,'status':'publish','content':'<!-- wp:html -->\n'+block+'\n<!-- /wp:html -->','comment_status':'closed','ping_status':'closed'}
    if TEMPLATE: body['template']=TEMPLATE
    ex=rest('GET',f'/wp/v2/pages?slug={slug}&status=any&per_page=1')
    if ex: pid=ex[0]['id']; rest('POST',f'/wp/v2/pages/{pid}',json=body); act='actualizada'
    else: pid=rest('POST','/wp/v2/pages',json=body)['id']; act='creada'
    ids[slug]=pid
    info=elementor_save(pid,block) if ELEMENTOR else 'contenido HTML (sin Elementor)'
    print(f'✓ {slug:18} id={pid:<5} {act} · {info}')

rest('POST','/wp/v2/settings',json={'show_on_front':'page','page_on_front':ids['inicio']})
print('Portada: página "Inicio" (id',ids['inicio'],')')

# 5) Verificación pública (sin sesión)
P=requests.Session(); print('\nVerificación pública:')
for slug,_ in PAGES:
    url=BASE+'/' if slug=='inicio' else BASE+f'/{slug}/'
    r=P.get(url,timeout=120); okm='id="lg1"' in r.text and 'FIN BLOQUE ELEMENTOR' in r.text
    print(f'  {url:60} {r.status_code} {"bloque presente" if okm else "BLOQUE NO ENCONTRADO"}')
