/**
 * normalize-path
 *
 * @see https://github.com/jonschlinkert/normalize-path
 *
 * Copyright (c) 2014-2018, Jon Schlinkert.
 * Released under the MIT License.
 */
export function normalizePath(path: string, stripTrailing = true) {
	if (path === "\\" || path === "/") {
		return "/"
	}

	const length_ = path.length
	if (length_ <= 1) return path

	// ensure that win32 namespaces has two leading slashes, so that the path is
	// handled properly by the win32 version of path.parse() after being normalized
	// https://msdn.microsoft.com/library/windows/desktop/aa365247(v=vs.85).aspx#namespaces
	let prefix = ""
	if (length_ > 4 && path[3] === "\\") {
		const ch = path[2]
		if ((ch === "?" || ch === ".") && path.startsWith("\\\\")) {
			// biome-ignore lint/style/noParameterAssign: its fine
			path = path.slice(2)
			prefix = "//"
		}
	}

	const segs = path.split(/[/\\]+/)
	if (stripTrailing && segs.at(-1) === "") {
		segs.pop()
	}
	return prefix + segs.join("/")
}

/**
 * Sleep for ms.
 */
export function sleep(milliseconds: number) {
	return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
