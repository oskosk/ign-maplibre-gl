# ign-maplibre-gl

Plugin para [MapLibre GL JS](https://maplibre.org/) que carga las capas base del
**IGN (Instituto Geográfico Nacional)** de Argentina — como **Argenmap** — desde
el servicio TMS del GeoServer del IGN.

Es un helper liviano: `ign.source()` devuelve la especificación de un *source*
raster de MapLibre e `ign.layer()` devuelve la especificación de un *layer*
raster, así mantenés el control total del mapa.

👉 **[Ver la demo en vivo](https://oskosk.github.io/ign-maplibre-gl/)** (GitHub Pages).

## Instalación

```bash
npm install ign-maplibre-gl maplibre-gl
```

## Uso

```js
import maplibregl from 'maplibre-gl';
import ign from 'ign-maplibre-gl';

const map = new maplibregl.Map({
	container: 'map',
	style: { version: 8, sources: {}, layers: [] },
	center: [-64, -38],
	zoom: 4,
});

map.on('load', () => {
	map.addSource('argenmap', ign.source('argenmap'));
	map.addLayer(ign.layer('argenmap'));
});
```

### Opciones

`ign.source(name, options)`

| opción        | por defecto       | descripción                          |
| ------------- | ----------------- | ------------------------------------ |
| `endpoint`    | GeoServer del IGN | Reemplaza la URL base del TMS.       |
| `tileSize`    | `256`             | Tamaño del tile en px.               |
| `attribution` | atribución del IGN| Reemplaza el texto de atribución.    |
| `minzoom` / `maxzoom` | según la capa | Reemplaza el rango de zoom.      |

`ign.layer(name, options)`

| opción              | por defecto | descripción                         |
| ------------------- | ----------- | ----------------------------------- |
| `id`                | `name`      | Id de la capa.                      |
| `source`            | `name`      | Id del source que referencia la capa.|
| `minzoom`/`maxzoom` | —           | Rango de zoom de la capa.           |
| `paint` / `layout`  | —           | Propiedades raster de paint/layout. |

```js
map.addSource('base', ign.source('argenmap', { tileSize: 256 }));
map.addLayer(
	ign.layer('argenmap', { id: 'base', source: 'base', paint: { 'raster-opacity': 0.85 } })
);
```

## Capas disponibles

`ign.layers()` devuelve los ids. Actualmente:

| id         | capa del IGN       | descripción                            |
| ---------- | ------------------ | -------------------------------------- |
| `argenmap` | `capabaseargenmap` | Mapa base estándar del IGN (Argenmap v2). |
| `gris`     | `mapabase_gris`    | Base gris, ideal debajo de capas temáticas. |

Para agregar más capas, editá [`src/layers.js`](./src/layers.js).

## Ejecutar la demo

La demo funciona de dos maneras:

**Sin build (ESM nativo).** `index.html` carga `maplibre-gl` desde un CDN mediante
un *import map* y el resto vía módulos ES relativos, así que no necesita
empaquetado. Podés servir la carpeta del repo con cualquier servidor estático
(o publicarla directamente en **GitHub Pages**) y abrir `index.html`:

```bash
npx serve .        # o: python3 -m http.server
```

> Nota: abrir el archivo con `file://` no funciona por las reglas CORS de los
> módulos ES — hace falta servirlo por HTTP.

**Con Vite (dev server).** Para hot-reload durante el desarrollo:

```bash
npm install
npm run dev
```

Vite sirve `index.html` y el ejemplo en
[`example/main.js`](./example/main.js); ignora el *import map* y resuelve
`maplibre-gl` desde `node_modules`.

`npm run build` genera la demo estática en `dist/`.

### Publicar en GitHub Pages

Activá GitHub Pages apuntando a la raíz del repo (rama `main`, carpeta `/`).
Como `index.html` no depende de ningún build, GitHub Pages lo sirve tal cual.
El archivo `.nojekyll` evita que Jekyll procese el sitio. La demo queda en:

<https://oskosk.github.io/ign-maplibre-gl/>

## Notas

Los tiles del IGN se sirven como **TMS** (el origen del tile está abajo a la
izquierda); por eso el source define `scheme: "tms"`. Los tiles están
prerrenderizados en Web Mercator (`EPSG:3857`).

Por favor respetá los
[términos de uso del IGN](https://www.ign.gob.ar/) y mantené visible la
atribución.

## Licencia

MIT
