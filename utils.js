const fs = require('fs');
const path = require('path');
const pdfTransform = require("pdf-transform");
const download = require('download-pdf');
const cache = require('memory-cache');


const deleteFolderRecursive = function (directoryPath) {
    if (fs.existsSync(directoryPath)) {
        fs.readdirSync(directoryPath).forEach((file, index) => {
        const curPath = path.join(directoryPath, file);
        if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
            deleteFolderRecursive(curPath);
        } else {
            // delete file
            fs.unlinkSync(curPath);
        }
        });
        fs.rmdirSync(directoryPath);
    }
};
const buildMessageFromResponse = (response) => {
	const textArray = response.text.split('\n');
	const today = textArray[4].replace('ÜmumiBu gün','');	
	const newInfected = `${textArray[10]}`;
	const newRecovered = `${textArray[13]}`;
	const deathsToday = `${textArray[19]}`;
	const message = `🇦🇿🦠 Azərbaycanda bu günə (${today})\n${newInfected} yeni koronavirusa yoluxma faktı qeydə alınıb.\n${deathsToday} nəfər ölüb, ${newRecovered} nəfər isə müalicə olunaraq evə buraxılıb.\n#koronavirus`;
	return message;
}

const downloadPdf = (day, ctx, message) => {
    const filename = (day) => `${day}.pdf`; 
	const directory = './'
    download(`https://koronavirusinfo.az/files/3/tab_${day}.pdf`,{directory, filename: filename(day) }	, function(err){
        if (err) throw err
        setTimeout(() =>{
            pdfTransform.convert({
                fileName: `${day}.pdf`, // Specify PDF file path here
                convertTo: "png", // Can be "png" also
            })
        },500)
        setTimeout(() =>{
            cache.put('source', './png-outputs/output_1.png')
            return ctx.replyWithPhoto({source: cache.get('source')}, { caption: message })
        }, 500)
	})
}
module.exports  = {deleteFolderRecursive, buildMessageFromResponse, downloadPdf};