export const getBase64 = (file: any) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = reject;
	});

export const getImageBase64 = async (imagePath: string): Promise<string> => {
	let base64 = "";

	try {
		const response = await fetch(imagePath);

		if (!response.ok) {
			throw new Error("Failed to fetch image");
		}

		const blob = await response.blob();
		const mimeType = blob.type;
		const arrayBuffer = await new Response(blob).arrayBuffer();
		base64 = arrayBufferToBase64(arrayBuffer, mimeType);
	} catch (error) {
		console.error("Error fetching image:", error);
	}

	return base64;
};

const arrayBufferToBase64 = (
	arrayBuffer: ArrayBuffer,
	mimeType: string
): string => {
	const bytes = new Uint8Array(arrayBuffer);
	let binary = "";
	for (let i = 0; i < bytes.length; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return `data:${mimeType};base64,` + btoa(binary);
};
