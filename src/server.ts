import http, { RequestListener, ServerResponse } from "http";
import { appendPdf } from "./pdf";

import { Stream } from "stream";
import * as fs from "fs";
import multiparty from "multiparty";

const requestListener: RequestListener = async function(req: any, res: any) {
	let form = new multiparty.Form();

	form.parse(req, async function(err, fields, files) {
		const fileInfo1 = files.file1[0];
		const fileInfo2 = files.file2[0];
		const file1 = fs.readFileSync(fileInfo1.path, "base64");
		const file2 = fs.readFileSync(fileInfo2.path, "base64");
		const outFile = await appendPdf(file1, file2);
		res.writeHead(200, {
			'content-type': 'text/plain',
			'Content-Type': 'application/pdf',
			'Content-Length': outFile.length,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
			'Access-Control-Max-Age': 2592000 // 30 days
		});
		let fileStream = new Stream.PassThrough();
		fileStream.end(outFile);
		fileStream.pipe(res);
	});
}

const server = http.createServer(requestListener);
server.listen(3000);
server.on("error", (err) => console.log(err))
