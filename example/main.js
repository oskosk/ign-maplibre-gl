import maplibregl from 'maplibre-gl';
import ign from '../src/index.js';

const map = new maplibregl.Map({
	container: 'map',
	// Estilo vacío — las capas raster del IGN se agregan al cargar.
	style: {
		version: 8,
		sources: {},
		layers: [
			{
				id: 'background',
				type: 'background',
				paint: { 'background-color': '#e9e9e9' },
			},
		],
	},
	center: [-64.0, -38.0], // Argentina
	zoom: 4,
});

map.addControl(new maplibregl.NavigationControl(), 'top-right');

const DEFAULT = 'argenmap';

map.on('load', () => {
	// ---- La API del plugin en acción ----
	map.addSource(DEFAULT, ign.source(DEFAULT));
	map.addLayer(ign.layer(DEFAULT));

	buildPicker();
});

// Selector de radio simple que cambia la capa base activa del IGN.
function buildPicker() {
	const host = document.getElementById('layer-picker');
	let active = DEFAULT;

	for (const id of ign.layers()) {
		const def = ign.LAYERS[id];
		const label = document.createElement('label');
		const input = document.createElement('input');
		input.type = 'radio';
		input.name = 'ign-layer';
		input.value = id;
		input.checked = id === active;
		input.addEventListener('change', () => {
			if (map.getLayer(active)) map.removeLayer(active);
			if (map.getSource(active)) map.removeSource(active);

			active = id;
			map.addSource(active, ign.source(active));
			map.addLayer(ign.layer(active));
		});
		label.append(input, ` ${def.title}`);
		host.append(label);
	}
}
