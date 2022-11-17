import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  component: {
    viewportWidth: 1000,
    viewportHeight: 500,
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: {
        server: { fs: { strict: false } },
      },
    },
  },
  experimentalSourceRewriting: true,
});
