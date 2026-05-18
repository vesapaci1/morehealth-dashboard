import { vitePlugin as remix } from "@remix-run/dev";
import { cartographer } from "@replit/vite-plugin-cartographer";
import { devBanner } from "@replit/vite-plugin-dev-banner";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "vite";

function resolveBasePathConfig(raw: string): {
  viteBase: string;
  remixBasename: string | undefined;
} {
  if (raw === "/") {
    return { viteBase: "/", remixBasename: undefined };
  }

  const withoutTrailingSlash = raw.replace(/\/$/, "");
  return {
    viteBase: `${withoutTrailingSlash}/`,
    remixBasename: withoutTrailingSlash,
  };
}

function resolveDevPort(): number {
  const rawPort = process.env.PORT;

  if (!rawPort) {
    throw new Error(
      "PORT environment variable is required but was not provided.",
    );
  }

  const port = Number(rawPort);

  if (Number.isNaN(port) || port <= 0) {
    throw new Error(`Invalid PORT value: "${rawPort}"`);
  }

  return port;
}

function getReplitPlugins() {
  if (process.env.NODE_ENV === "production" || process.env.REPL_ID === undefined) {
    return [];
  }

  return [
    cartographer({
      root: path.resolve(import.meta.dirname, ".."),
    }),
    devBanner(),
  ];
}

export default defineConfig(({ command }) => {
  const basePath = process.env.BASE_PATH ?? "/";
  const { viteBase, remixBasename } = resolveBasePathConfig(basePath);
  const port = command === "serve" ? resolveDevPort() : undefined;

  return {
    base: viteBase,
    plugins: [
      remix({
        ...(remixBasename !== undefined ? { basename: remixBasename } : {}),
        ssr: false,
        buildDirectory: "dist",
      }),
      tailwindcss(),
      runtimeErrorOverlay(),
      ...getReplitPlugins(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "src"),
        "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
      },
      dedupe: ["react", "react-dom"],
    },
    root: path.resolve(import.meta.dirname),
    server: {
      ...(port !== undefined ? { port } : {}),
      host: "0.0.0.0",
      allowedHosts: true,
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
    preview: {
      ...(port !== undefined ? { port } : {}),
      host: "0.0.0.0",
      allowedHosts: true,
    },
  };
});
