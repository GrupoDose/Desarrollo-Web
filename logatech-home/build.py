#!/usr/bin/env python3
"""Ensambla las páginas del sitio Logatech en archivos HTML autónomos (listos para Elementor)."""
import re, os, pathlib
ROOT=pathlib.Path(__file__).parent; SRC=ROOT/'src'; OUT=ROOT/'sitio'; OUT.mkdir(exist_ok=True)
base_js=(SRC/'base.js').read_text(encoding='utf-8')
art=base_js[base_js.index('  /* Ilustraciones SVG'):base_js.index('  /* ===================== DATOS')]
mark=re.search(r'<img class="mark" src="data:image/png;base64,[^"]+" alt="">',base_js).group(0)
css=(SRC/'base.css').read_text(encoding='utf-8')+(SRC/'extra.css').read_text(encoding='utf-8')
data=(SRC/'data.js').read_text(encoding='utf-8'); core=(SRC/'core.js').read_text(encoding='utf-8')
header=(SRC/'header.html').read_text(encoding='utf-8'); footer=(SRC/'footer.html').read_text(encoding='utf-8'); overlays=(SRC/'overlays.html').read_text(encoding='utf-8')
FONTS='<link rel="preconnect" href="https://fonts.googleapis.com">\n<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">'
TITLES={'inicio':'Loga Soluciones Científicas para Laboratorio · Monterrey','catalogo':'Catálogo · Loga','producto':'Producto · Loga','nosotros':'Nosotros · Loga','marcas':'Marcas · Loga','servicio-tecnico':'Servicio técnico · Loga','envios-y-credito':'Envíos y crédito · Loga','contacto':'Contacto · Loga'}
KEY={'servicio-tecnico':'servicio','envios-y-credito':'envios'}
for f in sorted((SRC/'pages').glob('*.html')):
    name=f.stem; src=f.read_text(encoding='utf-8')
    pcss=src.split('===CSS===')[1].split('===HTML===')[0].strip(); phtml=src.split('===HTML===')[1].split('===JS===')[0]; pjs=src.split('===JS===')[1]
    block=(f'<!-- ============================================================\n     LOGATECH · SITIO · página "{name}" · generado por build.py\n     Para Elementor: copia TODO entre INICIO y FIN en un widget "HTML".\n     ============================================================ -->\n'
      '<!-- ===== INICIO BLOQUE ELEMENTOR ===== -->\n'+FONTS+'\n<style>\n'+css+(('\n'+pcss+'\n') if pcss else '')+'</style>\n\n'
      f'<div id="lg1" data-current="{KEY.get(name,name)}">\n'+header+'\n'+phtml+'\n'+footer+'</div>\n\n'+overlays+'\n<script>\n(function(){\n'+data+'\n'+art+'\n  var LOGO_MARK=\''+mark+'\';\n'+core+'\n'+pjs+'\n})();\n</script>\n<!-- ===== FIN BLOQUE ELEMENTOR ===== -->\n')
    page=('<!doctype html>\n<html lang="es-MX">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>'+TITLES.get(name,name)+'</title>\n</head>\n<body style="margin:0">\n\n'+block+'\n</body>\n</html>\n')
    (OUT/(name+'.html')).write_text(page,encoding='utf-8'); print('✓',name, len(page)//1024,'KB')
