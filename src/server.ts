import http, { RequestListener } from "http";
import { modifyPdf } from "./pdf";

import { Stream } from "stream";

const requestListener: RequestListener = async function(req: any, res: any) {
	const chunks: Uint8Array[] = [];
	req.on('data', (chunk: any) => chunks.push(chunk));
	req.on('end', async () => {
		const buffer: Buffer = Buffer.concat(chunks);
		const data: string = Buffer.from(buffer).toString("base64")

		const outFile = await modifyPdf(data);
		res.writeHead(200, {
			'Content-Type': 'application/pdf',
			'Content-Length': outFile.length,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
			'Access-Control-Max-Age': 2592000 // 30 days
		});

		let fileStream = new Stream.PassThrough();
		fileStream.end(outFile);
		fileStream.pipe(res);
	})
}

const server = http.createServer(requestListener);
server.listen(8080);
server.on("error", (err) => console.log(err))
