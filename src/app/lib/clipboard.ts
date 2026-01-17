'use client'

export function copyToClipboard(text: string) {
	if (navigator.clipboard) {
		return navigator.clipboard.writeText(text)
	} else {
		return fallbackCopyTextToClipboard(text)
	}
}

function fallbackCopyTextToClipboard(text: string) {
	const textArea = document.createElement('textarea', {})
	textArea.style.display = 'none'
	textArea.value = text

	document.body.appendChild(textArea)
	textArea.focus()
	textArea.select()

	try {
		const successful = document.execCommand('copy')
		const msg = successful ? 'successful' : 'unsuccessful'

		return msg === 'successful' ? Promise.resolve() : Promise.reject()
	} catch (err) {
		return Promise.reject(err)
	} finally {
		document.body.removeChild(textArea)
	}
}
