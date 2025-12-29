import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import { redwood } from 'rwsdk/vite'
import { defineConfig, PluginOption } from 'vite'

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
  ],
})
