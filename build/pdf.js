"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyPdf = void 0;
const pdf_lib_1 = require("pdf-lib");
async function modifyPdf(input) {
    // const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
    // const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
    const pdfDoc = await pdf_lib_1.PDFDocument.load(input);
    const helveticaFont = await pdfDoc.embedFont(pdf_lib_1.StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    firstPage.drawText('This text was added with JavaScript!', {
        x: 5,
        y: height / 2 + 300,
        size: 50,
        font: helveticaFont,
        color: (0, pdf_lib_1.rgb)(0.95, 0.1, 0.1),
        rotate: (0, pdf_lib_1.degrees)(-45),
    });
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}
exports.modifyPdf = modifyPdf;
