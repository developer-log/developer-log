import { defineConfig } from 'astro/config';
import {fileURLToPath, URL} from 'node:url';

const resolve = (path: string): string => {
  return fileURLToPath(new URL(path, import.meta.url));
}

const importStyle = (path: string): string => {
  return `@import "src/styles/${path}";`;
}

console.log(resolve('./styles/prebuild/base.scss'));

// https://astro.build/config
export default defineConfig({
  server: {
    port: 8100,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: [
            "prebuild/index"
          ].map(path => importStyle(path)),
        }
      }
    }
  }
});
