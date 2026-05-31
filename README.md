# ign-maplibre-gl

Plugin para [MapLibre GL JS](https://maplibre.org/) que carga las capas base del
**IGN (Instituto Geográfico Nacional)** de Argentina — como **Argenmap** — desde
el servicio TMS del GeoServer del IGN.

Es un helper liviano: `ign.source()` devuelve la especificación de un *source*
raster de MapLibre e `ign.layer()` devuelve la especificación de un *layer*
raster, así mantenés el control total del mapa.

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

```bash
npm install
npm run dev
```

Esto inicia Vite, que sirve `index.html` y el ejemplo en
[`example/main.js`](./example/main.js).

## Notas

Los tiles del IGN se sirven como **TMS** (el origen del tile está abajo a la
izquierda); por eso el source define `scheme: "tms"`. Los tiles están
prerrenderizados en Web Mercator (`EPSG:3857`).

Por favor respetá los
[términos de uso del IGN](https://www.ign.gob.ar/) y mantené visible la
atribución.

## Licencia

MIT
