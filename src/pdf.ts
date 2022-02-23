import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function modifyPdf(input: string) {
	const pdfDoc = await PDFDocument.load(input)
	const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

	const pages = pdfDoc.getPages()
	const firstPage = pages[0]
	const { width, height } = firstPage.getSize()
	firstPage.drawText('This text was added with JavaScript!', {
		x: 5,
		y: height / 2 + 300,
		size: 60,
		font: helveticaFont,
		color: rgb(0.95, 0.1, 0.1),
		rotate: degrees(-45),
	})

	const pdfBytes = await pdfDoc.save()
	return pdfBytes;
}
