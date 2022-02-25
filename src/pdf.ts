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

export async function appendPdf(file1: string, file2: string) {
	const pdfDoc1 = await PDFDocument.load(file1)
	const pdfDoc2 = await PDFDocument.load(file2)
	// const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

	// const pages1 = pdfDoc1.getPages()
	// const pages2 = pdfDoc2.getPages()
	const copiedPages = await pdfDoc1.copyPages(pdfDoc2, [0])
	pdfDoc1.insertPage(1, copiedPages[0])
	// pages2.forEach(page => pdfDoc1.addPage(page));
	// const firstPage = pages1[0]
	// const { width, height } = firstPage.getSize()
	// firstPage.drawText('This text was added with JavaScript!', {
	// 	x: 5,
	// 	y: height / 2 + 300,
	// 	size: 60,
	// 	font: helveticaFont,
	// 	color: rgb(0.95, 0.1, 0.1),
	// 	rotate: degrees(-45),
	// })

	const pdfBytes = await pdfDoc1.save()
	return pdfBytes;
}
