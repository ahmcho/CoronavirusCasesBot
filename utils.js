const fs = require('fs');
const path = require('path');

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
module.exports  = {deleteFolderRecursive, buildMessageFromResponse};