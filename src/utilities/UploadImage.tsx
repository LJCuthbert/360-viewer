// uploadImage.js
import fs from 'fs';
import path from 'path';

const publicFolderPath = 'public';

const uploadImage = (file: { path: fs.PathOrFileDescriptor; }) => {
    const fileName = 'uploaded_image.jpg'; // You can customize the file name if needed
    const filePath = path.join(publicFolderPath, fileName);

    // Read the content of the image file
    const fileContent = fs.readFileSync(file.path);

    // Write the content to the public folder
    fs.writeFileSync(filePath, fileContent);

    return fileName;
};

export default uploadImage;
