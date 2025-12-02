/** biome-ignore-all lint/suspicious/noConsole: fine for tools */
/** biome-ignore-all lint/style/noDefaultExport: fine for tools */
/** biome-ignore-all lint/correctness/noNodejsModules: fine for tools */

import process from "node:process"
import type { Plugin } from "esbuild"

const globalValues = {
	date: Date.now(),
}

const pluginDefine = {
	name: "aqua-build-define",
	setup: ({ initialOptions }) => {
		for (const [key, value] of Object.entries(globalValues)) {
			console.debug(`[D] ${key}:`, value)

			initialOptions.define ??= {} // idk
			initialOptions.define[key] = JSON.stringify(value)

			process.env[key] = String(value)
		}
	},
} satisfies Plugin

export default pluginDefine
