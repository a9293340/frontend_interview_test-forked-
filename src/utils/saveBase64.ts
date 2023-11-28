export function saveBase64ToFile(base64Data: string, fileName: string): void {
	const blob = base64ToBlob(base64Data);
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");

	a.href = url;
	a.download = fileName;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

function base64ToBlob(base64Data: string): Blob {
	const byteString = atob(base64Data.split(",")[1]);
	const ab = new ArrayBuffer(byteString.length);
	const ia = new Uint8Array(ab);

	for (let i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	return new Blob([ab], { type: "image/png" });
}
