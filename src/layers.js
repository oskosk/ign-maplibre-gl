/**
 * Registry of IGN (Instituto Geográfico Nacional, Argentina) base layers
 * served as TMS tiles from the IGN GeoServer GeoWebCache.
 *
 * TMS endpoint pattern:
 *   {endpoint}/{gwcLayer}@{gridset}@{format}/{z}/{x}/{y}.png
 *
 * Note: these are TMS tiles (tile origin at the bottom-left), so the source
 * must use `scheme: "tms"` in MapLibre. See ../src/ign.js.
 *
 * Layer names (the keys below) were verified against the live service:
 *   https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/
 */

/** Default GeoServer GWC/TMS endpoint. */
export const TMS_ENDPOINT =
	'https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0';

/** Tiles are pre-rendered in Web Mercator. */
export const GRIDSET = 'EPSG:3857';

/**
 * Attribution required by IGN's terms of use.
 * @see https://www.ign.gob.ar/
 */
export const ATTRIBUTION =
	'© <a href="https://www.ign.gob.ar/" target="_blank" rel="noopener">Instituto Geográfico Nacional</a> (IGN Argentina)';

/**
 * Known IGN base layers, keyed by a friendly id.
 *
 * Each entry maps to a GeoServer cached layer (`gwcLayer`). Add more entries
 * here to expose additional IGN layers through the same `ign.source()` API.
 *
 * @typedef {Object} IgnLayerDef
 * @property {string} gwcLayer   GeoWebCache layer name on the IGN GeoServer.
 * @property {string} title      Human-readable name.
 * @property {string} [format]   Tile image format (default "png").
 * @property {number} [minzoom]  Minimum zoom served (default 0).
 * @property {number} [maxzoom]  Maximum zoom served (default 18).
 */

/**
 * @type {Record<string, IgnLayerDef>}
 *
 * The `gwcLayer` names below were verified against the live IGN service.
 */
export const LAYERS = {
	// Argenmap v2 — the standard IGN base map (calles, rutas, toponimia).
	argenmap: {
		gwcLayer: 'capabaseargenmap',
		title: 'Argenmap',
		format: 'png',
		minzoom: 0,
		maxzoom: 18,
	},

	// Grey base map — light cartographic base, ideal under thematic overlays.
	gris: {
		gwcLayer: 'mapabase_gris',
		title: 'Mapa base gris',
		format: 'png',
		minzoom: 0,
		maxzoom: 18,
	},
};

/**
 * Resolve a layer id to its definition.
 * @param {string} name
 * @returns {IgnLayerDef}
 */
export function resolveLayer(name) {
	const def = LAYERS[name];
	if (!def) {
		const available = Object.keys(LAYERS).join(', ');
		throw new Error(
			`[ign-maplibre-gl] Unknown IGN layer "${name}". Available: ${available}`
		);
	}
	return def;
}
