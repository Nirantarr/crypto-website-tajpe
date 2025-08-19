
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import rollupNodePolyFill from 'rollup-plugin-node-polyfills'


// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       crypto: 'crypto-browserify',
//       stream: 'stream-browserify',
//       buffer: 'buffer',
//       process: 'process/browser',
//       util: 'util'
//     }
//   },
//   define: {
//     global: 'globalThis',
//     'process.env': {}
//   },
//   optimizeDeps: {
//     include: [
//       'buffer',
//       'process',
//       'crypto-browserify',
//       'stream-browserify',
//       'util'
//     ]
//   },
//   build: {
//     rollupOptions: {
//       plugins: [rollupNodePolyFill()]
//     }
//   }
// })



import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true
        })
      ]
    }
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()]
    }
  },
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      buffer: 'buffer'
    }
  }
});


