import { toPng } from "html-to-image";

export default class General {
    static async toPngImageConvertor(elementRef) {
        return toPng(elementRef, { cacheBust: false })
            .then((dataUrl) => {
                return dataUrl;
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    }

    static downloadFile(dataUrl, fileName) {
        const link = document.createElement("a");
        link.download = fileName;
        link.href = dataUrl;
        link.click();
    }

    static applyFilters = (templateId, brightness, contrast) => {
        const posterElement = document.getElementById(templateId);
        if (posterElement) {
            posterElement.style.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
        }
    };
}
