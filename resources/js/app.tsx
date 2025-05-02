import '../css/app.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = 'Waste Collection and Recycling Locator';

createInertiaApp({
    title: (title) => title ? `${title} | ${appName}` : appName,
    resolve: (name) =>
      resolvePageComponent(
        `./pages/${name}.tsx`, // lowercase 'pages'
        import.meta.glob('./pages/**/*.tsx') // lowercase
      ),
    setup({ el, App, props }) {
      const root = createRoot(el);
      root.render(<App {...props} />);
    },
});