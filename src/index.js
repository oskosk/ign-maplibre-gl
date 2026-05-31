import { source, layer } from './ign.js';
import {
	LAYERS,
	TMS_ENDPOINT,
	GRIDSET,
	ATTRIBUTION,
	resolveLayer,
} from './layers.js';

/**
 * List the ids of all known IGN layers.
 * @returns {string[]}
 */
export function layers() {
	return Object.keys(LAYERS);
}

export { source, layer, LAYERS, TMS_ENDPOINT, GRIDSET, ATTRIBUTION, resolveLayer };

/**
 * Default namespace export — the `ign` object from the docs:
 *
 *   import ign from 'ign-maplibre-gl';
 *   map.addSource('argenmap', ign.source('argenmap'));
 *   map.addLayer(ign.layer('argenmap'));
 */
const ign = { source, layer, layers, LAYERS };
export default ign;
