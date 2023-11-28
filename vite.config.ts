import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import fs from "vite-plugin-fs";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import ElementPlus from "unplugin-element-plus/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		fs({
			rootDir: "./public",
		}),
		AutoImport({
			include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
			imports: ["vue", "pinia"],
			dts: "src/auto-imports.ts",
			resolvers: [ElementPlusResolver({ importStyle: "sass" })],
		}),
		Components({
			extensions: ["vue"],
			include: [/\.vue$/, /\.vue\?vue/],
			dts: "src/auto-components.ts",
			resolvers: [
				ElementPlusResolver({
					importStyle: "sass",
				}),
			],
		}),
		ElementPlus({}),
	],
	server: {
		hmr: true,
		cors: true,
		proxy: {
			"/api": {
				target: "http://localhost:3000/",
				changeOrigin: true,
				rewrite: (path) => path.replace("/api", ""),
			},
			"/img": {
				target: "http://localhost:3001/",
				changeOrigin: true,
				rewrite: (path) => path.replace("/img", ""),
			},
		},
	},
});

// https://9f37l8-3000.csb.app/
