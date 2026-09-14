/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const publicUrl = process.env.PUBLIC_URL || '';
const publicUrlIsAbsolute = /^https?:\/\//.test(publicUrl);
const base = publicUrl && !publicUrlIsAbsolute
  ? (publicUrl.endsWith('/') ? publicUrl : `${publicUrl}/`)
  : '/';

export default defineConfig({
  plugins: [react()],
  envPrefix: 'REACT_APP_',
  define: {
    'process.env.REACT_APP_API_BASE_URL': JSON.stringify(process.env.REACT_APP_API_BASE_URL ?? ''),
    'process.env.REACT_APP_LANGUAGE_CODE': JSON.stringify(process.env.REACT_APP_LANGUAGE_CODE ?? ''),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'development'),
    'process.env.PUBLIC_URL': JSON.stringify(publicUrl),
    'process.env.APP_shuffleCards': JSON.stringify(process.env.APP_shuffleCards ?? ''),
    'process.env.APP_howManyPointsATeamMustReachToEndTheGame': JSON.stringify(process.env.APP_howManyPointsATeamMustReachToEndTheGame ?? ''),
  },
  base,
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: 'node',
  },
});
