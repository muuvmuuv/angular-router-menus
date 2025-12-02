/** biome-ignore-all lint/complexity/noExcessiveLinesPerFunction: purpose */
/** biome-ignore-all lint/suspicious/noConsole: fine for tools */
/** biome-ignore-all lint/style/noDefaultExport: fine for tools */
/** biome-ignore-all lint/correctness/noNodejsModules: fine for tools */

export default function indexTransformer(compiledHtml = "") {
	let html = compiledHtml

	html = html.replaceAll("{name}", "App")

	return html
}
