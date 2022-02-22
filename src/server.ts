import http, { RequestListener } from "http";
import { modifyPdf } from "./pdf";

import * as fs from 'fs';

const requestListener: RequestListener = function(req: any, res: any) {
	let filePath = "../out.pdf";

	let stat = fs.statSync(filePath);

	res.writeHead(200, {
		'Content-Type': 'application/pdf',
		'Content-Length': stat.size,
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
		'Access-Control-Max-Age': 2592000 // 30 days
	});

	let readStream = fs.createReadStream(filePath);
	readStream.pipe(res);

	// const existingPdfBytes = fs.readFileSync("../testO.pdf", "base64");
	// res.write(existingPdfBytes);
	// res.end();
}
const server = http.createServer(requestListener);
server.listen(8080);
server.on("error", (err) => console.log(err))


async function processPdf() {
	const existingPdfBytes = await modifyPdf(fs.readFileSync("../testO.pdf", "base64"));

	fs.writeFile("../out.pdf", existingPdfBytes, (err) => {
		if (err)
			console.log(err);
		else
			console.log("Saved file")

	});
}


