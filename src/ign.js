import {
	TMS_ENDPOINT,
	GRIDSET,
	ATTRIBUTION,
	resolveLayer,
} from './layers.js';

/**
 * Build the TMS tile URL template for a given IGN layer definition.
 * @param {import('./layers.js').IgnLayerDef} def
 * @param {string} endpoint
 * @returns {string}
 */
function tileUrl(def, endpoint) {
	const format = def.format || 'png';
	return `${endpoint}/${def.gwcLayer}@${GRIDSET}@${format}/{z}/{x}/{y}.${format}`;
}

/**
 * Create a MapLibre GL raster source spec for an IGN base layer.
 *
 * @example
 *   map.addSource('argenmap', ign.source('argenmap'));
 *
 * @param {string} name  Layer id, e.g. "argenmap" or "sig".
 * @param {Object} [options]
 * @param {string} [options.endpoint]     Override the TMS endpoint.
 * @param {number} [options.tileSize=256] Tile size in px.
 * @param {string} [options.attribution]  Override the attribution string.
 * @param {number} [options.minzoom]      Override min zoom.
 * @param {number} [options.maxzoom]      Override max zoom.
 * @returns {import('maplibre-gl').RasterSourceSpecification}
 */
export function source(name, options = {}) {
	const def = resolveLayer(name);
	const endpoint = options.endpoint || TMS_ENDPOINT;

	return {
		type: 'raster',
		tiles: [tileUrl(def, endpoint)],
		tileSize: options.tileSize ?? 256,
		// IGN serves TMS tiles (origin bottom-left).
		scheme: 'tms',
		minzoom: options.minzoom ?? def.minzoom ?? 0,
		maxzoom: options.maxzoom ?? def.maxzoom ?? 18,
		attribution: options.attribution ?? ATTRIBUTION,
	};
}

/**
 * Create a MapLibre GL raster layer spec for an IGN base layer.
 *
 * By default the layer's `id` and `source` both default to `name`, so it pairs
 * with `map.addSource(name, ign.source(name))`.
 *
 * @example
 *   map.addSource('argenmap', ign.source('argenmap'));
 *   map.addLayer(ign.layer('argenmap'));
 *
 *   // custom ids / paint:
 *   map.addLayer(ign.layer('argenmap', { id: 'base', source: 'argenmap', paint: { 'raster-opacity': 0.8 } }));
 *
 * @param {string} name  Layer id, e.g. "argenmap" or "sig".
 * @param {Object} [options]
 * @param {string} [options.id]       Layer id (default: `name`).
 * @param {string} [options.source]   Source id to reference (default: `name`).
 * @param {number} [options.minzoom]  Layer min zoom.
 * @param {number} [options.maxzoom]  Layer max zoom.
 * @param {Object} [options.paint]    Raster paint properties.
 * @param {Object} [options.layout]   Raster layout properties.
 * @returns {import('maplibre-gl').RasterLayerSpecification}
 */
export function layer(name, options = {}) {
	// Validate the name so typos fail fast even if only layer() is called.
	resolveLayer(name);

	/** @type {import('maplibre-gl').RasterLayerSpecification} */
	const spec = {
		id: options.id ?? name,
		type: 'raster',
		source: options.source ?? name,
	};

	if (options.minzoom != null) spec.minzoom = options.minzoom;
	if (options.maxzoom != null) spec.maxzoom = options.maxzoom;
	if (options.paint) spec.paint = options.paint;
	if (options.layout) spec.layout = options.layout;

	return spec;
}
