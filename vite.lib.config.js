import { defineConfig } from 'vite';

// Library build config: bundles src/index.js for npm distribution.
export default defineConfig({
	build: {
		lib: {
			entry: 'src/index.js',
			name: 'ign',
			fileName: 'ign-maplibre-gl',
		},
		// maplibre-gl is a peer dependency — don't bundle it.
		rollupOptions: {
			external: ['maplibre-gl'],
			output: {
				globals: { 'maplibre-gl': 'maplibregl' },
			},
		},
	},
});
