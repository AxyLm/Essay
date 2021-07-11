import { defineConfig } from 'vite'
import styleImport from 'vite-plugin-style-import';
import { createVuePlugin } from "vite-plugin-vue2";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createVuePlugin(),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style`,
        },
      ],
    }),
  ],
  envDir: "./config",
  build: {
    target: "es2015"
  }
})
