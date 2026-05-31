import { defineConfig } from 'vite';

// Dev/demo config: serves index.html + the example.
export default defineConfig({
	root: '.',
	server: {
		open: true,
	},
});
