const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const port = 3001;

app.use(bodyParser.json({ limit: "10mb" }));

app.post("/api/saveImage", async (req, res) => {
	try {
		const base64Data = req.body.base64Data;
		const fileName = req.body.fileName;
		const filePath = path.join("../public", fileName);
		const idx = base64Data.indexOf(";base64,") + 8;
		// 将 base64 数据写入文件
		await fs.writeFile(filePath, base64Data.substring(idx), "base64");

		res.status(200).json({ success: true });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, error: "Internal Server Error" });
	}
});

app.delete("/api/saveImage", async (req, res) => {
	try {
		const fileName = req.body.fileName;
		const filePath = path.join("../public", fileName);
		console.log(filePath);
		await fs.unlink(filePath);

		res.status(200).json({ success: true });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, error: "Internal Server Error" });
	}
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
