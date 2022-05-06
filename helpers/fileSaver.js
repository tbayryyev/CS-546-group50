const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

module.exports = {

  async saveFile(buffer, imagePath) {
    // Declares a variable named fileName and sets it equal to and random UUID with a png extension
    let fileName = `${uuidv4()}.png`;
    // Declares a variable named filePath and sets it equal to the file path of the image
    let filePath = path.resolve(`${imagePath}/${fileName}`);
    // Resizes the image
    await sharp(buffer)
      .resize(300, 300, {
        fit: sharp.fit.inside,
        withoutEnlargement: true
      }).toFile(filePath);
    // Returns the fileName
    return fileName;
  }
}
