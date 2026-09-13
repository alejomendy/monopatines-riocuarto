import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Sitio 100 % estático: `next build` genera la carpeta `out/` para GitHub Pages.
  output: "export",
  // `/catalogo/index.html` en vez de `/catalogo.html`: funciona en cualquier hosting estático.
  trailingSlash: true,
  basePath: basePath || undefined,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;
