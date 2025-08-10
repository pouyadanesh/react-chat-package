import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Detect if we are building for npm publish or running the demo
const isLibraryBuild = process.env.LIB_BUILD === "true";

export default defineConfig(({ mode }) => {
  const isLibraryBuild = mode === "lib";

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: isLibraryBuild
      ? {
          lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "EmbeddableChatModule",
            formats: ["es", "cjs"],
            fileName: (format) => `index.${format}.js`,
          },
          rollupOptions: {
            external: ["react", "react-dom"],
            output: {
              globals: {
                react: "React",
                "react-dom": "ReactDOM",
              },
            },
          },
        }
      : {},
  };
});
