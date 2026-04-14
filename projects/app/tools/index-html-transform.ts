export default function indexTransformer(compiledHtml = "") {
	let html = compiledHtml

	html = html.replaceAll("{name}", "App")

	return html
}
