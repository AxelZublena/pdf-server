"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const pdf_1 = require("./pdf");
const fs = __importStar(require("fs"));
const requestListener = function (req, res) {
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
};
const server = http_1.default.createServer(requestListener);
server.listen(8080);
server.on("error", (err) => console.log(err));
async function processPdf() {
    const existingPdfBytes = await (0, pdf_1.modifyPdf)(fs.readFileSync("../testO.pdf", "base64"));
    fs.writeFile("../out.pdf", existingPdfBytes, (err) => {
        if (err)
            console.log(err);
        else
            console.log("Saved file");
    });
}
