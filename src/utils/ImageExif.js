import EXIF from 'exif-js';
const ImageExif = {
    getOrientation: file => {
        return new Promise(resolve => {
            EXIF.getData(file, function() {
                const orient = EXIF.getTag(this, 'Orientation');
                resolve(orient);
            });
        });
    },

    dataURLtoFile: (dataurl, filename) => {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    },

    rotateImage: (image, width, height, orient) => {
        let canvas = document.createElement('canvas');
        let degree = (90 * Math.PI) / 180;
        console.log(degree);
        let ctx = canvas.getContext('2d');
        console.log(orient, 'ooooooooooooo');
        if (orient) {
            switch (orient) {
                case 1: //0度
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(image, 0, 0, width, height);
                    break;
                case 6: //顺时针90°
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(degree);
                    ctx.drawImage(image, 0, -height, width, height);
                    break;
                case 8: //逆时针90°
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(degree * 3);
                    ctx.drawImage(image, -height, 0, height, width);
                    break;
                case 3: //180°
                    canvas.width = width;
                    canvas.height = height;
                    ctx.rotate(degree * 2);
                    ctx.drawImage(image, -width, -height, width, height);
                    break;
                default:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(image, 0, 0, width, height);
                    break;
            }
        } else {
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(image, 0, 0, width, height);
        }
        ctx.restore();
        return canvas.toDataURL('image/jpeg');
    },
    /**
     * @description 生成uuid
     */
    uuid() {
        let d = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
        });
        return uuid;
    },
    extension(str) {
        return str.split('.').pop();
    },
    generateFileName(str) {
        let filename = '';
        filename = this.uuid();
        if (str) {
            let extension = this.extension(str);
            filename += '.' + extension;
        }
        return filename;
    }
};
export default ImageExif;
