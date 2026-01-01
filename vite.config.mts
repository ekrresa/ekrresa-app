import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import { redwood } from 'rwsdk/vite'
import { defineConfig, PluginOption } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
	environments: {
		ssr: {},
	},
	plugins: [
		cloudflare({
			viteEnvironment: { name: 'worker' },
		}),
		redwood(),
		tailwindcss() as PluginOption,
		svgr({
			svgrOptions: {
				template: (variables, { tpl }) => {
					return tpl`
            "use client";
            import * as React from "react";
            const ${variables.componentName} = (${variables.props}) => (
              ${variables.jsx}
            );
            export default ${variables.componentName};
          `
				},
			},
		}),
	],
})
