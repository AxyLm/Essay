const exif = require('jpeg-exif');

const filePath = 'mimg.jpg';
console.log( exifImage(filePath) )
function exifImage(data){
    return exif.parseSync(data);
}