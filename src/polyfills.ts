// Polyfills for Cloudflare Workers (SSR) environment
if (typeof globalThis.HTMLElement === 'undefined') {
	// @ts-expect-error - HTMLElement is not defined in the globalThis object
	globalThis.HTMLElement = class HTMLElement {}
}

if (typeof globalThis.Element === 'undefined') {
	// @ts-expect-error - Element is not defined in the globalThis object
	globalThis.Element = class Element {}
}

if (typeof globalThis.Document === 'undefined') {
	// @ts-expect-error - Document is not defined in the globalThis object
	globalThis.Document = class Document {}
}
